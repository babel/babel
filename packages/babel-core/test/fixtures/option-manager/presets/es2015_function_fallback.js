// from code:
// function preset() {
//   return {
//     plugins: [
//       require('../../../../../babel-plugin-syntax-decorators'),
//     ]
//   };
// }
//
// const oldConfig = preset();
//
// export default oldConfig;
//
// // However, for backward compatibility with babel-core < v6.13.x, we use the 'buildPreset'
// // property of the preset object for the preset creation function with the enumerability
// // caveat mentioned below.
// Object.defineProperty(oldConfig, "buildPreset", {
//   configurable: true,
//   writable: true,
//   // We make this non-enumerable so old versions of babel-core won't see it as an unknown property,
//   // while allowing new versions to see it as a preset builder function.
//   enumerable: false,
//   value: preset,
// });
//

"use strict";

exports.__esModule = true;
function preset() {
  return {
    plugins: [require('../../../../../babel-plugin-syntax-decorators')]
  };
}

var oldConfig = preset();

exports.default = oldConfig;

// However, for backward compatibility with babel-core < v6.13.x, we use the 'buildPreset'
// property of the preset object for the preset creation function with the enumerability
// caveat mentioned below.
Object.defineProperty(oldConfig, "buildPreset", {
  configurable: true,
  writable: true,
  // We make this non-enumerable so old versions of babel-core won't see it as an unknown property,
  // while allowing new versions to see it as a preset builder function.
  enumerable: false,
  value: preset
});
