import { declare } from "@babel/helper-plugin-utils";
import syntaxDynamicImport from "@babel/plugin-syntax-dynamic-import";
import syntaxImportMeta from "@babel/plugin-syntax-import-meta";
import transformAsyncGeneratorFunctions from "@babel/plugin-proposal-async-generator-functions";
import transformClassProperties from "@babel/plugin-proposal-class-properties";
import transformObjectRestSpread from "@babel/plugin-proposal-object-rest-spread";
import transformOptionalCatchBinding from "@babel/plugin-proposal-optional-catch-binding";
import transformUnicodePropertyRegex from "@babel/plugin-proposal-unicode-property-regex";

export default declare((api, opts) => {
  api.assertVersion(7);

  let loose = false;
  let useBuiltIns = false;

  if (opts !== undefined) {
    if (opts.loose !== undefined) loose = opts.loose;
    if (opts.useBuiltIns !== undefined) useBuiltIns = opts.useBuiltIns;
  }

  if (typeof loose !== "boolean") {
    throw new Error("@babel/preset-stage-3 'loose' option must be a boolean.");
  }
  if (typeof useBuiltIns !== "boolean") {
    throw new Error(
      "@babel/preset-stage-3 'useBuiltIns' option must be a boolean.",
    );
  }

  return {
    plugins: [
      syntaxDynamicImport,
      syntaxImportMeta,
      transformAsyncGeneratorFunctions,
      [transformClassProperties, { loose }],
      [transformObjectRestSpread, { useBuiltIns }],
      transformOptionalCatchBinding,
      transformUnicodePropertyRegex,
    ],
  };
});
