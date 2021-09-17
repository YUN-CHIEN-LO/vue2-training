module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:jsdoc/recommended",
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/prettier"
  ],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": "off",
    // jsDoc: 關閉 return 註釋強制描述
    "jsdoc/require-returns-description": "off",
    // 開啟 v-slot 指令支援修飾符
    "vue/valid-v-slot": [
      "error",
      {
        "allowModifiers": true
      }
    ],
    // 關閉禁用不必要的轉義字符檢查
    "no-useless-escape": 0,
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
