const path = require('path');
const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
  mode: 'development',
  target: 'web',
  devtool: 'inline-source-map',

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    progress: true,
    hot: true,
    overlay: true,
    open: true,
    historyApiFallback: true,
  },
});
