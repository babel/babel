import { loadPartialConfig } from "@babel/core";

export function normalizeESLintConfig(options) {
  const defaultOptions = {
    babelOptions: {},
    ecmaVersion: 2020,
    sourceType: "module",
    allowImportExportEverywhere: false,
    requireConfigFile: true,
  };

  return Object.assign(defaultOptions, options);
}

export function normalizeBabelParseConfig(options) {
  const parseOptions = {
    sourceType: options.sourceType,
    filename: options.filePath,
    ...options.babelOptions,
    parserOpts: {
      allowImportExportEverywhere: options.allowImportExportEverywhere,
      allowReturnOutsideFunction: true,
      allowSuperOutsideMethod: true,
      ...options.babelOptions.parserOpts,
      plugins: ["estree", ...(options.babelOptions.parserOpts?.plugins ?? [])],
      ranges: true,
      tokens: true,
    },
    caller: {
      name: "@babel/eslint-parser",
      ...options.babelOptions.caller,
    },
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
