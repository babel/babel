import { OptionValidator } from "@babel/helper-validator-option";
const v = new OptionValidator("@babel/preset-typescript");

export interface Options {
  allExtensions?: boolean;
  allowDeclareFields?: boolean;
  allowNamespaces?: boolean;
  disallowAmbiguousJSXLike?: boolean;
  isTSX?: boolean;
  jsxPragma?: string;
  jsxPragmaFrag?: string;
  onlyRemoveTypeImports?: boolean;
  optimizeConstEnums?: boolean;
}

export default function normalizeOptions(options: Options = {}) {
  let { allowNamespaces = true, jsxPragma, onlyRemoveTypeImports } = options;

  const TopLevelOptions = {
    allExtensions: "allExtensions",
    allowNamespaces: "allowNamespaces",
    disallowAmbiguousJSXLike: "disallowAmbiguousJSXLike",
    isTSX: "isTSX",
    jsxPragma: "jsxPragma",
    jsxPragmaFrag: "jsxPragmaFrag",
    onlyRemoveTypeImports: "onlyRemoveTypeImports",
    optimizeConstEnums: "optimizeConstEnums",
  };

  if (process.env.BABEL_8_BREAKING) {
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
  }

  const jsxPragmaFrag = v.validateStringOption(
    TopLevelOptions.jsxPragmaFrag,
    options.jsxPragmaFrag,
    "React.Fragment",
  );

  const allExtensions = v.validateBooleanOption(
    TopLevelOptions.allExtensions,
    options.allExtensions,
    false,
  );

  const isTSX = v.validateBooleanOption(
    TopLevelOptions.isTSX,
    options.isTSX,
    false,
  );
  if (isTSX) {
    v.invariant(allExtensions, "isTSX:true requires allExtensions:true");
  }

  const disallowAmbiguousJSXLike = v.validateBooleanOption(
    TopLevelOptions.disallowAmbiguousJSXLike,
    options.disallowAmbiguousJSXLike,
    false,
  );
  if (disallowAmbiguousJSXLike) {
    v.invariant(
      allExtensions,
      "disallowAmbiguousJSXLike:true requires allExtensions:true",
    );
  }

  const optimizeConstEnums = v.validateBooleanOption(
    TopLevelOptions.optimizeConstEnums,
    options.optimizeConstEnums,
    false,
  );

  return {
    allExtensions,
    allowNamespaces,
    disallowAmbiguousJSXLike,
    isTSX,
    jsxPragma,
    jsxPragmaFrag,
    onlyRemoveTypeImports,
    optimizeConstEnums,
  };
}
