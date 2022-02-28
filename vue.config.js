module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8080,
    proxy: {
      '/': {
        ws: false,
        target: 'http://localhost:8081',
        changeOrigin: true,
        pathReWrite: {
          '^/': '/'
        }
      }

    }
  }

}
