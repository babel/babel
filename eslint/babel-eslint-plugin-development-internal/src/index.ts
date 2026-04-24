import type { ESLint } from "eslint";
import reportErrorMessageFormat from "./rules/report-error-message-format.ts";

const meta = {
  name: PACKAGE_JSON.name,
  version: PACKAGE_JSON.version,
};

const rules = {
  "report-error-message-format": reportErrorMessageFormat,
};

export default { meta, rules } satisfies ESLint.Plugin;
