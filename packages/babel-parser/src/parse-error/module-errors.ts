import { ParseErrorCode } from "../parse-error";

export default {
  ImportMetaOutsideModule: {
    message: `import.meta may appear only with 'sourceType: "module"'`,
    code: ParseErrorCode.SourceTypeModuleError,
  },
  ImportOutsideModule: {
    message: `'import' and 'export' may appear only with 'sourceType: "module"'`,
    code: ParseErrorCode.SourceTypeModuleError,
  },
};
