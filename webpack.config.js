const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pages = [
  {
    filename: 'index.html',
    path: './src/html/pages/index.html',
    title: '500на700 | Главная',
  },
].map(
  (row) =>
    new HtmlWebpackPlugin({
      filename: row.filename,
      template: row.path,
      inject: false,
      title: row.title,
    })
);

let config = {
  entry: {
    main: path.resolve(__dirname, './src/js/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          {
            loader: 'css-loader',
            options: {
              url: true,
              import: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.html$/,
        include: path.resolve(__dirname, './src/html/includes'),
        use: ['raw-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/images',
          to: 'images',
        },
      ],
    }),
    new webpack.HotModuleReplacementPlugin(),
  ].concat(pages),
  performance: {
    hints: false,
  },
  devServer: {
    port: 3030,
    hot: false,
    liveReload: true,
  },
};

module.exports = config;
