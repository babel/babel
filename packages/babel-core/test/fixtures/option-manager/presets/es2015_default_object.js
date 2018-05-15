// from code:
// export default {
//   plugins: [
//     require('../../../../../babel-plugin-syntax-decorators'),
//   ]
// };
'use strict';

exports.__esModule = true;
module.exports = function() {
  return {
    plugins: [
      [
        require('../../../../../babel-plugin-syntax-decorators'),
        { legacy: true }
      ],
    ]
  };
};
