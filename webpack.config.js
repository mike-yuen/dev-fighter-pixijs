const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: "./src/App.ts",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
    publicPath: process.env.NODE_ENV === 'production' ? '/game/' : '/'
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "inline-source-map",
  resolve: {
    // Add '.ts' as resolvable extensions.
    extensions: [".ts", ".js"],
    alias: {
      '@': path.resolve(__dirname, './src/')
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: "file-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new CopyWebpackPlugin(
      {
        patterns: [
          { from: 'assets', to: 'assets' }
        ]
      }),
    new CleanWebpackPlugin({})
  ],
  devServer: {
    static: path.join(__dirname, "./dist"),
    host: '0.0.0.0',
    compress: true,
    port: 8088
  },
  externals: {
    // Don't bundle giant dependencies, instead assume they're available in
    // the html doc as global variables node module name -> JS global
    // through which it is available
    // "pixi.js": "PIXI"
  }
}