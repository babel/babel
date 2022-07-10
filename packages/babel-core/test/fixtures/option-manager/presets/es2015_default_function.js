// from code:
// export default function() {
//   return {
//     plugins: ["__dirname + "/../../../../../babel-plugin-syntax-decorators/lib/index.js"]
//   };
// }
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});

exports.default = function () {
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
