const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path')
const webpack = require('webpack');
const { argv } = require('process');

module.exports = (env, argv) => ({
  optimization: {
    minimize: false
  },

  mode: argv.mode === 'production' ? 'production' : 'development',

  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === 'production' ? false : 'inline-source-map',

  entry: {
    ui: './src/ui/ui.tsx', // The entry point for your UI code
    code: './src/figma/main.ts', // The entry point for your plugin code
  },

  module: {
    rules: [
      // Converts TypeScript code to JavaScript
      { 
        test: /\.tsx?$/, 
        use: 'ts-loader', 
        exclude: /node_modules/
      },

      // Enables including CSS by doing "import './file.css'" in your TypeScript code
      { 
        test: /\.css$/, 
        use: ["style-loader", "css-loader"],
      },
      // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
      // { test: /\.(png|jpg|gif|webp|svg|zip)$/, loader: [{ loader: 'url-loader' }] }
      { 
        test: /\.svg/,
        type: 'asset/inline'
      },
      /*
      { 
        test: /\.worker\.ts$/,
        type: 'asset/inline',
        generator: {
          dataUrl: (content) => {
            return `data:text/javascript;base64,${content.toString('base64')}`
          }
        }
      },
      */
      {
        test: /svgo.browser\.m?js$/,
        
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      }
    ]
  },

  // Webpack tries these extensions for you if you omit the extension like "import './file'"
  resolve: { 
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      svgo: require.resolve('svgo/dist/svgo.browser.js')
    }
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'), // Compile into a folder called "dist"
    iife: true,
  },
 
  // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
  plugins: [

    new webpack.DefinePlugin({
      'global': {} // Fix missing symbol error when running in developer VM
    }),
    new HtmlWebpackPlugin({
      inject: "body",
      template: './src/ui/ui.html',
      filename: 'ui.html',
      chunks: ['ui'],
      cache: false,
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/ui/]),
  ],
})
