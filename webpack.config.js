const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

//Get env data
const env = dotenv.config().parsed;
//Transform to object
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = () => {
  return {
  mode: 'production',
  entry: {
    main: './client/app.js'
  },
  output: {
    path: path.join(__dirname, './public/dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin(envKeys),
    //new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      templateContent: ({htmlWebpackPlugin}) => `
      <!DOCTYPE html>
      <html>      
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>1712039-Retro</title>
        ${htmlWebpackPlugin.tags.headTags}
      </head>      
      <body>
        <div id="root"></div>
        ${htmlWebpackPlugin.tags.bodyTags}
      </body>
      </html>      
      `
    }) // so that file hashes don't change unexpectedly
  ],
  module: {
    rules: [
        {
          loader: 'babel-loader', 
          test: /\.js$/, 
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ]
        }
      ]
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  devServer: {
    port: 8080,
    proxy: {
      "*": {
        "changeOrigin": true,
        "target": "http://localhost:3000"
      }
    },
    hot: true,
    contentBase: path.join(__dirname, 'public/dist'),
    historyApiFallback: true
  }
}
};
