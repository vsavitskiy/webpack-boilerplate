/**
 * Created by vsavitskiy on 26.03.17.
 */

const path = require('path');

const env = process.env.NODE_ENV;
const rootAssetPath = path.resolve(__dirname, './assets');


function buildConfig(env) {
    return require('./webpack/' + env + '.js')(env, rootAssetPath)
}

module.exports = buildConfig(env);
