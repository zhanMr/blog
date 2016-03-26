var webpack = require('webpack');
module.exports = {
    devtool: "#inline-source-map",
    entry: "./ui/entry.js",
    output: {
        path: __dirname,
        filename: "./public/js/bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    }
};