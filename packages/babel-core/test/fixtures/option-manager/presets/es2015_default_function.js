// from code:
// export default function() {
//   return {
//     plugins: [require('../../../../../babel-plugin-syntax-decorators'),]
//   };
// }
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    plugins: [
      [
        require('../../../../../babel-plugin-syntax-decorators'),
        { legacy: true }
      ],
    ]
  };
};
