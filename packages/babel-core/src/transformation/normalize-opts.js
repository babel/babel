// @flow

import type { ResolvedConfig } from "../config";

export default function normalizeOptions(config: ResolvedConfig): {} {
  const opts = config.options;

  const options = Object.assign({}, opts, {
    parserOpts: Object.assign(
      {
        sourceType: opts.sourceType,
        sourceFileName: opts.filename || "unknown",
        plugins: [],
      },
      opts.parserOpts,
    ),
    generatorOpts: Object.assign(
      {
        // General generator flags.
        filename: opts.filename || "unknown",
        auxiliaryCommentBefore: opts.auxiliaryCommentBefore,
        auxiliaryCommentAfter: opts.auxiliaryCommentAfter,
        retainLines: opts.retainLines,
        comments: opts.comments,
        compact: opts.compact,
        minified: opts.minified,
        concise: opts.concise,

        // Source-map generation flags.
        sourceMaps: opts.sourceMaps,
        sourceMapTarget: opts.sourceMapTarget || "unknown",
        sourceRoot: opts.sourceRoot,
        sourceFileName: opts.sourceFileName || "unknown",
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
