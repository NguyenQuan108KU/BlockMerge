using System;
using System.Collections.Generic;
using Cysharp.Threading.Tasks; // Cần namespace này
using DG.Tweening;
using Sonat.TrackingModule;
using SonatFramework.Scripts.Systems.ObjectPooling;
using SonatFramework.Systems.LoadObject;
using UnityEngine;
using Object = UnityEngine.Object;

namespace SonatFramework.Systems.ObjectPooling
{
    [CreateAssetMenu(fileName = "SonatPoolingServiceAsync", menuName = "Sonat Services/Pooling/Pooling Service Async")]
    public class SonatPoolingServiceAsync : PoolingServiceAsync
    {
        [SerializeField] private Service<LoadObjectServiceAsync> loadObjectService = new SonatFramework.Systems.Service<SonatFramework.Systems.LoadObject.LoadObjectServiceAsync>();
        [SerializeField] private PreloadPoolingObjects preloadPoolingObjects;

        // THAY ĐỔI QUAN TRỌNG: Dùng AsyncLazy thay vì UniTask
        // AsyncLazy đảm bảo task chỉ chạy 1 lần và an toàn khi nhiều nơi cùng await
        private readonly Dictionary<string, AsyncLazy<GameObject>> _loadingSharedTasks = new System.Collections.Generic.Dictionary<string, AsyncLazy<UnityEngine.GameObject>>();

        public override void Initialize()
        {
            base.Initialize();
            //PreloadPoolingObjects().Forget();
        }

        private async UniTaskVoid PreloadPoolingObjects()
        {
            if (preloadPoolingObjects == null || preloadPoolingObjects.objectsToPreload.Count == 0) return;

            // Đợi 1 chút để hệ thống ổn định
            await UniTask.Delay(500);

            var tasks = new List<UniTask>();
            foreach (var path in preloadPoolingObjects.objectsToPreload)
            {
                if (string.IsNullOrEmpty(path)) continue;
                tasks.Add(GetOrLoadPrefabAsync(path));
            }

            await UniTask.WhenAll(tasks);
        }

        public override void ReturnObj(IPoolingObject obj, bool keep = true)
        {
            // (Giữ nguyên logic cũ của bạn)
            if (obj == null || obj.transform == null) return;
            obj.OnReturnObj();
            obj.transform.DOKill();

            if (!keep)
            {
                Object.Destroy(obj.transform.gameObject);
                return;
            }

            obj.transform.gameObject.SetActive(false);
            if (pool != null) obj.transform.SetParent(pool.transform);

            string key = obj.transform.name;
            if (!Pool.TryGetValue(key, out var queue))
            {
                queue = new Queue<IPoolingObject>();
                Pool[key] = queue;
            }

            queue.Enqueue(obj);
        }

        public override async UniTask<T> CreateAsync<T>(string objectName, [Bridge.Ref] Vector3 position, Transform parent = null, params object[] args)
        {
            var res = await CreateAsync<T>(objectName, parent, args);
            if (res != null) res.transform.position = position;
            return res;
        }

        public override async UniTask<T> CreateAsync<T>(string objectName, Transform parent = null, params object[] args)
        {
            // 1. Kiểm tra Pool (Fastest)
            if (Pool.TryGetValue(objectName, out var queue) && queue.Count > 0)
            {
                while (queue.Count > 0)
                {
                    var pooledObj = queue.Dequeue();
                    if (pooledObj != null && pooledObj.transform != null && pooledObj is T tObj)
                    {
                        tObj.transform.gameObject.SetActive(true);
                        tObj.transform.SetParent(parent);
                        tObj.OnCreateObj(args);
                        return tObj;
                    }
                }
            }

            // 2. Lấy Prefab (Load hoặc lấy từ Cache)
            // Gọi hàm mới đã tối ưu
            GameObject prefab = await GetOrLoadPrefabAsync(objectName);

            if (prefab == null) return default(?);

            // 3. Instantiate
            var gameObj = Object.Instantiate(prefab, parent);
            gameObj.name = objectName;

            if (gameObj.TryGetComponent(out T component))
            {
                component.Setup();
                component.OnCreateObj(args);
                return component;
            }
            else
            {
                Debug.LogError($"[Pooling] Object {objectName} missing component {typeof(T).Name}");
                Object.Destroy(gameObj);
                return default(?);
            }
        }

        // ========================================================================
        // CORE LOGIC ĐÃ SỬA: DÙNG ASYNC LAZY
        // ========================================================================
        private async UniTask<GameObject> GetOrLoadPrefabAsync(string objectName)
        {
            // 1. Nếu đã load xong và có trong Dictionary Prefab -> Trả về luôn (Nhanh nhất)
            if (ObjPrefs.TryGetValue(objectName, out var cachedPrefab) && cachedPrefab != null)
            {
                return cachedPrefab;
            }

            // 2. Kiểm tra xem có ai đang load cái này chưa
            // Chúng ta dùng AsyncLazy để đảm bảo Task load chỉ được tạo ra 1 lần duy nhất
            if (!_loadingSharedTasks.TryGetValue(objectName, out var lazyTask))
            {
                // Nếu chưa ai load, tạo một AsyncLazy mới.
                // Logic load thực sự nằm trong hàm lambda `() => ...`
                lazyTask = new AsyncLazy<GameObject>(() => LoadInternalAsync(objectName));
                _loadingSharedTasks[objectName] = lazyTask;
            }

            try
            {
                // 3. Await cái lazy task. 
                // AsyncLazy cho phép 100 người await cùng lúc mà không bị lỗi "await twice"
                GameObject result = await lazyTask.Task;

                return result;
            }
            catch (Exception e)
            {
                // Nếu lỗi, xóa khỏi dictionary để lần sau thử load lại
                _loadingSharedTasks.Remove(objectName);
                Debug.LogError($"[Pooling] Error loading {objectName}: {e}");
                throw;
            }
            finally
            {
                // OPTIONAL: Sau khi load xong thành công và đã đưa vào ObjPrefs (bên trong LoadInternalAsync),
                // ta có thể xóa AsyncLazy đi để giải phóng bộ nhớ wrapper.
                // Tuy nhiên, cần chắc chắn LoadInternalAsync đã Add vào ObjPrefs rồi.
                if (ObjPrefs.ContainsKey(objectName))
                {
                    _loadingSharedTasks.Remove(objectName);
                }
            }
        }

        private async UniTask<GameObject> LoadInternalAsync(string objectName)
        {
            // Hàm này sẽ được AsyncLazy gọi MỘT LẦN DUY NHẤT
            try
            {
                var loadedObj = await loadObjectService.Instance.LoadAsync<GameObject>(objectName);

                if (loadedObj != null)
                {
                    // Cache ngay lập tức vào ObjPrefs
                    if (!ObjPrefs.ContainsKey(objectName))
                    {
                        ObjPrefs.Add(objectName, loadedObj);
                    }

                    return loadedObj;
                }

                Debug.LogError($"[Pooling] Load returned null: {objectName}");
                return null;
            }
            catch (Exception)
            {
                throw; // Ném lỗi để AsyncLazy catch được ở trên
            }
        }
    }
}