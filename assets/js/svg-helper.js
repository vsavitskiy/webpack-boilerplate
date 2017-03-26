/**
 * Created by vsavitskiy on 26.03.17.
 */

const __svg__ = { path: '../images/svg-sprite/**/*.svg', name: 'sprite.[hash].svg' };

require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);