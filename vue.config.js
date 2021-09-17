"use strict";
let vcookie = "";

// Node.js 路徑模組
const path = require("path");
// Loadsh Tree-Shaking 套件
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
// 程式碼壓縮套件
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  // 打包輸出的目錄名稱
  outputDir: "dist",
  // 是否開啟 ESlint 檢測
  lintOnSave: true,
  // 是否在打包時產出 SourceMap
  productionSourceMap: false,
  // webpack source map 設定
  configureWebpack: {
    // 配置目錄解析別名
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    plugins: [
      // Loadsh Tree-Shaking 套件
      new LodashModuleReplacementPlugin(),
    ],
    // Source Map 配置
    devtool:
      process.env.NODE_ENV === "development"
        ? "cheap-module-eval-source-map"
        : false,
    optimization: {
      minimize: true,
      minimizer: [
        // 程式碼壓縮
        new TerserPlugin({
          // 編譯快取
          cache: true,
          // 並行處理
          parallel: true,
          // 分離註解
          extractComments: true,
        }),
      ],
      // 對於每個運行模組，引入的 mode 會被分別初始化
      // 每次 build 不更動 webpack 編譯時會重置檔案編號的情況
      runtimeChunk: {
        name: "runtime",
      },
      // 分割公用模組 (Webpack)
      splitChunks: {
        // 全部分割 (async 異步 | all 全部不分 | initial 入口模組)
        chunks: "all",
        name: true,
        // 文件在壓縮前的最小值
        minSize: 10000,
        // 文件在壓縮前的最大值
        maxSize: 250000,
        cacheGroups: {
          // 公用模組或函式庫
          commons: {
            // 只分割入口模組
            chunks: "initial",
            // 分割出來的檔案命名
            name: "commons",
            // 提取被引入2次以上的 code
            minChunks: 2,
            // 權重:檔案的優先順序，數字越大表示優先級越高
            priority: 5,
          },
          // 第三方類庫
          vendor: {
            // 提取引入的模組
            test: /[\\/]node_modules[\\/]/,
            // 只分割入口模組
            chunks: "initial",
            // 分割出來的檔案命名
            name: "chunk-vendor",
            // 權重:檔案的優先順序，數字越大表示優先級越高
            priority: 20,
            // 忽略全域的部分選項
            enforce: true,
          },
          styles: {
            // 全部分割
            chunks: "all",
            // 分割出來的檔案命名
            name: "chunk-styles",
            // 提取引入的樣式檔
            test: /\.(sa|sc|c)ss$/,
            // 權重:檔案的優先順序，數字越大表示優先級越高
            priority: 10,
            // 忽略全域的部分選項
            enforce: true,
          },
        },
      },
    },
  },
  chainWebpack: (config) => {
    // 移除 prefetch 插件，避免加載多餘的資源
    config.plugins.delete("prefetch");
    // 移除 preload 插件，避免加載多餘的資源
    config.plugins.delete("preload");
  },
  devServer: {
    // 啟動後開啟瀏覽器
    open: true,
    // 設置主機地址
    host: process.env.VUE_APP_HOST,
    // 設置默認埠號
    port: process.env.VUE_APP_PORT,
    // 關閉 HTTPS 協定
    https: false,
    
  },
};
