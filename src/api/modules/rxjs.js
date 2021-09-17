import { REST } from "../common";

export default {
  /**
   * Rxjs 監聽 API
   *
   * @returns {Promise}
   */
  getRxjs() {
    return REST.get(`/api/rxjs`, {});
  },
};
