import { REST } from "../common";

export default {
  /**
   * 取得使用者資訊
   *
   * @param {object} info - data
   * @returns {Promise}
   */
  getForm(info) {
    return REST.get(`/api/form/info`, {
      params: {
        info: info,
      },
    });
  },
};
