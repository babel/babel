import type { ParseErrorTemplates } from "../parse-error.ts";

const code = "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED";

export default {
  ImportMetaOutsideModule: {
    message: `import.meta may appear only with 'sourceType: "module"'`,
    code,
  },
  ImportOutsideModule: {
    message: `'import' and 'export' may appear only with 'sourceType: "module"'`,
    code,
  },
} satisfies ParseErrorTemplates;
