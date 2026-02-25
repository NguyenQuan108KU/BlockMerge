#if !iap_4x_or_older
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Sonat.AdsModule;
using Sonat.Data;
using Sonat.Debugger;
using Sonat.FirebaseModule;
using Sonat.FirebaseModule.RemoteConfig;
using Sonat.TrackingModule;
using UnityEngine;
using UnityEngine.Networking;
#if using_iap
using UnityEngine.Purchasing;
#endif

namespace Sonat.IapModule
{
    [CreateAssetMenu(menuName = "SonatSDK/Services/Iap Service", fileName = "SonatIap")]
    public class SonatIap : SonatService
    {
        private static SonatIap instance;
        public override SonatServiceType ServiceType => SonatServiceType.IapService;
        public override bool Ready { get; set; }

        private readonly Dictionary<string, BuyIapContent> buyIapContents = new System.Collections.Generic.Dictionary<string, Sonat.IapModule.SonatIap.BuyIapContent>();
        public List<StoreProductDescriptor> StoreProductDescriptors = new List<StoreProductDescriptor>();

        public static event Action<float> OnLtvIapAdded;
        public static event Action<int, bool> OnInAppPurchased;
        private PlayerPrefListInt packsPendingReward;
#if using_iap
        private List<Order> confirmedOrders;
#endif

        public bool autoRestore;
        public float timeWaitStore = 10;
        [SerializeField] private string verifyUrl = "https://us-central1-sonat-arm-358507.cloudfunctions.net/verify_inapp_purchase";

        public static float sn_ltv_iap
        {
            get => PlayerPrefs.GetFloat(nameof(sn_ltv_iap));
            set
            {
                var last = PlayerPrefs.GetFloat(nameof(sn_ltv_iap));
                if (Math.Abs(last - value) > 0.0001f)
                {
                    SonatFirebase.analytic.SetUserProperty(nameof(sn_ltv_iap), value.ToString(CultureInfo.InvariantCulture));
                    PlayerPrefs.SetFloat(nameof(sn_ltv_iap), value);
                    OnLtvIapAdded?.Invoke(value - last);
                }
            }
        }


        private readonly List<string> _currencyLast = new List<string>()
        {
            "₫",
        };


#if using_iap
        private StoreController m_StoreController;
#endif

        //private KeyValuePair<int, Action<bool>> _onSuccess;
        private bool isBuying;
        private int tried;


        private static PlayerPrefListInt itemsPurchased;

        private class BuyIapContent
        {
            public SonatBuyLogData buyLogData;
        }

        public override void Initialize(Action<ISonatService> onInitialized)
        {
            instance = this;
            isBuying = false;
            base.Initialize(onInitialized);
            itemsPurchased = new PlayerPrefListInt("item_purchased", new List<int>());
            packsPendingReward = new PlayerPrefListInt("PacksPendingReward");

            // Get StoreController
#if using_iap
            m_StoreController = UnityIAPServices.StoreController();
#endif
            // Add event listeners
            SubscribeHandle();

            InitializeIAP();
        }

        private void SubscribeHandle()
        {
#if using_iap
            m_StoreController.OnStoreDisconnected += OnStoreDisconnected;

            m_StoreController.OnProductsFetched += OnProductsFetched;
            m_StoreController.OnProductsFetchFailed += OnProductsFetchFailed;

            m_StoreController.OnPurchasesFetched += OnPurchasesFetched;
            m_StoreController.OnPurchasesFetchFailed += OnPurchasesFetchFailed;
            m_StoreController.OnPurchasePending += OnPurchasePending;
            m_StoreController.OnPurchaseFailed += OnPurchaseFailed;
            m_StoreController.OnPurchaseConfirmed += OnConFirmedOrder;
#endif
        }

