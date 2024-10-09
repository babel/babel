// TODO(Babel 8): Remove this file

if (!process.env.BABEL_8_BREAKING) {
  // We need to keep these plugins because they do not simply enable a
  // feature, but can affect the AST shape (.attributes vs .assertions).
  // TLA is only used for local development with ESM.
  const availablePlugins = {
    "syntax-import-assertions": () =>
      require("@babel/plugin-syntax-import-assertions"),
    "syntax-import-attributes": () =>
      require("@babel/plugin-syntax-import-attributes"),
  };

  module.exports = availablePlugins;
}
