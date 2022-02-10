import { ErrorCodes, toParseErrorClasses } from "../parse-error";

export default toParseErrorClasses(_ => {
  ImportMetaOutsideModule: _(`import.meta may appear only with 'sourceType: "module"'`),
  ImportOutsideModule: _(`'import' and 'export' may appear only with 'sourceType: "module"'`),
  { code: ErrorCodes.SourceTypeModuleError }
});
