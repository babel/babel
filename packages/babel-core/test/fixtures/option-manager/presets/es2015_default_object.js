// from code:
// export default {
//   plugins: [__dirname + "/../../../../../babel-plugin-syntax-decorators/lib/index.js"]
// };
"use strict";

exports.__esModule = true;
module.exports = function () {
  return {
    plugins: [
      [
        __dirname +
          "/../../../../../babel-plugin-syntax-decorators/lib/index.js",
        { version: "legacy" },
      ],
    ],
  };
};
