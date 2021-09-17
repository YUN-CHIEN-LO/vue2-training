import axios from "axios";
import router from "@/router";
import store from "@/store";

// 實例化 axios
export const REST = axios.create({
  // 服務終端
  baseURL: process.env.VUE_APP_BASE_API,
  // 跨域請求挾帶 cookies
  withCredentials: true,
  // 請求回應超時
  timeout: 30000,
  // 自訂標頭
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

// 請求攔截器
REST.interceptors.request.use(
  // 請求之前
  (config) => {
    // 寫入認證令牌
    // config.headers.Authorization = `Bearer ${}`;
    return config;
  },
  // 請求錯誤
  (error) => {
    return Promise.reject(error);
  }
);

// 回應攔截器
REST.interceptors.response.use(
  // 回應正常
  (response) => {
    return response;
  },
  // 回應錯誤
  (error) => {
    // 取得 回覆資源
    let { response } = error;
    // 取得 錯誤狀態碼
    let errorCode = response ? response.status : 0;

    // 依照 錯誤狀態碼 處理請求
    switch (errorCode) {
      // 請求錯誤
      case 400:
        return Promise.reject(error);
      // 需要授權 (未登入)
      case 401:
        break;
      // 權限不足 (已登入)
      case 403:
        break;
      // 資源不存在
      case 404:
        return Promise.reject(error);
      // 禁用方法
      case 405:
        return Promise.reject(error);
      // 狀態衝突
      case 409:
        return Promise.reject(error);
      // 資源已刪除
      case 410:
        return Promise.reject(error);
      // 資源已鎖定
      case 423:
        return Promise.reject(error);
      // 伺服器錯誤
      case 500:
        break;
      // 伺服器無回應
      case 502:
        break;
      // 伺服器維護
      case 503:
        break;
      // 伺服器回應超時
      case 504:
        break;
      // 其他不明錯誤
      default:
        if (window.navigator.onLine) {
          // 錯誤不明: 回傳失敗資訊
          return Promise.reject(error);
        } else {
          // 網路異常: 移除登入資訊與狀態
          store.dispatch("");
          // 轉送路由至登入頁
          router.replace({ path: "/" });
        }
        break;
    }
  }
);
