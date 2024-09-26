import type { ESLint, Rule } from "eslint";

type Rules =
  | "new-cap"
  | "no-invalid-this"
  | "no-undef"
  | "no-unused-expressions"
  | "object-curly-spacing"
  | "semi";

export declare const meta: ESLint.ObjectMetaProperties["meta"];
export declare const rules: Record<Rules, Rule.RuleModule>;
export declare const rulesConfig: Record<Rules, string>;
