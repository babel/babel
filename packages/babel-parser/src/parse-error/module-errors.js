// @flow

import { ParseErrorCodes, toParseErrorClass } from "../parse-error";

export default (_: typeof toParseErrorClass) => ({
  ImportMetaOutsideModule: _(
    `import.meta may appear only with 'sourceType: "module"'`,
    { code: ParseErrorCodes.SourceTypeModuleError },
  ),
  ImportOutsideModule: _(
    `'import' and 'export' may appear only with 'sourceType: "module"'`,
    { code: ParseErrorCodes.SourceTypeModuleError },
  ),
});
