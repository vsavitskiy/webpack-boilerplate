/**
 * Created by vsavitskiy on 26.03.17.
 */

const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./common');


module.exports = function(env, rootAssetPath) {
    return webpackMerge(commonConfig(rootAssetPath), {
        devServer: {
            contentBase: rootAssetPath
        }
    })
};
