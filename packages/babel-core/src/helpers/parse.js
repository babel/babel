import * as babylon from "babylon";

/**
 * Parse `code` with normalized options, collecting tokens and comments.
 */

export default function (code, opts = {}) {
  var parseOpts = {
    allowImportExportEverywhere: opts.looseModules,
    allowReturnOutsideFunction:  opts.looseModules,
    strictMode:    opts.strictMode,
    sourceType:    opts.sourceType,
    features:      opts.features || {},
    plugins:       opts.plugins || {}
  };

  if (opts.nonStandard) {
    parseOpts.plugins.jsx = true;
    parseOpts.plugins.flow = true;
  }

  return babylon.parse(code, parseOpts);
}
