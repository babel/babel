// @flow
import traverse from "@babel/traverse";
import type { SourceMap } from "convert-source-map";

import type { ResolvedConfig, PluginPasses } from "../config";

import PluginPass from "./plugin-pass";
import loadBlockHoistPlugin from "./block-hoist-plugin";
import normalizeOptions from "./normalize-opts";
import normalizeFile from "./normalize-file";

import generateCode from "./file/generate";
import File from "./file/file";

export type FileResultCallback = {
  (Error, null): any,
  (null, FileResult | null): any,
};

export type FileResult = {
  metadata: {},
  options: {},
  ast: {} | null,
  code: string | null,
  map: SourceMap | null,
};

export function runAsync(
  config: ResolvedConfig,
  code: string,
  ast: ?(BabelNodeFile | BabelNodeProgram),
  callback: Function,
) {
  let result;
  try {
    result = runSync(config, code, ast);
  } catch (err) {
    return callback(err);
  }

  // We don't actually care about calling this synchronously here because it is
  // already running within a .nextTick handler from the transform calls above.
  return callback(null, result);
}

export function runSync(
  config: ResolvedConfig,
  code: string,
  ast: ?(BabelNodeFile | BabelNodeProgram),
): FileResult {
  const options = normalizeOptions(config);
  const input = normalizeFile(options, code, ast);

  const file = new File(options, input);

  transformFile(file, config.passes);

  const { outputCode, outputMap } = options.code ? generateCode(file) : {};

  return {
    metadata: file.metadata,
    options: options,
    ast: options.ast ? file.ast : null,
    code: outputCode === undefined ? null : outputCode,
    map: outputMap === undefined ? null : outputMap,
  };
}

function transformFile(file: File, pluginPasses: PluginPasses): void {
  for (const pluginPairs of pluginPasses) {
    const passPairs = [];
    const passes = [];
    const visitors = [];

    for (const plugin of pluginPairs.concat([loadBlockHoistPlugin()])) {
      const pass = new PluginPass(file, plugin.key, plugin.options);

      passPairs.push([plugin, pass]);
      passes.push(pass);
      visitors.push(plugin.visitor);
    }

    for (const [plugin, pass] of passPairs) {
      const fn = plugin.pre;
      if (fn) fn.call(pass, file);
    }

    // merge all plugin visitors into a single visitor
    const visitor = traverse.visitors.merge(
      visitors,
      passes,
      file.opts.wrapPluginVisitorMethod,
    );
    traverse(file.ast, visitor, file.scope);

    for (const [plugin, pass] of passPairs) {
      const fn = plugin.post;
      if (fn) fn.call(pass, file);
    }
  }
}
