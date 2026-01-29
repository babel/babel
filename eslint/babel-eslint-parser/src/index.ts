import normalizeESLintConfig from "./configuration.ts";
import analyzeScope from "./analyze-scope.ts";
import baseParse from "./parse.ts";

import { WorkerClient } from "./client.ts";
import { getVisitorKeys } from "./ast-info.ts";
const client = new WorkerClient();

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

  return { ast, scopeManager, visitorKeys: getVisitorKeys() };
}

export default {
  meta,
  parse,
  parseForESLint,
};
