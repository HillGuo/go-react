var path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  entry: {
    index: './src/pages/index.js',
    login: './src/pages/login.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        filename: "index.html",//生成的index.html
        template: "./src/template.html", //模板
        chunks: ["index"]
      }),
    new HtmlWebpackPlugin(
      {
        filename: "login.html",//生成的index.html
        template: "./src/template.html", //模板
        chunks: ["login"]
      })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist")
  }
};