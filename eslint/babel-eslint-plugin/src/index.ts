import type { ESLint, Rule } from "eslint";
import newCap from "./rules/new-cap.ts";
import noEmpty from "./rules/no-empty.ts";
import noUndef from "./rules/no-undef.ts";
import noUnusedExpressions from "./rules/no-unused-expressions.ts";
import * as recommendedConfig from "./configs/recommended.ts";
import * as allConfig from "./configs/all.ts";

const meta: ESLint.Plugin["meta"] = {
  name: PACKAGE_JSON.name,
  version: PACKAGE_JSON.version,
};

type Rules = "new-cap" | "no-undef" | "no-unused-expressions";

const rules: Record<Rules, Rule.RuleModule> = {
  "new-cap": newCap,
  "no-empty": noEmpty,
  "no-undef": noUndef,
  "no-unused-expressions": noUnusedExpressions,
};

const rulesConfig = {
  "new-cap": "off",
  "no-empty": "off",
  "no-undef": "off",
  "no-unused-expressions": "off",
};

const configs = {
  recommended: recommendedConfig,
  all: allConfig,
};

// @ts-expect-error TODO(Babel 9): Remove rulesConfig in favor of configs
export default { configs, meta, rules, rulesConfig } satisfies ESLint.Plugin;
