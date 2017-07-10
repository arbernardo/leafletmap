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
            },
            {
                test: /\.(jpe?g|png|svg|gif)$/,
                loader: "url-loader"
            },
            {
                test: /\.(json|txt)$/,
                loader: "url-loader"
            },
            // {
            //     test: /\.(csv|tsv|psv)$/,
            //     loader: "dsv-loader"
            // }
            {
                test: /\.csv$/,
                loader: "csv-loader",
                options: {
                    dynamicTyping: true,
                    header: true,
                    skipEmptyLines: true
                }
            }
        ]
    },

    devServer: {
        inline: true,
        port: 3000,
        disableHostCheck: true,
        host: "0.0.0.0"
    }
}