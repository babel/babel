import type { ESLint, Rule } from "eslint";
import noDeprecatedClone from "./rules/no-deprecated-clone.ts";
import noUndefinedIdentifier from "./rules/no-undefined-identifier.ts";
import pluginName from "./rules/plugin-name.ts";

const meta: ESLint.Plugin["meta"] = {
  name: PACKAGE_JSON.name,
  version: PACKAGE_JSON.version,
};

type Rules = "no-deprecated-clone" | "no-undefined-identifier" | "plugin-name";

const rules: Record<Rules, Rule.RuleModule> = {
  "no-deprecated-clone": noDeprecatedClone,
  "no-undefined-identifier": noUndefinedIdentifier,
  "plugin-name": pluginName,
};

export default { meta, rules } satisfies ESLint.Plugin;