        private async void InitializeIAP()
        {
#if using_iap
            try
            {
                SonatDebugType.Iap.Log("InitializePurchasing times: " + tried);
                if (IsInitialized())
                {
                    SonatDebugType.Iap.Log("Purchaser IsInitialized return");
                    return;
                }

                var catalogProvider = new CatalogProvider();

                foreach (var descriptor in StoreProductDescriptors)
                {
                    if (string.IsNullOrEmpty(descriptor.StoreProductId))
                    {
                        SonatDebugType.Iap.LogError("Product id is empty!");
                        continue;
                    }

                    if (StoreProductDescriptors.Count(x => x.StoreProductId == descriptor.StoreProductId) > 1)
                    {
                        SonatDebugType.Iap.LogError("Duplicate" + descriptor.StoreProductId);
                        continue;
                    }

                    if (descriptor.StoreProductId.Contains(" "))
                    {
                        SonatDebugType.Iap.LogError("Invalid id : contains space");
                        continue;
                    }

                    if (descriptor.active)
                    {
                        catalogProvider.AddProduct(descriptor.StoreProductId, descriptor.productType);
                    }
                }

                // (Khuyến nghị) đợi 1 frame nếu init quá sớm
                // await System.Threading.Tasks.Task.Yield();

                // Connect (vẫn trên main thread sau await)
                await m_StoreController.Connect();

                // Fetch products (MAIN THREAD)
                catalogProvider.FetchProducts(list => m_StoreController.FetchProducts(list));

                OnInitialized?.Invoke(this);
            }
            catch (Exception e)
            {
                SonatDebugType.Iap.LogError($"InitializeIAP exception: {e}");
                // TODO: retry/backoff hoặc fail gracefully
            }
#endif
        }


        public bool IsInitialized()
        {
#if using_iap
            return Ready;
#else
            return false;
#endif
        }

#if using_iap
        /// <summary>
        /// Invoked when connection is lost to the current store, or on a Connect() failure.
        /// </summary>
        /// <param name="failure">Information regarding the failure.</param>
        private void OnStoreDisconnected(StoreConnectionFailureDescription failure)
        {
            SonatDebugType.Iap.Log("Purchaser Store Disconnected: " + failure.message);
            if (tried < 5)
            {
                tried++;
                StartCoroutine(IeWaitToReload());
            }
        }

        /// <summary>
        /// Invoked with products that are successfully fetched.
        /// </summary>
        /// <param name="products">Products successfully returned from the app store.</param>
        private void OnProductsFetched(List<Product> products)
        {
            // Fetch purchases for successfully retrieved products
            m_StoreController.FetchPurchases();
            Ready = true;

            SonatDebugType.Iap.Log("Available items: ");
            foreach (var item in products)
            {
                if (item.availableToPurchase)
                {
                    Debug.Log(string.Join(" - ", item.metadata.localizedTitle, item.metadata.localizedDescription,
                        item.metadata.isoCurrencyCode, item.metadata.localizedPrice.ToString(CultureInfo.InvariantCulture),
                        Decimal.ToDouble(item.metadata.localizedPrice).ToString(CultureInfo.InvariantCulture).Replace(",", "."),
                        item.metadata.localizedPriceString));
                }
            }
        }

        /// <summary>
        /// Invoked when an attempt to fetch products has failed or when a subset of products failed to be fetched.
        /// </summary>
        /// <param name="failure">Information regarding the failure.</param>
        private void OnProductsFetchFailed(ProductFetchFailed failure)
        {
            SonatDebugType.Iap.Log("Purchaser Store Disconnected: " + failure.FailureReason);
            if (tried < 5)
            {
                tried++;
                StartCoroutine(IeWaitToReload());
            }
        }

        /// <summary>
        /// Invoked when previous purchases are fetched.
        /// </summary>
        /// <param name="orders">All active pending, completed, and deferred orders for previously fetched products.</param>
        private void OnPurchasesFetched(Orders orders)
        {
            foreach (var order in orders.PendingOrders)
            {
                ProcessPurchase(order);
            }

            confirmedOrders = new();
            foreach (var confirmedOrder in orders.ConfirmedOrders)
            {
                confirmedOrders.Add(confirmedOrder);
            }
        }

        private void OnConFirmedOrder(Order order)
        {
            confirmedOrders ??= new List<Order>();
            confirmedOrders.Add(order);
        }

        /// <summary>
        /// Invoked when an attempt to fetch previous purchases has failed.
        /// </summary>
        /// <param name="failure">Information regarding the failure.</param>
        private void OnPurchasesFetchFailed(PurchasesFetchFailureDescription failure)
        {
        }

        /// <summary>
        /// Invoked when a purchase needs to be processed and fulfilled.
        /// </summary>
        /// <param name="order">The order awaiting fulfillment.</param>
        private void OnPurchasePending(PendingOrder order)
        {
            ProcessPurchase(order);
        }

