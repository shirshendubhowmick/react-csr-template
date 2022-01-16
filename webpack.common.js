const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.js', '.tsx'],
  },
  entry: ['regenerator-runtime', './src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        include: [path.resolve(__dirname, 'src/')],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|png|jpg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new CopyPlugin({
    //   patterns: [
    //     { from: 'public/static', to: 'static' },
    //     // TODO: Change this when we have proper environments
    //     { from: 'public/robots/common-robots.txt', to: 'robots.txt' },
    //     // TODO: Remove after we move away from netlify
    //     { from: 'public/misc/_redirects' },
    //   ],
    // }),
  ],
};
