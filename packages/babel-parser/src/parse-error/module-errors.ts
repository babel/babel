// @flow

import { ParseErrorCodes, toParseErrorCredentials } from "../parse-error";

export default (_: typeof toParseErrorCredentials) => ({
  ImportMetaOutsideModule: _(
    `import.meta may appear only with 'sourceType: "module"'`,
    { code: ParseErrorCodes.SourceTypeModuleError },
  ),
  ImportOutsideModule: _(
    `'import' and 'export' may appear only with 'sourceType: "module"'`,
    { code: ParseErrorCodes.SourceTypeModuleError },
  ),
});
