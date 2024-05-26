const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  configureWebpack: {
    resolve: {
      fallback: {
        "util": require.resolve("util/"),
        "fs": false
      }
    },
    plugins: [
      new NodePolyfillPlugin()
    ]
  }
})
