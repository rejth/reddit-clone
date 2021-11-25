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

  module: {
    rules: [
      // css
      {
        test: /\.css$/,
        use: [
          'style-loader', // creates `style` nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'postcss-loader',
        ],
      },
    ],
  },
});
