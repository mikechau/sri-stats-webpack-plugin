/* eslint quotes: [2, "double", "avoid-escape"] */

"use strict";

var webpack = require("webpack");
var path = require("path");
var CleanPlugin = require("clean-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var SriStatsPlugin = require("sri-stats-webpack-plugin");

var PROJECT_DIR = process.env.WEBPACK_OUTPUT_PATH || process.cwd();


module.exports = {
  "devtool": "false",

  "entry": {
    "main": [
      "./src/index.js"
    ]
  },

  "output": {
    "path": path.join(PROJECT_DIR, "build", "assets", "[hash]"),
    "publicPath": "/assets/[hash]/",
    "filename": "[name]-[hash].js",
    "chunkFilename": "chunk-[id].[name]-[hash].js",
    "sourceMapFilename": "debug/[file]-[hash].id-[id].map",
    "pathInfo": "false"
  },

  "debug": false,

  "resolve": {
    "root": path.join(PROJECT_DIR, "src"),
    "extensions": ["", ".js"],
    "alias": {
      "app": path.join(PROJECT_DIR, "src")
    }
  },

  "resolveLoader": {
    "root": path.join(PROJECT_DIR, "node_modules")
  },

  "module": {
    "loaders": [
      {
        "test": /\.css$/,
        "loader": ExtractTextPlugin.extract('style-loader', 'css')
      }
    ]
  },

  "plugins": [
    new webpack.NoErrorsPlugin(),
    new CleanPlugin(["build"]),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin("[name]-[contenthash].css"),
    new SriStatsPlugin({
      customStatsKey: "rails",
      write: true
    })
  ]
};

