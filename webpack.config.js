var path = require('path')
var webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var babelPolyfill = require("babel-polyfill");
var isProduction = process.env.NODE_ENV === 'production';
var myfilename;
// /config/dev.env.js

// /config/prod.env.js
if (isProduction) {
    myfilename = '[name].[hash].js'
    
} else {
    myfilename = '[name].js'
    
}
module.exports = {
    entry: {
        build: [
            'babel-polyfill',
            './src/main.js',
        ],
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: myfilename
    },
    module: {
        rules: [{
                // this one extracts css files that imported to styles.css
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                // and this dude here extracts component's styles into styles.css
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        less: ExtractTextPlugin.extract({
                            loader: 'css-loader!less-loader?indentedSyntax',
                            fallbackLoader: 'vue-style-loader',
                        }),
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                exclude: /node_modules/,
                loader: 'file-loader?limit=1024&name=fonts/[name].[ext]'

            },
        ]
    },

    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new CopyWebpackPlugin([
            {
            from: 'src/assets/img',
            to: 'src/assets/img'
            },
         ]),
        new ExtractTextPlugin("styles.css"),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            jquery: "jquery/src/jquery",
            '~':path.resolve(__dirname, './src'),
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        port: 6040,
        // host : '192.168.88.55',

    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {

    module.exports.devtool = '#source-map'
        // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new CleanWebpackPlugin(['dist'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: 'index.html',
            inject: true,
            chunksSortMode: 'dependency'
        })
    ])
}