        private void OnPurchaseFailed(FailedOrder order)
        {
            if (order.Info.PurchasedProductInfo is not { Count: > 0 }) return;

            var productId = order.Info.PurchasedProductInfo[0].productId;
            //Product product = m_StoreController.GetProductById(productId);
            SonatDebugType.Iap.Log("PurchaseFailed " + order.Info.TransactionID + "/" + order.Details);
            var item = StoreProductDescriptors.Find(x => x.StoreProductId == productId);
            if (item != null)
            {
                if (order.FailureReason == PurchaseFailureReason.UserCancelled)
                {
                    if (buyIapContents.Remove(productId, out var buyIapContent))
                    {
                        new SonatLogCancelShopItem()
                        {
                            item_id = item.StoreProductId,
                            item_type = buyIapContent.buyLogData.item_type,
                            placement = buyIapContent.buyLogData.placement,
                            location = buyIapContent.buyLogData.location,
                            screen = buyIapContent.buyLogData.screen,
                            level = UserData.GetLevel(),
                        }.Post();
                    }
                }

                OnInAppPurchased?.Invoke(item.key, false);
            }

            isBuying = false;
        }

        private IEnumerator IeWaitToReload()
        {
            while (!SonatSdkManager.IsInternetConnection())
            {
                yield return new WaitForSeconds(0.5f);
            }

            yield return new WaitForSeconds(1);
            if (!IsInitialized())
                InitializeIAP();
        }


        private void BuyProductId(string productId)
        {
            if (IsInitialized())
            {
                SonatDebugType.Iap.Log($"IsInitialized {IsInitialized()} BuyProductId:{productId}");
                var product = m_StoreController.GetProductById(productId);
                if (product is { availableToPurchase: true })
                {
                    m_StoreController.PurchaseProduct(product);
                }
                else
                {
                    SonatDebugType.Iap.LogError($"Not available: {productId}");
                }
            }
            else
            {
                SonatDebugType.Iap.LogError($"Not IsInitialized {IsInitialized()} BuyProductId: {productId}");
            }
        }

        private void BuyCart(ICart cart)
        {
            if (IsInitialized())
            {
                SonatDebugType.Iap.Log($"IsInitialized {IsInitialized()} Buy Cart");
                m_StoreController.Purchase(cart);
            }
            else
            {
                SonatDebugType.Iap.LogError($"Not IsInitialized {IsInitialized()} Buy Cart");
            }
        }
#endif

        private string _GetPriceTextDefault(int itemId)
        {
            var item = StoreProductDescriptors.Find(x => x.key == itemId);
            return "$" + item.price;
        }


#if using_iap
        public static bool IsSubscribed(string storeProductId, out int expiredIn)
        {
            var subscriptionProduct = instance.m_StoreController.GetProductById(storeProductId);
            SonatDebugType.Iap.Log("subscriptionProduct " + subscriptionProduct);
            expiredIn = 0;
            try
            {
                if (subscriptionProduct == null) return false;
                var isSubscribed = IsSubscribedTo(subscriptionProduct, out SubscriptionInfo subscriptionInfo);
                if (isSubscribed)
                    expiredIn = SonatSdkHelper.GetEpochDate(subscriptionInfo.getExpireDate()) -
                                SonatSdkHelper.GetEpochDate();
                return isSubscribed;
            }
            catch (StoreSubscriptionInfoNotSupportedException)
            {
                return false;
            }

            return false;
        }

        private static bool IsSubscribedTo(Product subscription, out SubscriptionInfo subscriptionInfo)
        {
            subscriptionInfo = null;
            SonatDebugType.Iap.Log("subscription" + subscription);
            // If the product doesn't have a receipt, then it wasn't purchased and the user is therefore not subscribed.
            if (subscription.receipt == null)
            {
                return false;
            }

            //The intro_json parameter is optional and is only used for the App Store to get introductory information.
            var subscriptionManager = new SubscriptionManager(subscription, null);
            SonatDebugType.Iap.Log("subscriptionManager" + subscriptionManager);

            // The SubscriptionInfo contains all of the information about the subscription.
            // Find out more: https://docs.unity3d.com/Packages/com.unity.purchasing@3.1/manual/UnityIAPSubscriptionProducts.html

            subscriptionInfo = subscriptionManager.getSubscriptionInfo();
            SonatDebugType.Iap.Log("subscriptionInfo" + subscriptionInfo);

            return subscriptionInfo.isSubscribed() == Result.True;
        }
#endif

