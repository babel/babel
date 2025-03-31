import path from "node:path";
import type { ResolvedConfig } from "../config/index.ts";

export default function normalizeOptions(config: ResolvedConfig) {
  const {
    filename,
    cwd,
    filenameRelative = typeof filename === "string"
      ? path.relative(cwd, filename)
      : "unknown",
    sourceType = "module",
    inputSourceMap,
    sourceMaps = !!inputSourceMap,
    sourceRoot = process.env.BABEL_8_BREAKING
      ? undefined
      : config.options.moduleRoot,

    sourceFileName = path.basename(filenameRelative),

    comments = true,
    compact = "auto",
  } = config.options;

  const opts = config.options;

  const options = {
    ...opts,

    parserOpts: {
      sourceType:
        path.extname(filenameRelative) === ".mjs" ? "module" : sourceType,

      sourceFileName: filename,
      plugins: [],
      ...opts.parserOpts,
    },

    generatorOpts: {
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

      sourceRoot,
      sourceFileName,
      ...opts.generatorOpts,
    },
  };

  for (const plugins of config.passes) {
    for (const plugin of plugins) {
      if (plugin.manipulateOptions) {
        plugin.manipulateOptions(options, options.parserOpts);
      }
    }
  }

  return options;
}
