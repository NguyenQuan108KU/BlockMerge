using System;
using System.Collections.Generic;
using System.Threading;
using UnityEngine;
using UnityEngine.Serialization;
using System.Threading.Tasks;

#if using_addressable
using UnityEngine.AddressableAssets;
using UnityEngine.ResourceManagement.AsyncOperations;
#endif

namespace SonatFramework.Systems.LoadObject
{
    [CreateAssetMenu(menuName = "Sonat Services/Load Service/Load Addressable Async", fileName = "Load Addressable Async")]
    public class SonatLoadAddressableAsync : LoadObjectServiceAsync
    {
        [SerializeField] private LoadObjectServiceAsync fallback;
        [SerializeField] private string externPath = ".prefab";

#if using_addressable
        private readonly Dictionary<string, AsyncOperationHandle> _loadedHandles = new(StringComparer.Ordinal);
        //private readonly Dictionary<string, AsyncLazy<object>> _loadingTasks = new(StringComparer.Ordinal);
#endif

        public override async Task<T> LoadAsync<T>(string assetName)
        {
#if using_addressable
            string key = GetFormatKey(assetName);

            // 1. Check cache đã load xong (giữ nguyên)
            if (_loadedHandles.TryGetValue(key, out var handle))
            {
                if (handle.IsValid()) return handle.Convert<T>().Result;
                _loadedHandles.Remove(key);
            }

            // 2. Xử lý Concurrency bằng AsyncLazy
            // Nếu chưa có task đang chạy cho key này, tạo mới
            //if (!_loadingTasks.TryGetValue(key, out var lazyTask))
            //{
            //    // Tạo AsyncLazy: Chỉ khi nào được await nó mới chạy, và chỉ chạy 1 lần
            //    lazyTask = new AsyncLazy<object>(async () => await LoadInternalAsync<T>(key));

            //    _loadingTasks[key] = lazyTask;
            //}


            try
            {
                // Await cái AsyncLazy (Dù 10 người gọi thì cũng chỉ await cùng 1 cái này)
                // Attach timeout của request hiện tại vào việc CHỜ ĐỢI
                //var resultObj = await lazyTask.Task;

                return default(T);
            }
            catch (OperationCanceledException)
            {
                // Timeout của request này (task load gốc vẫn có thể đang chạy ngầm cho người khác)
                Debug.LogWarning($"[LoadAddressable] Timeout waiting for: {key}");
                return await TryFallback<T>(assetName);
            }
            catch (Exception e)
            {
                // Lỗi từ bên trong task load gốc
                Debug.LogError($"[LoadAddressable] Error {key}: {e.Message}");
                // Nếu lỗi thật sự, xóa khỏi loading để lần sau thử lại
                //_loadingTasks.Remove(key);
                return await TryFallback<T>(assetName);
            }
            // Không remove _loadingTasks trong Finally ngay lập tức nếu muốn cache kết quả Lazy
            // Nhưng với logic của bạn là cache vào _loadedHandles sau khi xong,
            // thì ta nên dọn dẹp Lazy sau khi nó hoàn thành để giải phóng bộ nhớ.
            finally
            {
                // Chỉ người tạo ra task (hoặc người cuối cùng) mới nên dọn dẹp, 
                // nhưng để đơn giản, ta có thể giữ Lazy trong Dict cho đến khi Load xong hẳn.
                // Trong trường hợp này, tốt nhất là check lại status trước khi remove.

                // *Gợi ý: Logic của bạn chuyển sang _loadedHandles khi thành công
                // nên ta có thể remove Lazy sau khi await xong để Dictionary không phình to.*
                //if (_loadingTasks.ContainsKey(key) && lazyTask.Task.Status.IsCompleted())
                //{
                //    _loadingTasks.Remove(key);
                //}
            }
#else
            return default(T);
#endif
        }

#if using_addressable
        //private async Task<T> LoadInternalAsync<T>(string key) where T : class
        //{
        //    // 1. Kiểm tra xem Key có tồn tại trong hệ thống Addressables không
        //    var locations = await Addressables.LoadResourceLocationsAsync(key);

        //    if (locations == null || locations.Count == 0)
        //    {
        //        Debug.LogWarning($"[Addressables] Key not found: {key}. Skipping load.");
        //        return null; // Trả về null thay vì để ném Exception
        //    }

        //    // 2. Nếu tồn tại, tiến hành Load
        //    var handle = Addressables.LoadAssetAsync<T>(key);

        //    try
        //    {
        //        T result = await handle;

        //        if (handle.Status == AsyncOperationStatus.Succeeded)
        //        {
        //            if (!_loadedHandles.ContainsKey(key))
        //            {
        //                _loadedHandles.Add(key, handle);
        //            }

        //            return result;
        //        }
        //        else
        //        {
        //            Addressables.Release(handle);
        //            Debug.LogError($"Addressable load failed status: {handle.Status} for key: {key}");
        //            return null;
        //        }
        //    }
        //    catch (System.Exception ex)
        //    {
        //        // Bắt các lỗi phát sinh trong quá trình chờ (cancellation hoặc lỗi runtime)
        //        if (handle.IsValid()) Addressables.Release(handle);
        //        Debug.LogWarning($"Ignored error while loading {key}: {ex.Message}");
        //        return null;
        //    }
        //}

        private async Task<T> TryFallback<T>(string assetName)
        {
            //if (fallback != null)
            //{
            //    return await fallback.LoadAsync<T>(assetName);
            //}

            return default(T);
        }

        private void LogFirebaseError(string type, string assetName, Exception e = null)
        {
            Firebase.Crashlytics.Crashlytics.Log($"[LoadAddressable] {type} {assetName}");
            Firebase.Crashlytics.Crashlytics.SetCustomKey("LastEntityAttempted", assetName);
            if (e != null) Firebase.Crashlytics.Crashlytics.LogException(e);
        }

        private string GetFormatKey(string assetName)
        {
            // Giả sử biến 'path' nằm ở class cha LoadObjectServiceAsync
            // Nếu không có, hãy sửa lại dòng này cho đúng logic nối chuỗi của bạn
            return $"{path}{assetName}{externPath}";
        }

        /// <summary>
        /// Gọi hàm này khi bạn chắc chắn không dùng asset này nữa (VD: đóng UI, chuyển màn chơi)
        /// </summary>
        public override void ReleaseAsset(string assetName)
        {
            string key = GetFormatKey(assetName);
            if (_loadedHandles.TryGetValue(key, out var handle))
            {
                if (handle.IsValid())
                {
                    Addressables.Release(handle);
                }

                _loadedHandles.Remove(key);
                Debug.Log($"[LoadAddressable] Released: {key}");
            }
        }

        /// <summary>
        /// Xóa toàn bộ cache (khi destroy manager hoặc chuyển scene lớn)
        /// </summary>
        public void ReleaseAll()
        {
            foreach (var kvp in _loadedHandles)
            {
                if (kvp.Value.IsValid())
                {
                    Addressables.Release(kvp.Value);
                }
            }

            _loadedHandles.Clear();
            //_loadingTasks.Clear();
        }

        // Tự động cleanup khi ScriptableObject bị unload (Editor hoặc UnloadResources)
        private void OnDisable()
        {
            ReleaseAll();
        }
#endif
    }
}