const path = require('path');
const webpack = require('webpack');
const PrettierPlugin = require("prettier-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: 'source-map',
  entry: './src/js/index.ts',
  output: {
    filename: 'simple-svg-gauge.js',
    path: path.resolve(__dirname, 'build'),
    library: 'SimpleSvgGauge',
    libraryTarget: 'umd',
  },
  optimization: {
    minimize: true,
  },
  devServer: {
    open: true,
    hot: true,
    host: 'localhost',
    static: path.join(__dirname, 'build'),
    port: 8080,
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new PrettierPlugin(),
  ]
};