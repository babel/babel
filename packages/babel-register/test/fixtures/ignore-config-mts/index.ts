const register = require('../../..');

register( {
  babelrc: false,
  extensions: [".ts"],
} );

// handled by Babel
require("./loaded.ts");

// handled by node
require("./ignored/ignored-pass.ts");

// handled by node and should throw SyntaxError when loaded by node
require("./ignored/ignored-throw.ts");
