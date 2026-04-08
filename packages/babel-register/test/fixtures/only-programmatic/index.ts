const register = require('../../..');

register( {
  only: ["./loaded.ts"],
  babelrc: false,
  configFile: false,
  extensions: [".ts"],
  presets: ["@babel/preset-typescript"],
} );

// handled by Babel
require("./loaded.ts");

// handled by node
require("./ignored/ignored-pass.ts");

// handled by node and should throw SyntaxError when loaded by node
require("./ignored/ignored-throw.ts");
