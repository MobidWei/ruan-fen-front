const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  chainWebpack: (config) => {
    // 给路径起别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"));
  },

  devServer: {
    port: 8081,
  },
};
