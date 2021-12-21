const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const CopyPlugin = require('copy-webpack-plugin');

require('babel-polyfill');

module.exports = {
  // Input file, main entry point
  entry: ['babel-polyfill', './src/index.tsx'],

  // Output files
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[chunkhash].js',
    assetModuleFilename: 'assets/[hash][ext]',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    alias: {
      components: path.resolve(__dirname, 'src/ts/components'),
      pages: path.resolve(__dirname, 'src/ts/pages/'),
    },
  },

  // Plugins
  plugins: [
    // Clearing dist before new build
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    // HTML building
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: './public/index.html',
    }),
    // Copy images
    new CopyPlugin({
      patterns: [
        {
          from: 'src/assets/images',
          noErrorOnMissing: true,
        },
      ],
    }),
    // Notification
    new WebpackNotifierPlugin({ alwaysNotify: false }),
  ],

  // Bundled files
  module: {
    rules: [
      // js
      {
        test: /\.(ts|tsx)$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },

      // images
      {
        test: /\.(?:ico|png|jp(e*)g|gif|svg)$/,
        type: 'asset/resource',
      },

      // fonts
      {
        test: /\.(otf|ttf|eot|woff|woff2)$/,
        type: 'asset/resource',
      },
    ],
  },

  // Optimization
  optimization: {
    // Chunks for our application
    splitChunks: {
      // We will move all our npm packages into a separate file with a specific hash
      // So that the client does not download everything anew every time it changes.
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
    minimizer: [],
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
