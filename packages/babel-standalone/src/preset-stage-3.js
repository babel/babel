import syntaxDynamicImport from "@babel/plugin-syntax-dynamic-import";
import syntaxImportMeta from "@babel/plugin-syntax-import-meta";
import transformClassProperties from "@babel/plugin-proposal-class-properties";
import transformJsonStrings from "@babel/plugin-proposal-json-strings";
import transformPrivateMethods from "@babel/plugin-proposal-private-methods";

export default (_, opts) => {
  let loose = false;

  if (opts !== undefined) {
    if (opts.loose !== undefined) loose = opts.loose;
  }

  return {
    plugins: [
      syntaxDynamicImport,
      syntaxImportMeta,
      [transformClassProperties, { loose }],
      transformJsonStrings,
      [transformPrivateMethods, { loose }],
    ],
  };
};
