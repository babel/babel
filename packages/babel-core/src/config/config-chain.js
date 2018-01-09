// @flow

import path from "path";
import micromatch from "micromatch";
import buildDebug from "debug";
import {
  validate,
  type ValidatedOptions,
  type IgnoreList,
  type ConfigApplicableTest,
} from "./validation/options";

const debug = buildDebug("babel:config:config-chain");

import {
  findBabelrc,
  findBabelignore,
  loadConfig,
  type ConfigFile,
} from "./files";

import { makeWeakCache, makeStrongCache } from "./caching";

import {
  createCachedDescriptors,
  createUncachedDescriptors,
  type UnloadedDescriptor,
  type OptionsAndDescriptors,
  type ValidatedFile,
} from "./config-descriptors";

export type ConfigChain = {
  plugins: Array<UnloadedDescriptor>,
  presets: Array<UnloadedDescriptor>,
  options: Array<ValidatedOptions>,
};

export type PresetInstance = {
  options: ValidatedOptions,
  alias: string,
  dirname: string,
};

export type ConfigContext = {
  filename: string | null,
  cwd: string,
  envName: string,
};

type ConfigContextNamed = {
  ...ConfigContext,
  filename: string,
};

/**
 * Build a config chain for a given preset.
 */
export const buildPresetChain: (
  arg: PresetInstance,
  context: *,
) => * = makeChainWalker({
  init: arg => arg,
  root: preset => loadPresetDescriptors(preset),
  env: (preset, envName) => loadPresetEnvDescriptors(preset)(envName),
  overrides: (preset, index) => loadPresetOverridesDescriptors(preset)(index),
  overridesEnv: (preset, index, envName) =>
    loadPresetOverridesEnvDescriptors(preset)(index)(envName),
});
const loadPresetDescriptors = makeWeakCache((preset: PresetInstance) =>
  buildRootDescriptors(preset, preset.alias, createUncachedDescriptors),
);
const loadPresetEnvDescriptors = makeWeakCache((preset: PresetInstance) =>
  makeStrongCache((envName: string) =>
    buildEnvDescriptors(
      preset,
      preset.alias,
      createUncachedDescriptors,
      envName,
    ),
  ),
);
const loadPresetOverridesDescriptors = makeWeakCache((preset: PresetInstance) =>
  makeStrongCache((index: number) =>
    buildOverrideDescriptors(
      preset,
      preset.alias,
      createUncachedDescriptors,
      index,
    ),
  ),
);
const loadPresetOverridesEnvDescriptors = makeWeakCache(
  (preset: PresetInstance) =>
    makeStrongCache((index: number) =>
      makeStrongCache((envName: string) =>
        buildOverrideEnvDescriptors(
          preset,
          preset.alias,
          createUncachedDescriptors,
          index,
          envName,
        ),
      ),
    ),
);

/**
 * Build a config chain for Babel's full root configuration.
 */
export function buildRootChain(
  cwd: string,
  opts: ValidatedOptions,
  context: ConfigContext,
): ConfigChain | null {
  const programmaticChain = loadProgrammaticChain(
    {
      options: opts,
      dirname: context.cwd,
    },
    context,
  );
  if (!programmaticChain) return null;

  const fileChain = emptyChain();
  // resolve all .babelrc files
  if (opts.babelrc !== false && context.filename !== null) {
    const filename = context.filename;
    const babelignoreFile = findBabelignore(filename);
    if (
      babelignoreFile &&
      shouldIgnore(
        context,
        babelignoreFile.ignore,
        null,
        babelignoreFile.dirname,
      )
    ) {
      return null;
    }

    const babelrcFile = findBabelrc(filename, context.envName);
    if (babelrcFile) {
      const result = loadFileChain(babelrcFile, context);
      if (!result) return null;

      mergeChain(fileChain, result);
    }
  }

  // Insert file chain in front so programmatic options have priority
  // over configuration file chain items.
  const chain = mergeChain(
    mergeChain(emptyChain(), fileChain),
    programmaticChain,
  );

  return {
    plugins: dedupDescriptors(chain.plugins),
    presets: dedupDescriptors(chain.presets),
    options: chain.options.map(o => normalizeOptions(o)),
  };
}

