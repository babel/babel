import { OptionValidator } from "@babel/helper-validator-option";
const v = new OptionValidator("@babel/preset-typescript");

export default function normalizeOptions(options = {}) {
  let {
    allowNamespaces = true,
    jsxPragma,
    onlyRemoveTypeImports,
    optimizeConstEnums,
  } = options;

  if (process.env.BABEL_8_BREAKING) {
    const TopLevelOptions = {
      allExtensions: "allExtensions",
      allowNamespaces: "allowNamespaces",
      isTSX: "isTSX",
      jsxPragma: "jsxPragma",
      jsxPragmaFrag: "jsxPragmaFrag",
      onlyRemoveTypeImports: "onlyRemoveTypeImports",
      optimizeConstEnums: "optimizeConstEnums",
    };
    v.validateTopLevelOptions(options, TopLevelOptions);
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
    optimizeConstEnums = v.validateBooleanOption(
      TopLevelOptions.optimizeConstEnums,
      options.optimizeConstEnums,
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
    allowNamespaces,
    isTSX,
    jsxPragma,
    jsxPragmaFrag,
    onlyRemoveTypeImports,
    optimizeConstEnums,
  };
}
