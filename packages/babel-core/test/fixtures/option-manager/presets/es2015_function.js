// from code:
// export const buildPreset = function() {
//   return {
//     plugins: [require('../../../../../babel-plugin-syntax-decorators'),]
//   };
// }
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var buildPreset = exports.buildPreset = function buildPreset() {
  return {
    plugins: [require('../../../../../babel-plugin-syntax-decorators')]
  };
};
