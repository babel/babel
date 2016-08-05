var babelPresetEs2017 = require('../index.js');
babelPresetEs2017.plugins.unshift(
  require('babel-plugin-transform-es2015-modules-commonjs'),
  require('babel-plugin-transform-strict-mode')
);
require('babel-register')(babelPresetEs2017);
