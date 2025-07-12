// vue.config.js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    // для старых версий
    overlay: false,
    // для webpack-dev-server v4+
    client: {
      overlay: false,
    },
  },
})