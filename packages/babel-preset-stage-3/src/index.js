import syntaxDynamicImport from "@babel/plugin-syntax-dynamic-import";
import transformAsyncGeneratorFunctions from "@babel/plugin-transform-async-generator-functions";
import transformClassProperties from "@babel/plugin-transform-class-properties";
import transformObjectRestSpread from "@babel/plugin-transform-object-rest-spread";
import transformOptionalCatchBinding from "@babel/plugin-transform-optional-catch-binding";
import transformUnicodePropertyRegex from "@babel/plugin-transform-unicode-property-regex";

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
