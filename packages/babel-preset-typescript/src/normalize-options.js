import { OptionValidator } from "@babel/helper-validator-option";
const v = new OptionValidator("@babel/preset-typescript");

export default function normalizeOptions(options = {}) {
  let {
    allowDeclareFields,
    allowNamespaces,
    jsxPragma,
    onlyRemoveTypeImports,
  } = options;

  if (process.env.BABEL_8_BREAKING) {
    const TopLevelOptions = {
      allowDeclareFields: "allowDeclareFields",
      allExtensions: "allExtensions",
      allowNamespaces: "allowNamespaces",
      isTSX: "isTSX",
      jsxPragma: "jsxPragma",
      jsxPragmaFrag: "jsxPragmaFrag",
      onlyRemoveTypeImports: "onlyRemoveTypeImports",
    };
    v.validateTopLevelOptions(options, TopLevelOptions);
    allowDeclareFields = v.validateBooleanOption(
      TopLevelOptions.allowDeclareFields,
      options.allowDeclareFields,
      true,
    );
    allowNamespaces = v.validateBooleanOption(
      TopLevelOptions.allowNamespaces,
      options.allowNamespaces,
      true,
    );
    jsxPragma = v.validateStringOption(
      TopLevelOptions.jsxPragma,
      options.jsxPragma,
      "React",
    );
    onlyRemoveTypeImports = v.validateBooleanOption(
      TopLevelOptions.onlyRemoveTypeImports,
      options.onlyRemoveTypeImports,
      true,
    );
  }

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
