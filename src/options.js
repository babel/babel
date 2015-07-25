// A second optional argument can be given to further configure
// the parser process. These options are recognized:

export const defaultOptions = {
  // Source type ("script" or "module") for different semantics
  sourceType: "script",
  // By default, reserved words are not enforced. Disable
  // `allowReserved` to enforce them. When this option has the
  // value "never", reserved words and keywords can also not be
  // used as property names.
  allowReserved: true,
  // When enabled, a return at the top level is not considered an
  // error.
  allowReturnOutsideFunction: false,
  // When enabled, import/export statements are not constrained to
  // appearing at the top of the program.
  allowImportExportEverywhere: false,
  plugins: {},
  // Babel-specific options
  features: {},
  strictMode: null
};

// Interpret and default an options object

export function getOptions(opts) {
  let options = {};
  for (let key in defaultOptions) {
    options[key] = opts && key in opts ? opts[key] : defaultOptions[key];
  }
  return options;
}
