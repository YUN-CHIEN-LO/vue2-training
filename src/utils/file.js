import { isFunction } from "lodash";

/**
 * 取得資料夾內的檔案清單
 *
 * @param {Function} modulesFiles - Webpack API: require.context()
 * @returns {object}
 */
export function getFileList(modulesFiles) {
  if (!isFunction(modulesFiles))
    console.error(
      "[Type Error]: Must be a function, please use webpack api: require.context()"
    );

  // 遍歷資料夾中檔案
  return modulesFiles.keys().reduce((files, filePath) => {
    // 取出檔案名稱的第一個字串
    const fileName = filePath.replace(/^\.\/(.*)\.\w+$/, "$1");
    const value = modulesFiles(filePath);
    files[fileName] = value.default;

    return files;
  }, {});
}
