/**
 * Created by vsavitskiy on 26.03.17.
 */

// Depends
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackSvgStore = require('webpack-svgstore-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = function (rootAssetPath) {
    return {
        context: rootAssetPath,

        entry: {
            common: './js/index.js'
        },

        output: {
            path: path.resolve(__dirname, '../dist'),
            filename: 'js/[name].bundle.[chunkhash].js',
            publicPath: '/'
        },

        resolve: {
            modules: [rootAssetPath, 'node_modules'],
        },

        module: {
            rules: [
                {
                    test: /\.js?$/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }],
                    exclude: /(node_modules|vendors)/
                },
                {
                    test: /(pug|jade)$/,
                    use: [{
                        loader: 'pug-loader',
                        options: { pretty: true }
                    }]
                },
                {
                    test: /(css|scss)$/,
                    loader: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: function () {
                                        return [
                                            require('precss')(),
                                            require('postcss-cssnext')({browsers: ['last 5 versions', '> 5%']}),
                                            require('css-mqpacker')()
                                        ]
                                    }
                                }
                            }
                        ]
                    })
                },
                {
                    test: /\.(ttf|eot|woff|woff2)$/i,
                    loader: ['file?name=fonts/[name].[hash].[ext]']
                },
                {
                    test: /\.(png|ico|jpg|jpeg|gif|svg)$/i,
                    loader: ['file?name=images/[name].[hash].[ext]']
                }
            ]
        },

        plugins: [
            new WebpackSvgStore.Options({
                svgoOptions: {
                    plugins: [
                        {
                            removeTitle: true,
                            removeDimensions: true,
                            removeViewBox: true
                        }
                    ]
                }}),

            new ExtractTextPlugin({
                filename: 'css/styles.[chunkhash].css',
                allChunks: true
            }),

            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.join(rootAssetPath, '/templates/index.pug'),
                chunks: ['common']
            })
        ]
    }
};
