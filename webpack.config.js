const path = require("path");
const HtmlBundlerPlugin = require("html-bundler-webpack-plugin");

module.exports = {
    entry: {
        math: "./src/modules/math.ts",
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
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
};
