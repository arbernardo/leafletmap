/**
 * Created by Ace on 6/11/2017.
 */
module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ["style-loader", "css-loader"]
            }
        ]
    }
}