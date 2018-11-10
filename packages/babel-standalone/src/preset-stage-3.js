// @flow
import * as babelPlugins from "./plugins";

export default (_: any, opts: Object) => {
  let loose = false;

  if (opts !== undefined) {
    if (opts.loose !== undefined) loose = opts.loose;
  }

  return {
    plugins: [
      babelPlugins.syntaxDynamicImport,
      babelPlugins.syntaxImportMeta,
      [babelPlugins.transformClassProperties, { loose }],
      babelPlugins.transformJsonStrings,
    ],
  };
};
