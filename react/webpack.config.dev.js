const path = require("path");
const webpack = require("webpack");

/** @type {import("webpack").Configuration} */
const config = {
  mode: "development",
  devtool: "eval-source-map",
  entry: [
    "webpack-hot-middleware/client?noInfo=true", // Only needed to enable hot module reloading
    path.resolve(__dirname, "src"),
  ],
  target: "web", // default
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
    filename: "bundle.js", // served in memory in dev mode
  },
  infrastructureLogging: {
    level: "none",
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  resolve: {
    extensions: [".js", ".json", ".wasm", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, "src"),
        use: [{ loader: "babel-loader" }, { loader: "ts-loader" }],
      },
    ],
  },
};

module.exports = config;
