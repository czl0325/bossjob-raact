const {
  override,
  fixBabelImports,
  addLessLoader,
} = require("customize-cra");


module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd-mobile", libraryDirectory: "es", style: true
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        "@brand-primary": "#1cae82", // 正常
        "@brand-primary-tap": "#1DA57A", // 按下
      }
    }
  })
);