/**
 * Build a config chain for just the programmatic options passed into Babel.
 */
const loadProgrammaticChain = makeChainWalker({
  init: arg => arg,
  root: input => buildRootDescriptors(input, "base", createCachedDescriptors),
  env: (input, envName) =>
    buildEnvDescriptors(input, "base", createCachedDescriptors, envName),
  overrides: (input, index) =>
    buildOverrideDescriptors(input, "base", createCachedDescriptors, index),
  overridesEnv: (input, index, envName) =>
    buildOverrideEnvDescriptors(
      input,
      "base",
      createCachedDescriptors,
      index,
      envName,
    ),
});

/**
 * Build a config chain for a given file.
 */
const loadFileChain = makeChainWalker({
  init: input => validateFile(input),
  root: file => loadFileDescriptors(file),
  env: (file, envName) => loadFileEnvDescriptors(file)(envName),
  overrides: (file, index) => loadFileOverridesDescriptors(file)(index),
  overridesEnv: (file, index, envName) =>
    loadFileOverridesEnvDescriptors(file)(index)(envName),
});
const validateFile = makeWeakCache((file: ConfigFile): ValidatedFile => ({
  filepath: file.filepath,
  dirname: file.dirname,
  options: validate("file", file.options),
}));
const loadFileDescriptors = makeWeakCache((file: ValidatedFile) =>
  buildRootDescriptors(file, file.filepath, createUncachedDescriptors),
);
const loadFileEnvDescriptors = makeWeakCache((file: ValidatedFile) =>
  makeStrongCache((envName: string) =>
    buildEnvDescriptors(
      file,
      file.filepath,
      createUncachedDescriptors,
      envName,
    ),
  ),
);
const loadFileOverridesDescriptors = makeWeakCache((file: ValidatedFile) =>
  makeStrongCache((index: number) =>
    buildOverrideDescriptors(
      file,
      file.filepath,
      createUncachedDescriptors,
      index,
    ),
  ),
);
const loadFileOverridesEnvDescriptors = makeWeakCache((file: ValidatedFile) =>
  makeStrongCache((index: number) =>
    makeStrongCache((envName: string) =>
      buildOverrideEnvDescriptors(
        file,
        file.filepath,
        createUncachedDescriptors,
        index,
        envName,
      ),
    ),
  ),
);

function buildRootDescriptors({ dirname, options }, alias, descriptors) {
  return descriptors(dirname, options, alias);
}

function buildEnvDescriptors(
  { dirname, options },
  alias,
  descriptors,
  envName,
) {
  const opts = options.env && options.env[envName];
  return opts ? descriptors(dirname, opts, `${alias}.env["${envName}"]`) : null;
}

function buildOverrideDescriptors(
  { dirname, options },
  alias,
  descriptors,
  index,
) {
  const opts = options.overrides && options.overrides[index];
  if (!opts) throw new Error("Assertion failure - missing override");

  return descriptors(dirname, opts, `${alias}.overrides[${index}]`);
}

function buildOverrideEnvDescriptors(
  { dirname, options },
  alias,
  descriptors,
  index,
  envName,
) {
  const override = options.overrides && options.overrides[index];
  if (!override) throw new Error("Assertion failure - missing override");

  const opts = override.env && override.env[envName];
  return opts
    ? descriptors(
        dirname,
        opts,
        `${alias}.overrides[${index}].env["${envName}"]`,
      )
    : null;
}

function makeChainWalker<
  ArgT,
  InnerT: { options: ValidatedOptions, dirname: string },
