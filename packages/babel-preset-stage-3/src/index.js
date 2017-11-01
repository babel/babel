import syntaxDynamicImport from "@babel/plugin-syntax-dynamic-import";
import transformAsyncGeneratorFunctions from "@babel/plugin-proposal-async-generator-functions";
import transformClassProperties from "@babel/plugin-proposal-class-properties";
import transformObjectRestSpread from "@babel/plugin-proposal-object-rest-spread";
import transformOptionalCatchBinding from "@babel/plugin-proposal-optional-catch-binding";
import transformUnicodePropertyRegex from "@babel/plugin-proposal-unicode-property-regex";

export default function() {
  return {
    plugins: [
      syntaxDynamicImport,
      transformAsyncGeneratorFunctions,
      transformClassProperties,
      transformObjectRestSpread,
      transformOptionalCatchBinding,
      transformUnicodePropertyRegex,
    ],
  };
}
