// A second optional argument can be given to further configure
// the parser process. These options are recognized:

export const defaultOptions: {
  sourceType: string,
  sourceFilename: any,
  allowReturnOutsideFunction: boolean,
  allowImportExportEverywhere: boolean,
  allowSuperOutsideMethod: boolean,
  plugins: Array<string>,
  strictMode: any
} = {
  // Source type ("script" or "module") for different semantics
  sourceType: "script",
  // Source filename.
  sourceFilename: undefined,
  // When enabled, a return at the top level is not considered an
  // error.
  allowReturnOutsideFunction: false,
  // When enabled, import/export statements are not constrained to
  // appearing at the top of the program.
  allowImportExportEverywhere: false,
  // TODO
  allowSuperOutsideMethod: false,
  // An array of plugins to enable
  plugins: [],
  // TODO
  strictMode: null,
};

// Interpret and default an options object

export function getOptions(opts?: Object): Object {
  const options = {};
  for (const key in defaultOptions) {
    options[key] = opts && key in opts ? opts[key] : defaultOptions[key];
  }
  return options;
}
