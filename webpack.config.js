// const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// module.exports = {
//     entry: './js/src/index.tsx',
//     output: {
//         filename: "./js/index.js",
//         path: path.resolve(__dirname)
//     },
//     watch: true,
//     mode: "production",
//     devtool: "source-map",
//     resolve: {
//         extensions: [".webpack.js", ".web.ts", ".ts", ".tsx", ".js", ".css"]
//     },
//     module: {
//         // rules: [
//         //     { 
//         //         test: /\.m?js$/,
//         //         use: {
//         //             loader: 'babel-loader',
//         //             options: {
//         //                 presets: ['@babel/preset-env'],
//         //                 plugins: ['@babel/plugin-proposal-class-properties']
//         //             }
//         //         }
//         //     }
//         // ]
//         rules: [
//             {
//                 test: /\.tsx?$/, loader: "ts-loader"
//             },
//             {
//                 test: /\.js$/, loader: "source-map-loader",
//             },
//             {
//                 test: /\.css$/,
//                 use: ["style-loader", "css-loader"]
//             }
//         ]
//     },
//     plugins: [
//         new BundleAnalyzerPlugin()
//     ]
// }


// plugins: [
//     new BundelAnalyzerPlugin()
// ]


const path = require('path');

const Html = require('html-webpack-plugin');

const resolvePath = x => path.resolve(__dirname, ...x.split(path.sep));
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    entry: {
        main: resolvePath('js/src/index.tsx'),
    },

    output: {
        path: resolvePath('app'),
        uniqueName: 'main',
        publicPath: "/app/",
        clean: true
    },

    mode: 'development',

    watch: true,

    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                defaultVendors: false
            }
        }
    },

    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
        ],
    },
    plugins: [
        new Html({
            template: resolvePath('js/src/index.ejs'),
        }),
        new BundleAnalyzerPlugin(),
        // new CompressionPlugin()
    ],
};