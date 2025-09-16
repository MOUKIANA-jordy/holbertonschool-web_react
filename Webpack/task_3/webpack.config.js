const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    header: './modules/header/header.js',
    body: './modules/body/body.js',
    footer: './modules/footer/footer.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  devServer: {
    static: path.join(__dirname, 'public'),
    port: 8564,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].[ext]', outputPath: 'assets/' }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { progressive: true },
              optipng: { enabled: true },
              pngquant: { quality: [0.65, 0.9], speed: 4 },
              gifsicle: { interlaced: false }
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Holberton Dashboard',
      template: 'index.html'
    })
  ]
};
