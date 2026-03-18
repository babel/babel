import type { PluginPasses } from "../../config/index.ts";
import convertSourceMap from "convert-source-map";
import type { GeneratorResult } from "@babel/generator";
import generate from "@babel/generator";

import type File from "./file.ts";

export default function generateCode(
  pluginPasses: PluginPasses,
  file: File,
): {
  outputCode: string;
  outputMap: GeneratorResult["map"] | null;
} {
  const { opts, ast, code, inputMap } = file;
  const generatorOpts = opts.generatorOpts!;

  generatorOpts.inputSourceMap = inputMap?.toObject();

  const results = [];
  for (const plugins of pluginPasses) {
    for (const plugin of plugins) {
      const { generatorOverride } = plugin;
      if (generatorOverride) {
        const result = generatorOverride(ast, generatorOpts, code, generate);

        if (result !== undefined) results.push(result);
      }
    }
  }

  let result;
  if (results.length === 0) {
    result = generate(ast, generatorOpts, code);
  } else if (results.length === 1) {
    result = results[0];

    // @ts-expect-error check if generatorOverride returned a promise
    if (typeof result.then === "function") {
      throw new Error(
        `You appear to be using an async codegen plugin, ` +
          `which your current version of Babel does not support. ` +
          `If you're using a published plugin, ` +
          `you may need to upgrade your @babel/core version.`,
      );
    }
  } else {
    throw new Error("More than one plugin attempted to override codegen.");
  }

  let { code: outputCode } = result;

  let outputMap: typeof result.map = { ...result.map! };

  if (opts.sourceMaps === "inline" || opts.sourceMaps === "both") {
    outputCode += "\n" + convertSourceMap.fromObject(outputMap).toComment();
  }

  if (opts.sourceMaps === "inline") {
    outputMap = null;
  }

  return { outputCode, outputMap };
}
