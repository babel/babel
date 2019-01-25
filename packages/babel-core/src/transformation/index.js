// @flow
import traverse from "@babel/traverse";
import type { SourceMap } from "convert-source-map";

import type { ResolvedConfig, PluginPasses } from "../config";

import PluginPass from "./plugin-pass";
import loadBlockHoistPlugin from "./block-hoist-plugin";
import normalizeOptions from "./normalize-opts";
import normalizeFile from "./normalize-file";

import generateCode from "./file/generate";
import type File from "./file/file";

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
  const file = normalizeFile(
    config.passes,
    normalizeOptions(config),
    code,
    ast,
  );

  transformFile(file, config.passes);

  const opts = file.opts;
  const { outputCode, outputMap } =
    opts.code !== false ? generateCode(config.passes, file) : {};

  return {
    metadata: file.metadata,
    options: opts,
    ast: opts.ast === true ? file.ast : null,
    code: outputCode === undefined ? null : outputCode,
    map: outputMap === undefined ? null : outputMap,
    sourceType: file.ast.program.sourceType,
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
      if (fn) {
        const result = fn.call(pass, file);

        if (isThenable(result)) {
          throw new Error(
            `You appear to be using an plugin with an async .pre, ` +
              `which your current version of Babel does not support.` +
              `If you're using a published plugin, you may need to upgrade ` +
              `your @babel/core version.`,
          );
        }
      }
    }

    // merge all plugin visitors into a single visitor
    const visitor = traverse.visitors.merge(
      visitors,
      passes,
      file.opts.wrapPluginVisitorMethod,
    );

    file.invalidCache();

    traverse(file.ast, visitor, file.scope);

    for (const [plugin, pass] of passPairs) {
      const fn = plugin.post;
      if (fn) {
        const result = fn.call(pass, file);

        if (isThenable(result)) {
          throw new Error(
            `You appear to be using an plugin with an async .post, ` +
              `which your current version of Babel does not support.` +
              `If you're using a published plugin, you may need to upgrade ` +
              `your @babel/core version.`,
          );
        }
      }
    }
  }
}

function isThenable(val: mixed): boolean {
  return (
    !!val &&
    (typeof val === "object" || typeof val === "function") &&
    typeof val.then === "function"
  );
}
