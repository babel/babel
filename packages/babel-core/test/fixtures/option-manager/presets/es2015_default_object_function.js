// from code:
// export default {
//   buildPreset: function() {
//     return {
//       plugins: [require('../../../../../babel-plugin-syntax-decorators'),]
//     };
//   }
// }
'use strict';

exports.__esModule = true;
exports.default = {
  buildPreset: function buildPreset() {
    return {
      plugins: [require('../../../../../babel-plugin-syntax-decorators')]
    };
  }
};
