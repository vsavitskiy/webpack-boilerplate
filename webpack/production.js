/**
 * Created by vsavitskiy on 26.03.17.
 */

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./common');


module.exports = function(env, rootAssetPath) {
    return webpackMerge(commonConfig(rootAssetPath), {
        plugins: [
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    screw_ie8: true
                },
                comments: false
            })
        ]
    })
};
