const register = require('../../..').default;

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
try {
  require("./ignored/ignored-throw.ts");
} catch (e) {
  if (e instanceof SyntaxError && e.message.includes("TypeScript enum is not supported in strip-only mode")) {
    process.stdout.write("SyntaxError is thrown as expected from ignored-throw.ts");
  } else {
    throw e;
  }
}
