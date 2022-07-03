module.exports = {
  // 生产模式下打包不生成.map文件
  productionSourceMap: false,
  lintOnSave: false,
  // 代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://netease-cloud-music-api-sand-chi.vercel.app',
        pathRewrite: {
          '^/api': ''
          // 路径重写  代理到 http://netease-cloud-music-api-sand-chi.vercel.app/banner?type=0
        }
      }
    }
  }
}