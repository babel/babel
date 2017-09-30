// @flow

import type { ResolvedConfig } from "../config";

export default function normalizeOptions(config: ResolvedConfig): {} {
  const options = Object.assign({}, config.options, {
    parserOpts: Object.assign(
      {
        sourceType: config.options.sourceType,
        sourceFileName: config.options.filename,
        plugins: [],
      },
      config.options.parserOpts,
    ),
  });

  for (const pluginPairs of config.passes) {
    for (const [plugin] of pluginPairs) {
      if (plugin.manipulateOptions) {
        plugin.manipulateOptions(options, options.parserOpts);
      }
    }
  }

  return options;
}