>({
  init,
  root,
  env,
  overrides,
  overridesEnv,
}: {
  init: ArgT => InnerT,
  root: InnerT => OptionsAndDescriptors,
  env: (InnerT, string) => OptionsAndDescriptors | null,
  overrides: (InnerT, number) => OptionsAndDescriptors,
  overridesEnv: (InnerT, number, string) => OptionsAndDescriptors | null,
}): (ArgT, ConfigContext, Set<ConfigFile> | void) => ConfigChain | null {
  return (arg, context, files = new Set()) => {
    const input = init(arg);

    const { dirname } = input;

    const flattenedConfigs = [];

    const rootOpts = root(input);
    if (configIsApplicable(rootOpts, dirname, context)) {
      flattenedConfigs.push(rootOpts);

      const envOpts = env(input, context.envName);
      if (envOpts && configIsApplicable(envOpts, dirname, context)) {
        flattenedConfigs.push(envOpts);
      }

      (rootOpts.options.overrides || []).forEach((_, index) => {
        const overrideOps = overrides(input, index);
        if (configIsApplicable(overrideOps, dirname, context)) {
          flattenedConfigs.push(overrideOps);

          const overrideEnvOpts = overridesEnv(input, index, context.envName);
          if (
            overrideEnvOpts &&
            configIsApplicable(overrideEnvOpts, dirname, context)
          ) {
            flattenedConfigs.push(overrideEnvOpts);
          }
        }
      });
    }

    // Process 'ignore' and 'only' before 'extends' items are processed so
    // that we don't do extra work loading extended configs if a file is
    // ignored.
    if (
      flattenedConfigs.some(({ options: { ignore, only } }) =>
        shouldIgnore(context, ignore, only, dirname),
      )
    ) {
      return null;
    }

    const chain = emptyChain();

    for (const op of flattenedConfigs) {
      if (!mergeExtendsChain(chain, op.options, dirname, context, files)) {
        return null;
      }

      mergeChainOpts(chain, op);
    }
    return chain;
  };
}

function mergeExtendsChain(
  chain: ConfigChain,
  opts: ValidatedOptions,
  dirname: string,
  context: ConfigContext,
  files: Set<ConfigFile>,
): boolean {
  if (opts.extends === undefined) return true;

  const file = loadConfig(opts.extends, dirname, context.envName);

  if (files.has(file)) {
    throw new Error(
      `Configuration cycle detected loading ${file.filepath}.\n` +
        `File already loaded following the config chain:\n` +
        Array.from(files, file => ` - ${file.filepath}`).join("\n"),
    );
  }

  files.add(file);
  const fileChain = loadFileChain(file, context, files);
  files.delete(file);

  if (!fileChain) return false;

  mergeChain(chain, fileChain);

  return true;
}

function mergeChain(target: ConfigChain, source: ConfigChain): ConfigChain {
  target.options.push(...source.options);
  target.plugins.push(...source.plugins);
  target.presets.push(...source.presets);

  return target;
}

function mergeChainOpts(
  target: ConfigChain,
  { options, plugins, presets }: OptionsAndDescriptors,
): ConfigChain {
  target.options.push(options);
  target.plugins.push(...plugins());
  target.presets.push(...presets());

  return target;
}

function emptyChain(): ConfigChain {
  return {
    options: [],
    presets: [],
    plugins: [],
  };
}

function normalizeOptions(opts: ValidatedOptions): ValidatedOptions {
  const options = Object.assign({}, opts);
  delete options.extends;
  delete options.env;
  delete options.plugins;
  delete options.presets;
  delete options.passPerPreset;
  delete options.ignore;
  delete options.only;

  // "sourceMap" is just aliased to sourceMap, so copy it over as
  // we merge the options together.
  if (options.sourceMap) {
    options.sourceMaps = options.sourceMap;
    delete options.sourceMap;
  }
  return options;
}

function dedupDescriptors(
  items: Array<UnloadedDescriptor>,
): Array<UnloadedDescriptor> {
  const map: Map<
    Function,
    Map<string | void, { value: UnloadedDescriptor | null }>,
  > = new Map();

  const descriptors = [];

  for (const item of items) {
    if (typeof item.value === "function") {
      const fnKey = item.value;
      let nameMap = map.get(fnKey);
      if (!nameMap) {
        nameMap = new Map();
        map.set(fnKey, nameMap);
      }
      let desc = nameMap.get(item.name);
      if (!desc) {
        desc = { value: null };
        descriptors.push(desc);

        // Treat passPerPreset presets as unique, skipping them
        // in the merge processing steps.
        if (!item.ownPass) nameMap.set(item.name, desc);
      }

      if (item.options === false) {
        desc.value = null;
      } else {
        desc.value = item;
      }
    } else {
      descriptors.push({ value: item });
    }
  }

  return descriptors.reduce((acc, desc) => {
    if (desc.value) acc.push(desc.value);
    return acc;
  }, []);
}

