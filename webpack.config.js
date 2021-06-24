const path = require('path');
const BundelAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: './js/src/index.tsx',
    output: {
        filename: "./js/index.js",
        path: path.resolve(__dirname)
    },
    watch: true,
    mode: "production",
    devtool: "source-map",
    resolve: {
        extensions: [".webpack.js", ".web.ts", ".ts", ".tsx", ".js", ".css"]
    },
    module: {
        // rules: [
        //     { 
        //         test: /\.m?js$/,
        //         use: {
        //             loader: 'babel-loader',
        //             options: {
        //                 presets: ['@babel/preset-env'],
        //                 plugins: ['@babel/plugin-proposal-class-properties']
        //             }
        //         }
        //     }
        // ]
        rules: [
            {
                test: /\.tsx?$/, loader: "ts-loader"
            },
            {
                test: /\.js$/, loader: "source-map-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }

}


    // plugins: [
    //     new BundelAnalyzerPlugin()
    // ]