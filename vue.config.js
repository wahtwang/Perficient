module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    proxy: 'http://101.132.107.117:8080/'
  }
}