function configIsApplicable(
  { options }: OptionsAndDescriptors,
  dirname: string,
  context: ConfigContext,
): boolean {
  return (
    (options.test === undefined ||
      configFieldIsApplicable(context, options.test, dirname)) &&
    (options.include === undefined ||
      configFieldIsApplicable(context, options.include, dirname)) &&
    (options.exclude === undefined ||
      !configFieldIsApplicable(context, options.exclude, dirname))
  );
}

function configFieldIsApplicable(
  context: ConfigContext,
  test: ConfigApplicableTest,
  dirname: string,
): boolean {
  if (context.filename === null) {
    throw new Error(
      `Configuration contains explicit test/include/exclude checks, but no filename was passed to Babel`,
    );
  }
  // $FlowIgnore - Flow refinements aren't quite smart enough for this :(
  const ctx: ConfigContextNamed = context;

  const patterns = Array.isArray(test) ? test : [test];

  // Disabling negation here because it's a bit buggy from
  // https://github.com/babel/babel/issues/6907 and it's not clear that it is
  // needed since users can use 'exclude' alongside 'test'/'include'.
  return matchesPatterns(ctx, patterns, dirname, false /* allowNegation */);
}

/**
 * Tests if a filename should be ignored based on "ignore" and "only" options.
 */
function shouldIgnore(
  context: ConfigContext,
  ignore: ?IgnoreList,
  only: ?IgnoreList,
  dirname: string,
): boolean {
  if (ignore) {
    if (context.filename === null) {
      throw new Error(
        `Configuration contains ignore checks, but no filename was passed to Babel`,
      );
    }
    // $FlowIgnore - Flow refinements aren't quite smart enough for this :(
    const ctx: ConfigContextNamed = context;
    if (matchesPatterns(ctx, ignore, dirname)) {
      debug(
        "Ignored %o because it matched one of %O from %o",
        context.filename,
        ignore,
        dirname,
      );
      return true;
    }
  }

  if (only) {
    if (context.filename === null) {
      throw new Error(
        `Configuration contains ignore checks, but no filename was passed to Babel`,
      );
    }
    // $FlowIgnore - Flow refinements aren't quite smart enough for this :(
    const ctx: ConfigContextNamed = context;

    if (!matchesPatterns(ctx, only, dirname)) {
      debug(
        "Ignored %o because it failed to match one of %O from %o",
        context.filename,
        only,
        dirname,
      );
      return true;
    }
  }

  return false;
}

/**
 * Returns result of calling function with filename if pattern is a function.
 * Otherwise returns result of matching pattern Regex with filename.
 */
function matchesPatterns(
  context: ConfigContextNamed,
  patterns: IgnoreList,
  dirname: string,
  allowNegation?: boolean = true,
): boolean {
  const res = [];
  const strings = [];
  const fns = [];

  patterns.forEach(pattern => {
    if (typeof pattern === "string") strings.push(pattern);
    else if (typeof pattern === "function") fns.push(pattern);
    else res.push(pattern);
  });

  const filename = context.filename;
  if (res.some(re => re.test(context.filename))) return true;
  if (fns.some(fn => fn(filename))) return true;

  if (strings.length > 0) {
    const possibleDirs = getPossibleDirs(context);

    const absolutePatterns = strings.map(pattern => {
      // Preserve the "!" prefix so that micromatch can use it for negation.
      const negate = pattern[0] === "!";
      if (negate && !allowNegation) {
        throw new Error(`Negation of file paths is not supported.`);
      }
      if (negate) pattern = pattern.slice(1);

      return (negate ? "!" : "") + path.resolve(dirname, pattern);
    });

    if (
      micromatch(possibleDirs, absolutePatterns, {
        nocase: true,
        nonegate: !allowNegation,
      }).length > 0
    ) {
      return true;
    }
  }

  return false;
}

const getPossibleDirs = makeWeakCache((context: ConfigContextNamed) => {
  let current = context.filename;
  if (current === null) return [];

  const possibleDirs = [current];
  while (true) {
    const previous = current;
    current = path.dirname(current);
    if (previous === current) break;

    possibleDirs.push(current);
  }

  return possibleDirs;
});
