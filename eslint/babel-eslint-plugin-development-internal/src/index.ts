import type { ESLint, Rule } from "eslint";
import noExtraneousDependencies from "./rules/no-extraneous-dependencies.ts";
import reportErrorMessageFormat from "./rules/report-error-message-format.ts";

const meta: ESLint.Plugin["meta"] = {
  name: PACKAGE_JSON.name,
  version: PACKAGE_JSON.version,
};

type Rules = "no-extraneous-dependencies" | "report-error-message-format";

const rules: Record<Rules, Rule.RuleModule> = {
  "no-extraneous-dependencies": noExtraneousDependencies,
  "report-error-message-format": reportErrorMessageFormat,
};

export default { meta, rules } satisfies ESLint.Plugin;
