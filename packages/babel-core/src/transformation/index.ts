import traverse from "@babel/traverse";
import type * as t from "@babel/types";
import type { GeneratorResult } from "@babel/generator";

import type { Handler } from "gensync";

import type { ResolvedConfig, Plugin, PluginPasses } from "../config/index.ts";

import PluginPass from "./plugin-pass.ts";
import loadBlockHoistPlugin from "./block-hoist-plugin.ts";
import normalizeOptions from "./normalize-opts.ts";
import normalizeFile from "./normalize-file.ts";

import generateCode from "./file/generate.ts";
import type File from "./file/file.ts";

import { flattenToSet } from "../config/helpers/deep-array.ts";
import { isAsync, maybeAsync } from "../gensync-utils/async.ts";

export type FileResultCallback = {
  (err: Error, file: null): void;
  (err: null, file: FileResult | null): void;
};

export type FileResult = {
  metadata: { [key: string]: any };
  options: { [key: string]: any };
  ast: t.File | null;
  code: string | null;
  map: GeneratorResult["map"] | null;
  sourceType: "script" | "module";
  externalDependencies: Set<string>;
};

export function* run(
  config: ResolvedConfig,
  code: string,
  ast?: t.File | t.Program | null,
): Handler<FileResult> {
  const file = yield* normalizeFile(
    config.passes,
    normalizeOptions(config),
    code,
    ast,
  );

  const opts = file.opts;
  try {
    yield* transformFile(file, config.passes);
  } catch (e) {
    e.message = `${opts.filename ?? "unknown file"}: ${e.message}`;
    if (!e.code) {
      e.code = "BABEL_TRANSFORM_ERROR";
    }
    throw e;
  }

  let outputCode, outputMap;
  try {
    if (opts.code !== false) {
      ({ outputCode, outputMap } = generateCode(config.passes, file));
    }
  } catch (e) {
    e.message = `${opts.filename ?? "unknown file"}: ${e.message}`;
    if (!e.code) {
      e.code = "BABEL_GENERATE_ERROR";
    }
    throw e;
  }

  return {
    metadata: file.metadata,
    options: opts,
    ast: opts.ast === true ? file.ast : null,
    code: outputCode === undefined ? null : outputCode,
    map: outputMap === undefined ? null : outputMap,
    sourceType: file.ast.program.sourceType,
    externalDependencies: flattenToSet(config.externalDependencies),
  };
}

function* transformFile(file: File, pluginPasses: PluginPasses): Handler<void> {
  const async = yield* isAsync();

  for (const pluginPairs of pluginPasses) {
    const passPairs: [Plugin, PluginPass][] = [];
    const passes = [];
    const visitors = [];

    for (const plugin of pluginPairs.concat([loadBlockHoistPlugin()])) {
      const pass = new PluginPass(file, plugin.key, plugin.options, async);

      passPairs.push([plugin, pass]);
      passes.push(pass);
      visitors.push(plugin.visitor);
    }

    for (const [plugin, pass] of passPairs) {
      if (plugin.pre) {
        const fn = maybeAsync(
          plugin.pre,
          `You appear to be using an async plugin/preset, but Babel has been called synchronously`,
        );

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        yield* fn.call(pass, file);
      }
    }

    // merge all plugin visitors into a single visitor
    const visitor = traverse.visitors.merge(
      visitors,
      passes,
      file.opts.wrapPluginVisitorMethod,
    );
    if (process.env.BABEL_8_BREAKING) {
      traverse(file.ast.program, visitor, file.scope, null, file.path, true);
    } else {
      traverse(file.ast, visitor, file.scope);
    }

    for (const [plugin, pass] of passPairs) {
      if (plugin.post) {
        const fn = maybeAsync(
          plugin.post,
          `You appear to be using an async plugin/preset, but Babel has been called synchronously`,
        );

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        yield* fn.call(pass, file);
      }
    }
  }
}
