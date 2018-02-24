// @flow

import path from "path";
import type { ResolvedConfig } from "../config";

export default function normalizeOptions(config: ResolvedConfig): {} {
  const {
    filename,
    filenameRelative = filename || "unknown",
    sourceType = "module",
    inputSourceMap,
    sourceMaps = !!inputSourceMap,

    moduleRoot,
    sourceRoot = moduleRoot,

    sourceFileName = filenameRelative,
    sourceMapTarget = filenameRelative,

    comments = true,
    compact = "auto",
  } = config.options;

  const opts = config.options;

  const options = Object.assign({}, opts, {
    parserOpts: Object.assign(
      {
        sourceType:
          path.extname(filenameRelative) === ".mjs" ? "module" : sourceType,
        sourceFileName: filename,
        plugins: [],
      },
      opts.parserOpts,
    ),
    generatorOpts: Object.assign(
      {
        // General generator flags.
        filename,
        auxiliaryCommentBefore: opts.auxiliaryCommentBefore,
        auxiliaryCommentAfter: opts.auxiliaryCommentAfter,
        retainLines: opts.retainLines,
        comments,
        shouldPrintComment: opts.shouldPrintComment,
        compact,
        minified: opts.minified,

        // Source-map generation flags.
        sourceMaps,
        sourceMapTarget,
        sourceRoot,
        sourceFileName,
      },
      opts.generatorOpts,
    ),
  });

  for (const plugins of config.passes) {
    for (const plugin of plugins) {
      if (plugin.manipulateOptions) {
        plugin.manipulateOptions(options, options.parserOpts);
      }
    }
  }

  return options;
}
