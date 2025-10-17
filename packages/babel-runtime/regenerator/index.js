// TODO(Babel 8): Remove this file.
if (require("../package.json").version.startsWith("8.")) {
  throw new Error(
    "The package '@babel/runtime/regenerator' has been removed in Babel 8. Babel" +
      " now automatically injects the regenerator runtime like any other runtime helper."
  );
}

var runtime = require("../helpers/regeneratorRuntime")();
module.exports = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
