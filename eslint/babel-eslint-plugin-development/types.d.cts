import type { ESLint, Rule } from "eslint";

type Rules = "no-deprecated-clone" | "no-undefined-identifier" | "plugin-name";

export declare const meta: ESLint.ObjectMetaProperties["meta"];
export declare const rules: Record<Rules, Rule.RuleModule>;
export declare const rulesConfig: Record<Rules, string>;
