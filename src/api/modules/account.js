import { REST } from "../common";

export default {
  /**
   * 取得使用者資訊
   *
   * @returns {Promise}
   */
  getInfo() {
    return REST.get(`/api/account/info`);
  },
  getToken(code, state) {
    return REST.get(`/login/auth`, {
      params: {
        authclient: "nueip",
        redirect_url: process.env.VUE_APP_REDIRECT_URL,
        state: state,
        code: code,
      },
    });
  },
};
