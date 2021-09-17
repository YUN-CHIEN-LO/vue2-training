const getters = {
  // 功能導航開合
  sidebarOpened: (state) => state.sidebar.sidebarOpened,
  // Access Token
  userToken: (state) => state.user.token,
  // 表單
  formInfo: (state) => state.form.formInfo,
  color: (state) => state.form.color,
  // 顯示vuex Json 格式
  showJson: (state) => state.greet.showJson,
  accessMenus: (state) => state.permission.accessMenus,
};

export default getters;
