// TODO(Babel 8): Remove this file

if (!process.env.BABEL_8_BREAKING) {
  exports.getModuleName = () =>
    require("@babel/helper-module-transforms").getModuleName;
} else if (process.env.IS_PUBLISH) {
  throw new Error(
    "Internal Babel error: This file should only be loaded in Babel 7",
  );
}