        private string _GetPriceText(int itemId)
        {
            var item = StoreProductDescriptors.Find(x => x.key == itemId);

            if (item == null)
            {
                SonatDebugType.Iap.LogError($"Not available: {itemId}");
                return "Not Found";
            }
#if UNITY_EDITOR
            return "$" + item.price;
#endif
#if using_iap
            var product = m_StoreController.GetProductById(item.StoreProductId);
            if (product is { availableToPurchase: true })
            {
                if (_currencyLast.Contains(product.metadata.isoCurrencyCode))
                    return MoveAllSc(product.metadata.localizedPriceString);
                return product.metadata.localizedPriceString;
            }

#endif

            return "$" + item.price;
        }

        private string _GetPreSalePrice(int itemId, float discountPercent)
        {
            var item = StoreProductDescriptors.Find(x => x.key == itemId);
            string currentPrice = "0";

            if (item == null)
            {
                SonatDebugType.Iap.LogError($"Not available: {itemId}");
                return "Not Found";
            }
#if UNITY_EDITOR
            currentPrice = $"${item.price}";
#endif
#if using_iap
            var product = m_StoreController.GetProductById(item.StoreProductId);
            if (product is not { availableToPurchase: true })
            {
                return "";
            }



            // 1. Lấy giá thực tế (Giá user sẽ trả) từ IAP
            decimal realPrice = product.metadata.localizedPrice;
            string realPriceString = product.metadata.localizedPriceString; // VD: "$50.00" hoặc "50.000 đ"

            // 2. Tính toán giá gốc (Giá ảo để gạch đi)
            // Công thức: Giá Gốc = Giá Thực / (1 - %Giảm)
            decimal originalPrice = 0;
            if (discountPercent is < 1 and >= 0)
            {
                originalPrice = realPrice / (decimal)(1f - discountPercent);
            }
            else
            {
                originalPrice = realPrice;
            }

            // Làm tròn số (thường tiền tệ làm tròn 2 số thập phân)
            originalPrice = Math.Round(originalPrice, 2);

            // 3. Format hiển thị cho Giá Gốc (Giữ đúng ký hiệu tiền tệ)
            // Mẹo: Chúng ta lấy chuỗi giá thật ("$50.00"), thay số 50 bằng số 100
            // Cách này giúp giữ nguyên vị trí của ký hiệu $ hoặc đ


            if (realPriceString.Contains(realPrice.ToString()))
            {
                currentPrice = realPriceString.Replace(
                    realPrice.ToString(), // Tìm số 50
                    originalPrice.ToString() // Thay bằng số 100
                );
            }
            else
            {
                currentPrice = $"{originalPrice} {product.metadata.isoCurrencyCode}";
            }
#endif

            return currentPrice;
        }

        private string _GetProductName(int itemId)
        {
            var item = StoreProductDescriptors.Find(x => x.key == itemId);

            if (item == null)
            {
                SonatDebugType.Iap.LogError($"Not available: {itemId}");
                return "Not Found";
            }
#if !UNITY_EDITOR
            return null;
#endif
#if using_iap
            var product = m_StoreController.GetProductById(item.StoreProductId);
            if (product is { availableToPurchase: true })
            {
                return product.metadata.localizedTitle;
            }

#endif
            return null;
        }


        private bool _IsItemAvailable(int itemId)
        {
            var item = StoreProductDescriptors.Find(x => x.key == itemId);
#if using_iap
            var product = m_StoreController.GetProductById(item.StoreProductId);
            if (product is { availableToPurchase: true })
                return true;

#endif
            return false;
        }

        private bool _CheckHasPurchasedProductId(int id)
        {
            var item = StoreProductDescriptors.Find(x => x.key == id);
#if using_iap
            return confirmedOrders?.FindIndex(e => e.Info.PurchasedProductInfo.FindIndex(productInfo => productInfo.productId == item.StoreProductId) >= 0) >=
                   0;
#endif
            return false;
        }


