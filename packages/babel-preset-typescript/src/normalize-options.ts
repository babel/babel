import { OptionValidator } from "@babel/helper-validator-option";
const v = new OptionValidator("@babel/preset-typescript");

export interface Options {
  ignoreExtensions?: boolean;
  allowDeclareFields?: boolean;
  allowNamespaces?: boolean;
  disallowAmbiguousJSXLike?: boolean;
  jsxPragma?: string;
  jsxPragmaFrag?: string;
  onlyRemoveTypeImports?: boolean;
  optimizeConstEnums?: boolean;

  // TODO: Remove in Babel 8
  allExtensions?: boolean;
  isTSX?: boolean;
}

export default function normalizeOptions(options: Options = {}) {
  let { allowNamespaces = true, jsxPragma, onlyRemoveTypeImports } = options;

  const TopLevelOptions = {
    ignoreExtensions: "ignoreExtensions",
    allowNamespaces: "allowNamespaces",
    disallowAmbiguousJSXLike: "disallowAmbiguousJSXLike",
    jsxPragma: "jsxPragma",
    jsxPragmaFrag: "jsxPragmaFrag",
    onlyRemoveTypeImports: "onlyRemoveTypeImports",
    optimizeConstEnums: "optimizeConstEnums",

    // TODO: Remove in Babel 8
    allExtensions: "allExtensions",
    isTSX: "isTSX",
  };

  if (process.env.BABEL_8_BREAKING) {
    v.invariant(
      !("allExtensions" in options) && !("isTSX" in options),
      "The .allExtensions and .isTSX options have been removed.\n" +
        "If you want to disable JSX detection based on file extensions, " +
        "you can set the .ignoreExtensions option to true.\n" +
        "If you want to force JSX parsing, you can enable the " +
        "@babel/plugin-syntax-jsx plugin.",
    );

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

  if (!process.env.BABEL_8_BREAKING) {
    // eslint-disable-next-line no-var
    var allExtensions = v.validateBooleanOption(
      TopLevelOptions.allExtensions,
      options.allExtensions,
      false,
    );

    // eslint-disable-next-line no-var
    var isTSX = v.validateBooleanOption(
      TopLevelOptions.isTSX,
      options.isTSX,
      false,
    );
    if (isTSX) {
      v.invariant(allExtensions, "isTSX:true requires allExtensions:true");
    }
  }

  const ignoreExtensions = v.validateBooleanOption(
    TopLevelOptions.ignoreExtensions,
    options.ignoreExtensions,
    false,
  );

  const disallowAmbiguousJSXLike = v.validateBooleanOption(
    TopLevelOptions.disallowAmbiguousJSXLike,
    options.disallowAmbiguousJSXLike,
    false,
  );
  if (disallowAmbiguousJSXLike) {
    if (process.env.BABEL_8_BREAKING) {
      v.invariant(
        ignoreExtensions,
        "disallowAmbiguousJSXLike:true requires ignoreExtensions:true",
      );
    } else {
      v.invariant(
        allExtensions,
        "disallowAmbiguousJSXLike:true requires allExtensions:true",
      );
    }
  }

  const optimizeConstEnums = v.validateBooleanOption(
    TopLevelOptions.optimizeConstEnums,
    options.optimizeConstEnums,
    false,
  );

  const normalized: Options = {
    ignoreExtensions,
    allowNamespaces,
    disallowAmbiguousJSXLike,
    jsxPragma,
    jsxPragmaFrag,
    onlyRemoveTypeImports,
    optimizeConstEnums,
  };
  if (!process.env.BABEL_8_BREAKING) {
    normalized.allExtensions = allExtensions;
    normalized.isTSX = isTSX;
  }
  return normalized;
}
