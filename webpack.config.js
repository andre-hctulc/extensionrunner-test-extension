const path = require("path");
const HtmlBundlerPlugin = require("html-bundler-webpack-plugin");

module.exports = {
    entry: {
        math: "./src/modules/math.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlBundlerPlugin({
            entry: "src/frames/",
            outputPath: "frames/",
            js: { inline: true },
        }),
    ],
    module: {
        rules: [],
    },
};
