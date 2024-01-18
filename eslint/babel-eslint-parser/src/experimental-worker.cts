const [major, minor] = process.versions.node.split(".").map(Number);

if (major < 12 || (major === 12 && minor < 3)) {
  throw new Error(
    "@babel/eslint-parser/experimental-worker requires Node.js >= 12.3.0",
  );
}

import normalizeESLintConfig = require("./configuration.cts");
import analyzeScope = require("./analyze-scope.cts");
import baseParse = require("./parse.cts");

import { WorkerClient } from "./client.cts";

const client = new WorkerClient();

export const meta = {
  name: "@babel/eslint-parser/experimental-worker",
  version: PACKAGE_JSON.version,
};

export function parseForESLint(code: string, options = {}) {
  const normalizedOptions = normalizeESLintConfig(options);
  const ast = baseParse(code, normalizedOptions, client);
  const scopeManager = analyzeScope(ast, normalizedOptions, client);

  return { ast, scopeManager, visitorKeys: client.getVisitorKeys() };
}
