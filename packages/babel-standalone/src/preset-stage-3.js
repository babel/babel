// @flow
import * as babelPlugins from "./generated/plugins";

export default (_: any, opts: Object) => {
  let loose = false;

  if (opts !== undefined) {
    if (opts.loose !== undefined) loose = opts.loose;
  }

  return {
    plugins: [
      babelPlugins.syntaxDynamicImport,
      babelPlugins.syntaxImportMeta,
      [babelPlugins.proposalOptionalChaining, { loose }],
      [babelPlugins.proposalNullishCoalescingOperator, { loose }],
      [babelPlugins.proposalClassProperties, { loose }],
      babelPlugins.proposalJsonStrings,
      [babelPlugins.proposalPrivateMethods, { loose }],
    ],
  };
};
