import normalizeESLintConfig = require("./configuration.cts");
import analyzeScope = require("./analyze-scope.cts");
import baseParse = require("./parse.cts");

// @ts-expect-error LocalClient only exists in the cjs build
import { LocalClient, WorkerClient } from "./client.cts";
const client = new (USE_ESM ? WorkerClient : LocalClient)();

export const meta = {
  name: PACKAGE_JSON.name,
  version: PACKAGE_JSON.version,
};

export function parse(code: string, options = {}) {
  return baseParse(code, normalizeESLintConfig(options), client);
}

export function parseForESLint(code: string, options = {}) {
  const normalizedOptions = normalizeESLintConfig(options);
  const ast = baseParse(code, normalizedOptions, client);
  const scopeManager = analyzeScope(ast, normalizedOptions, client);

  return { ast, scopeManager, visitorKeys: client.getVisitorKeys() };
}
