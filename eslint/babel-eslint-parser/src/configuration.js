import { loadPartialConfig } from "@babel/core";

export function normalizeESLintConfig(options) {
  const defaultOptions = {
    babelOptions: {},
    ecmaVersion: 2020,
    sourceType: "module",
    allowImportExportEverywhere: false,
  };

  return Object.assign(defaultOptions, options);
}

export function normalizeBabelParseConfig(options) {
  const parseOptions = {
    sourceType: options.sourceType,
    filename: options.filePath,
    parserOpts: {
      allowImportExportEverywhere: options.allowImportExportEverywhere,
      allowReturnOutsideFunction: true,
      allowSuperOutsideMethod: true,
      ranges: true,
      tokens: true,
      plugins: ["estree"],
    },
    caller: {
      name: "@babel/eslint-parser",
    },
    ...options.babelOptions,
  };

  if (options.requireConfigFile !== false) {
    const config = loadPartialConfig(parseOptions);

    if (config !== null) {
      if (!config.hasFilesystemConfig()) {
        throw new Error(
          `No Babel config file detected for ${config.options.filename}. Either disable config file checking with requireConfigFile: false, or configure Babel so that it can find the config files.`,
        );
      }

      return config.options;
    }
  }

  return parseOptions;
}
