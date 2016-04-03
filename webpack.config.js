var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    devtool: "#inline-source-map",
    entry: {
        fore: "./ui/fore/entry.js",//前台脚本
        end: "./ui/end/entry.js"//后台脚本
    },
    output: {
        path: __dirname,
        filename: "./public/js/[name]_bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")}
        ]
    },
    plugins: [
        new ExtractTextPlugin("./public/css/blog.css")
    ]
};