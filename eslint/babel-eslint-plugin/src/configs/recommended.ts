import type { SeverityString } from "../types.ts";

export const name = "babel/eslint-plugin/recommended";
export const rules: Record<string, SeverityString> = {
  // ESLint core rules
  "no-empty": "off",

  // babel-eslint-plugin rules
  "babel/no-empty": "error",
};
