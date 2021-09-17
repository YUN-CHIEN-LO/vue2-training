module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  // 測試覆蓋率
  collectCoverage: true,
  collectCoverageFrom: ["src/components/*.{js,vue}"],
  // 初始化設置
  setupFilesAfterEnv: ["./tests/setup.js"],
};
