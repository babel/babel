// @flow
import * as t from "@babel/types";
import traverse from "@babel/traverse";
import type { SourceMap } from "convert-source-map";

import type { ResolvedConfig, PluginPasses } from "../config";

import PluginPass from "./plugin-pass";
import loadBlockHoistPlugin from "./block-hoist-plugin";
import normalizeOptions from "./normalize-opts";
import normalizeFile from "./normalize-file";

import { UUID_prefix } from "../config/helpers/config-api";

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

  stripBabelMetadata(file.ast);
}

/**
 * Babel 7.x plugins may inject directives and labelled blocks that will be
 * entirely stripped out at the end of compilation.
 *
 * This is an experimental feature of Babel 7.x, so be aware that if you rely
 * on this it is not guaranteed to exist in future versions.
 */
function stripBabelMetadata(ast: BabelNodeFile): void {
  const toRemove = [];
  t.traverse(ast, (node: BabelNode, ancestors: t.TraversalAncestors): void => {
    // Allow plugins to inject directives to flag functions with metadata.
    // This could for instance be used by Babel's own helper functions so
    // that we know that a given function was injected by Babel.
    if (
      t.isDirective(node) &&
      t.isDirectiveLiteral(((node: any): BabelNodeDirective).value) &&
      ((node: any): BabelNodeDirective).value.value.indexOf(UUID_prefix) !== -1
    ) {
      toRemove.push(ancestors[ancestors.length - 1]);
    }

    // Allow plugins to inject blocks that contain actual real code. You could
    // for instance imagine a plugin injecting:
    //
    //   babel_prefix_this_binding: this
    //
    // which other plugins running on the code might detect during a rename
    //
    //   babel_prefix_this_binding: _this2
    //
    // allowing plugins that manipulate the AST to detect if the logical 'this'
    // within a given function has a different binding than you'd expect.
    if (
      t.isLabeledStatement(node) &&
      ((node: any): BabelNodeLabeledStatement).label.name.indexOf(
        UUID_prefix,
      ) === 0
    ) {
      toRemove.push(ancestors[ancestors.length - 1]);
    }
  });

  for (const ancestor of toRemove.reverse()) {
    if (typeof ancestor.index === "number") {
      (ancestor.node: any)[ancestor.key].splice(ancestor.index, 1);
    } else {
      (ancestor.node: any)[ancestor.key] = t.emptyStatement();
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
