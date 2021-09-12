module.exports = function eslintVersion() {
  const version =
    process.env.ESLINT_VERSION_FOR_BABEL ||
    require("eslint/package.json").version;
  return parseInt(version, 10);
};
