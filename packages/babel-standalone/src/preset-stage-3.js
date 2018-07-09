import syntaxDynamicImport from "@babel/plugin-syntax-dynamic-import";
import syntaxImportMeta from "@babel/plugin-syntax-import-meta";
import transformAsyncGeneratorFunctions from "@babel/plugin-proposal-async-generator-functions";
import transformClassProperties from "@babel/plugin-proposal-class-properties";
import transformJsonStrings from "@babel/plugin-proposal-json-strings";
import transformObjectRestSpread from "@babel/plugin-proposal-object-rest-spread";
import transformOptionalCatchBinding from "@babel/plugin-proposal-optional-catch-binding";
import transformUnicodePropertyRegex from "@babel/plugin-proposal-unicode-property-regex";

export default (_, opts) => {
  let loose = false;
  let useBuiltIns = false;

  if (opts !== undefined) {
    if (opts.loose !== undefined) loose = opts.loose;
    if (opts.useBuiltIns !== undefined) useBuiltIns = opts.useBuiltIns;
  }

  return {
    plugins: [
      syntaxDynamicImport,
      syntaxImportMeta,
      transformAsyncGeneratorFunctions,
      [transformClassProperties, { loose }],
      transformJsonStrings,
      [transformObjectRestSpread, { loose, useBuiltIns }],
      transformOptionalCatchBinding,
      transformUnicodePropertyRegex,
    ],
  };
};
