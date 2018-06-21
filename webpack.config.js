const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');

const  HTMLWebpackPluginConfig = new HtmlwebpackPlugin({
  title: 'testApp',
  template: `${__dirname}/src/index.html`,
  filename: 'index.html'
})

module.exports = {
  // entry: './src/index.tsx',
  entry: [
    './src/index.tsx',
    // 'webpack-hot-middleware/client?http://localhost:3000'// host 與 port
  ],
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    HTMLWebpackPluginConfig,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    inline: true,
    hot: true,
  }
};