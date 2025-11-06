import type { ESLint, Rule } from "eslint";

type Rules = "report-error-message-format" | "require-default-import-fallback";

export declare const meta: ESLint.ObjectMetaProperties["meta"];
export declare const rules: Record<Rules, Rule.RuleModule>;
export declare const rulesConfig: Record<Rules, string>;
