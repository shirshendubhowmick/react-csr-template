const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const common = require('./webpack.common');

const commonWebpackConstants = require('./webpackConstants/common/constants');
const developmentWebpackConstants = require('./webpackConstants/development/constants');

const finalWebpackConstants = {
  ...commonWebpackConstants,
  ...developmentWebpackConstants,
};

Object.keys(finalWebpackConstants).forEach((key) => {
  finalWebpackConstants[key] = JSON.stringify(finalWebpackConstants[key]);
});

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'src/')],
        exclude: [path.resolve(__dirname, 'src/styles/')],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              url: true,
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'src/styles/')],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              url: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'node_modules')],
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new DefinePlugin({
      ...finalWebpackConstants,
    }),
    new ForkTsCheckerWebpackPlugin(),
    // new HotModuleReplacementPlugin(),
  ],
  stats: {
    colors: true,
    reasons: true,
    chunks: true,
  },
  devServer: {
    // allowedHosts: [],
    client: {
      progress: true,
      webSocketURL: {
        hostname: 'localhost',
      },
    },
    host: '0.0.0.0',
    port: 7050,
    hot: true,
    historyApiFallback: true,
    compress: true,
  },
});