        private void _Buy(int id, SonatBuyLogData buyLog)
        {
            if (isBuying)
            {
                OnInAppPurchased?.Invoke(id, false);
                return;
            }


            if (!IsInitialized())
            {
                SonatDebugType.Iap.Log("Buy Fail: Purchaser not initialized");
                OnInAppPurchased?.Invoke(id, false);
                return;
            }

            //_onSuccess = new KeyValuePair<int, Action<bool>>(id, onComplete);
            var product = StoreProductDescriptors.Find(x => x.key == id);

            var content = new BuyIapContent()
            {
                buyLogData = buyLog
            };
            buyIapContents.TrySetValue(product.StoreProductId, content);

            SonatDebugType.Iap.Log("Try to buy key " + product.StoreProductId);

            isBuying = true;

            SonatFirebase.analytic.LogEvent(EventNameEnum.buy_iap, new[]
            {
                new LogParameter(ParameterEnum.product_click_buy, product.StoreProductId)
            });

            SonatAds.blockOnFocusAds = true;
#if using_iap
            BuyProductId(product.StoreProductId);
#endif
        }

#if using_iap
        private void ProcessPurchase(PendingOrder order)
        {
            if (order.Info.PurchasedProductInfo is not { Count: > 0 }) return;
            var productId = order.Info.PurchasedProductInfo[0].productId;
            isBuying = false;

            var item = StoreProductDescriptors.Find(x => x.StoreProductId == productId);
            Product product = m_StoreController.GetProductById(productId);
            if (item == null || product == null) return;

            SonatDebugType.Iap.Log($"{item.StoreProductId} specificId " + productId);

            itemsPurchased.Add(item.key);
            packsPendingReward.Add(item.key);
            OnBuySuccessHandler(item.key);

            m_StoreController.ConfirmPurchase(order);
            if (buyIapContents.Remove(productId, out var buyIapContent))
            {
                var log = new SonatLogBuyShopItemIap(buyIapContent.buyLogData)
                {
                    currency = product.metadata.isoCurrencyCode,
                    item_id = item.StoreProductId,
                    value = (float)product.metadata.localizedPrice,
                    value_in_usd = item.price,
                    is_first_buy = itemsPurchased.Count == 1,
                    level = UserData.GetLevel(),
                    mode = UserData.GetMode(),
                    buy_count = itemsPurchased.Count
                };

#if UNITY_ANDROID
                VerifyIap(item.productType != ProductType.Subscription ? "product" : "subscription"
                    , Application.identifier, productId, order.Info.TransactionID,
                    () =>
                    {
                        sn_ltv_iap += item.price;
                        log.Post();
                    });
#else
                sn_ltv_iap += item.price;
                log.Post();
#endif
            }
        }
#endif

        private void VerifyIap(string kind, string packageName, string skuId, string purchaseToken, Action afterVerify)
        {
            WWWForm form = new WWWForm();
            form.AddField("kind", kind);
            form.AddField("package_name", packageName);
            form.AddField("sku_id", skuId);
            form.AddField("purchase_token", purchaseToken);
            StartCoroutine(IeVerify(form, afterVerify));
        }

        private IEnumerator IeVerify(WWWForm form, Action afterVerify)
        {
            yield return new WaitForSeconds(2);
            using (UnityWebRequest www = UnityWebRequest.Post(instance.verifyUrl, form))
            {
                var cert2 = new ForceAcceptAll();
                www.certificateHandler = cert2;
                yield return www.SendWebRequest();
                SonatDebugType.Iap.Log(www.responseCode.ToString());
                if (www.responseCode == 200)
                {
                    var respond = JsonConvert.DeserializeObject<RespondVerifyIap>(www.downloadHandler.text);
                    if (respond == null || respond.errorCode != 0 || respond.data == null || respond.data.purchaseType == 0)
                    {
                        SonatDebugType.Iap.Log("not valid");
                    }
                    else
                    {
                        afterVerify.Invoke();
                    }
                }
                else
                    afterVerify.Invoke();

                if (www.result != UnityWebRequest.Result.Success)
                {
                    SonatDebugType.Iap.LogError(www.error);
                }
                else
                {
                    SonatDebugType.Iap.Log(www.downloadHandler.text);
                }
            }
        }


        private void OnBuySuccessHandler(int id)
        {
            isBuying = false;
            OnInAppPurchased?.Invoke(id, true);
            SonatDebugType.Iap.Log("OnBuySuccessHandler ShopItemKey:" + id);
        }

        private void _RestorePurchases(Action<List<int>> onRestoreComplete)
        {
#if using_iap
            UnityIAPServices.StoreController().RestoreTransactions((success, error) =>
            {
                List<int> packages = new List<int>();

                if (confirmedOrders != null)
                {
                    foreach (var order in confirmedOrders)
                    {
                        var productId = order.Info.PurchasedProductInfo[0].productId;
                        var item = StoreProductDescriptors.FirstOrDefault(e => e.storeProductId == productId);
                        if (item != null)
                        {
                            packages.Add(item.key);
                        }
                    }
                }

                onRestoreComplete?.Invoke(packages);
            });
#endif
        }


        #region Static Functions

