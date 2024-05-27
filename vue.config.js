const { defineConfig } = require('@vue/cli-service');
const dotenv = require('dotenv');

// 读取 .env 文件并将环境变量注入到 process.env 中
dotenv.config();

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      fallback: {
        "util": require.resolve("util/"),
        "fs": false,
        "path": require.resolve("path-browserify"),
        "os": require.resolve("os-browserify/browser"),
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify")
      }
    }
  }
});
