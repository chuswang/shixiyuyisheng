const path = require("path");
/*全局引入less*/
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // 文件路径
      patterns: [ path.resolve(__dirname, "src/assets/less/index.less")]
    }
  }
}
