/*
 *  Vue Config
 */
module.exports = {
  devServer: {
    proxy: 'http://localhost:3001/',
    port: 4300,
    open: true
  },
  runtimeCompiler: true,
  chainWebpack: config => {
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .options({
        fix: true
      });
  }
};
