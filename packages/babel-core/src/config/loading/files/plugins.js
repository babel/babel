// @flow

/**
 * This file handles all logic for converting string-based configuration references into loaded objects.
 */

import resolve from "resolve";

export function resolvePlugin(pluginName: string, dirname: string): string|null {
  const possibleNames = [`babel-plugin-${pluginName}`, pluginName];

  return resolveFromPossibleNames(possibleNames, dirname);
}

export function resolvePreset(presetName: string, dirname: string): string|null {
  const possibleNames = [`babel-preset-${presetName}`, presetName];

  // trying to resolve @organization shortcat
  // @foo/es2015 -> @foo/babel-preset-es2015
  const matches = presetName.match(/^(@[^/]+)\/(.+)$/);
  if (matches) {
    const [, orgName, presetPath] = matches;
    possibleNames.push(`${orgName}/babel-preset-${presetPath}`);
  }

  return resolveFromPossibleNames(possibleNames, dirname);
}

export function loadPlugin(name: string, dirname: string): { filepath: string, value: mixed } {
  const filepath = resolvePlugin(name, dirname);
  if (!filepath) throw new Error(`Plugin ${name} not found relative to ${dirname}`);

  return {
    filepath,
    value: requireModule(filepath),
  };
}

export function loadPreset(name: string, dirname: string): { filepath: string, value: mixed } {
  const filepath = resolvePreset(name, dirname);
  if (!filepath) throw new Error(`Preset ${name} not found relative to ${dirname}`);

  return {
    filepath,
    value: requireModule(filepath),
  };
}

export function loadParser(name: string, dirname: string): { filepath: string, value: Function } {
  const filepath = resolveQuiet(name, dirname);
  if (!filepath) throw new Error(`Parser ${name} not found relative to ${dirname}`);

  const mod = requireModule(filepath);

  if (!mod) {
    throw new Error(`Parser ${name} relative to ${dirname} does not export an object`);
  }
  if (typeof mod.parse !== "function") {
    throw new Error(`Parser ${name} relative to ${dirname} does not export a .parse function`);
  }

  return {
    filepath,
    value: mod.parse,
  };
}

export function loadGenerator(name: string, dirname: string): { filepath: string, value: Function } {
  const filepath = resolveQuiet(name, dirname);
  if (!filepath) throw new Error(`Generator ${name} not found relative to ${dirname}`);

  const mod = requireModule(filepath);

  if (!mod) {
    throw new Error(`Generator ${name} relative to ${dirname} does not export an object`);
  }
  if (typeof mod.print !== "function") {
    throw new Error(`Generator ${name} relative to ${dirname} does not export a .print function`);
  }

  return {
    filepath,
    value: mod.print,
  };
}

function resolveQuiet(name: string, dirname: string): string|null {
  try {
    return resolve.sync(name, { basedir: dirname });
  } catch (e) {
    // The 'resolve' module can currently throw ENOTDIR
    // https://github.com/substack/node-resolve/issues/121
    if (e.code !== "MODULE_NOT_FOUND" && e.code !== "ENOTDIR") throw e;

    // Silently fail and move to the next item.
  }
  return null;
}

function resolveFromPossibleNames(possibleNames: Array<string>, dirname: string): string|null {
  for (const name of possibleNames) {
    const result = resolveQuiet(name, dirname);
    if (result !== null) return result;
  }
  return null;
}

function requireModule(name: string): mixed {
  // $FlowIssue
  return require(name);
}
