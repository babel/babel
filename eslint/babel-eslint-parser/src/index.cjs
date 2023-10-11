const { normalizeESLintConfig } = require("./configuration.cjs");
const analyzeScope = require("./analyze-scope.cjs");
const baseParse = require("./parse.cjs");

const { LocalClient, WorkerClient } = require("./client.cjs");
const client = new (USE_ESM ? WorkerClient : LocalClient)();

exports.meta = {
  name: PACKAGE_JSON.name,
  version: PACKAGE_JSON.version,
};

exports.parse = function (code, options = {}) {
  return baseParse(code, normalizeESLintConfig(options), client);
};

exports.parseForESLint = function (code, options = {}) {
  const normalizedOptions = normalizeESLintConfig(options);
  const ast = baseParse(code, normalizedOptions, client);
  const scopeManager = analyzeScope(ast, normalizedOptions, client);

  return { ast, scopeManager, visitorKeys: client.getVisitorKeys() };
};
