import type { SeverityString } from "../types.ts";

export const name = "babel/eslint-plugin/all";
export const rules: Record<string, SeverityString> = {
  // ESLint core rules
  "new-cap": "off",
  "no-undef": "off",
  "no-unused-expressions": "off",

  // babel-eslint-plugin rules
  "babel/new-cap": "error",
  "babel/no-undef": "error",
  "babel/no-unused-expressions": "error",
};
