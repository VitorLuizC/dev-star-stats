"use strict";

const path = require("path");
const DotEnvPlugin = require('dotenv-webpack');

/**
 * @type {import('webpack').ConfigurationFactory}
 */
const configuration = mode => ({
  mode,
  target: 'node',
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  externals: /^[^\.]/,
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    libraryTarget: 'commonjs',
  },
  plugins: [
    new DotEnvPlugin({
      path: './.env',
      safe: true,
      expand: true,
    })
  ]
});

module.exports = configuration;
