import { OptionValidator } from "@babel/helper-validator-option";
const v = new OptionValidator("@babel/preset-typescript");

export default function normalizeOptions(options) {
  const {
    allowDeclareFields,
    allowNamespaces,
    jsxPragma,
    onlyRemoveTypeImports,
  } = options;

  const jsxPragmaFrag = v.validateStringOption(
    "jsxPragmaFrag",
    options.jsxPragmaFrag,
    "React.Fragment",
  );

  const allExtensions = v.validateBooleanOption(
    "allExtensions",
    options.allExtensions,
    false,
  );

  const isTSX = v.validateBooleanOption("isTSX", options.isTSX, false);

  if (isTSX) {
    v.invariant(allExtensions, "isTSX:true requires allExtensions:true");
  }

  return {
    allExtensions,
    allowDeclareFields,
    allowNamespaces,
    isTSX,
    jsxPragma,
    jsxPragmaFrag,
    onlyRemoveTypeImports,
  };
}
