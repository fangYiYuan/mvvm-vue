const path = require('path')
module.exports = {
  entry:path.join(__dirname, './src/index.js'),//指定打包文件
  output:{
  path:path.join(__dirname, './dist'),//指定打包输入文件
  filename: 'bundle.js'
  }
  }