        public static void Buy(int id, SonatBuyLogData buyLog)
        {
            if (instance == null)
            {
                return;
            }

            instance._Buy(id, buyLog);
        }

        public static bool PaidUser()
        {
            if (instance == null) return false;
            return itemsPurchased.Count > 0;
        }

        public static List<int> GetListItemPurchased()
        {
            if (instance == null) return null;
            return itemsPurchased.Current;
        }

        public static bool CheckItemBought(int id)
        {
            if (instance == null) return false;
            return itemsPurchased.Current != null && itemsPurchased.Current.FindIndex(e => e == id) >= 0;
        }

        public static List<int> GetPackPurchased()
        {
            if (instance == null) return null;
            return itemsPurchased.Current;
        }

        public static void RestorePurchases(Action<List<int>> onRestoreComplete)
        {
            if (instance == null) return;
            instance._RestorePurchases(onRestoreComplete);
        }

        public static List<int> GetPacksPendingReward()
        {
            if (instance == null) return null;
            return instance.packsPendingReward.Current;
        }

        public static void OnPackRewarded(int id)
        {
            if (instance == null) return;
            instance.packsPendingReward.Remove(id);
        }

        public static string GetCurrencySymbol(string code)
        {
            RegionInfo regionInfo =
                (from culture in CultureInfo.GetCultures(CultureTypes
                        .InstalledWin32Cultures)
                    where culture.Name.Length > 0 && !culture.IsNeutralCulture
                    let region = new RegionInfo(culture.LCID)
                    where String.Equals(region.ISOCurrencySymbol, code, StringComparison.InvariantCultureIgnoreCase)
                    select region).First();

            return regionInfo.CurrencySymbol;
        }

        public static string GetPriceText(int itemId)
        {
            if (instance == null) return "";
            return instance._GetPriceText(itemId);
        }

        public static string GetPreSalePrice(int itemId, float discount)
        {
            if (instance == null) return "";
            return instance._GetPreSalePrice(itemId, discount);
        }

        public static string GetProductName(int itemId)
        {
            if (instance == null) return null;
            return instance._GetProductName(itemId);
        }

        public static string GetPriceTextDefault(int itemId)
        {
            if (instance == null) return "";
            return instance._GetPriceTextDefault(itemId);
        }


        public static bool IsItemAvailable(int itemId)
        {
            if (instance == null) return false;
            return instance._IsItemAvailable(itemId);
        }

        public static StoreProductDescriptor GetStoreProductDescriptor(int storeProductId)
        {
            if (instance == null) return null;
            return instance.StoreProductDescriptors.FirstOrDefault(e => e.key == storeProductId);
        }

        public static int ConvertProductIDToShopKey(string storeProductId)
        {
            if (instance == null) return -1;
            var storeProductDescriptor = instance.StoreProductDescriptors.FirstOrDefault(e => e.storeProductId == storeProductId);
            return storeProductDescriptor == null ? -1 : storeProductDescriptor.key;
        }

        public static bool CheckHasPurchasedProductId(int id)
        {
            if (instance == null) return false;
            return instance._CheckHasPurchasedProductId(id);
        }

        public static CultureInfo GetCultureInfoFromIsoCurrencyCode(string code)
        {
            foreach (CultureInfo ci in CultureInfo.GetCultures(
                         CultureTypes.SpecificCultures))
            {
                RegionInfo ri = new RegionInfo(ci.LCID);
                if (ri.ISOCurrencySymbol == code)
                    return ci;
            }

            return null;
        }

        #endregion


        private class ForceAcceptAll : CertificateHandler
        {
            protected override bool ValidateCertificate(byte[] certificateData)
            {
                return true;
            }
        }


        private static String MoveAllSc(String str)
        {
            // Take length of string 
            int len = str.Length;

            // regular expression to check  
            // char is special or not. 
            var regx = new Regex("[a-zA-Z0-9\\.\\,\\s+]");

            // traverse string 
            String res1 = "", res2 = "";
            for (int i = 0; i < len; i++)
            {
                char c = str[i];

                // check char at index i is a special char 
                if (regx.IsMatch(c.ToString()))
                    res1 = res1 + c;
                else
                    res2 = res2 + c;
            }

            return res1 + res2;
        }
    }

    [Serializable]
    public class RespondVerifyIap
    {
        public int errorCode;
        public VerifyData data;
    }

    [Serializable]
    public class VerifyData
    {
        public string kind;
        public string orderId;
        public int purchaseType;
        public string regionCode;
        public int purchaseState;
    }
}

#endif