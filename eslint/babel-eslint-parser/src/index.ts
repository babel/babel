import normalizeESLintConfig from "./configuration.ts";
import analyzeScope from "./analyze-scope.ts";
import baseParse from "./parse.ts";

import { getVisitorKeys } from "./ast-info.ts";

export const meta = {
  name: PACKAGE_JSON.name,
  version: PACKAGE_JSON.version,
};

export function parse(code: string, options = {}) {
  return baseParse(code, normalizeESLintConfig(options));
}

export function parseForESLint(code: string, options = {}) {
  const normalizedOptions = normalizeESLintConfig(options);
  const ast = baseParse(code, normalizedOptions);
  const scopeManager = analyzeScope(ast, normalizedOptions);

  return { ast, scopeManager, visitorKeys: getVisitorKeys() };
}

export default {
  meta,
  parse,
  parseForESLint,
};
