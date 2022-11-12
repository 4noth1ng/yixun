
const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:'./',
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://43.138.210.224:9081', // 如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域\
        pathRewrite: {
          '^/api': ''
        }
      },
      '/yiban': {
        target: 'https://oauth.yiban.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/yiban': ''
        }
      }
    },
  },
  pwa: {
    iconPaths: {
      favicon32: '',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico',
    }
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.externals({
        'vue': 'Vue',
        'element-ui': 'ELEMENT'
      });
    }
  }
})