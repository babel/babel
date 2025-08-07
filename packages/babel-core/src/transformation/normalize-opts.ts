import path from "node:path";
import type { NormalizedOptions, ResolvedConfig } from "../config/index.ts";

export default function normalizeOptions(
  config: ResolvedConfig,
): NormalizedOptions {
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
      : // @ts-ignore(Babel 7 vs Babel 8) moduleRoot is a Babel 7 option
        config.options.moduleRoot,

    sourceFileName = path.basename(filenameRelative),

    comments = true,
    compact = "auto",
  } = config.options;

  const opts = config.options;

  const options: NormalizedOptions = {
    ...opts,

    parserOpts: {
      sourceType:
        path.extname(filenameRelative) === ".mjs" ? "module" : sourceType,

      // @ts-expect-error We should have passed `sourceFilename` here
      // pending https://github.com/babel/babel/issues/15917#issuecomment-2789278964
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
      // babel-generator does not differentiate between `true`, `"inline"` or `"both"`
      sourceMaps: !!sourceMaps,
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
