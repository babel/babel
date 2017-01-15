import escapeRegExp from "lodash/escapeRegExp";
import startsWith from "lodash/startsWith";
import minimatch from "minimatch";
import includes from "lodash/includes";
import isRegExp from "lodash/isRegExp";
import path from "path";
import slash from "slash";

export { inherits, inspect } from "util";

/**
 * Test if a filename ends with a compilable extension.
 */

export function canCompile(filename: string, altExts?: Array<string>): boolean {
  const exts = altExts || canCompile.EXTENSIONS;
  const ext = path.extname(filename);
  return includes(exts, ext);
}

/**
 * Default set of compilable extensions.
 */

canCompile.EXTENSIONS = [".js", ".jsx", ".es6", ".es"];

/**
 * Create an array from any value, splitting strings by ",".
 */

export function list(val?: string): Array<string> {
  if (!val) {
    return [];
  } else if (Array.isArray(val)) {
    return val;
  } else if (typeof val === "string") {
    return val.split(",");
  } else {
    return [val];
  }
}

/**
 * Create a RegExp from a string, array, or regexp.
 */

export function regexify(val: any): RegExp {
  if (!val) {
    return new RegExp(/.^/);
  }

  if (Array.isArray(val)) {
    val = new RegExp(val.map(escapeRegExp).join("|"), "i");
  }

  if (typeof val === "string") {
    // normalise path separators
    val = slash(val);

    // remove starting wildcards or relative separator if present
    if (startsWith(val, "./") || startsWith(val, "*/")) val = val.slice(2);
    if (startsWith(val, "**/")) val = val.slice(3);

    const regex = minimatch.makeRe(val, { nocase: true });
    return new RegExp(regex.source.slice(1, -1), "i");
  }

  if (isRegExp(val)) {
    return val;
  }

  throw new TypeError("illegal type for regexify");
}

/**
 * Create an array from a boolean, string, or array, mapped by and optional function.
 */

export function arrayify(val: any, mapFn?: Function): Array<any> {
  if (!val) return [];
  if (typeof val === "boolean") return arrayify([val], mapFn);
  if (typeof val === "string") return arrayify(list(val), mapFn);

  if (Array.isArray(val)) {
    if (mapFn) val = val.map(mapFn);
    return val;
  }

  return [val];
}

/**
 * Makes boolean-like strings into booleans.
 */

export function booleanify(val: any): boolean | any {
  if (val === "true" || val == 1) {
    return true;
  }

  if (val === "false" || val == 0 || !val) {
    return false;
  }

  return val;
}

/**
 * Tests if a filename should be ignored based on "ignore" and "only" options.
 */

export function shouldIgnore(
  filename: string,
  ignore: Array<RegExp | Function> = [],
  only?: Array<RegExp | Function>,
): boolean {
  filename = filename.replace(/\\/g, "/");

  if (only) {
    for (const pattern of only) {
      if (_shouldIgnore(pattern, filename)) return false;
    }
    return true;
  } else if (ignore.length) {
    for (const pattern of ignore) {
      if (_shouldIgnore(pattern, filename)) return true;
    }
  }

  return false;
}

/**
 * Returns result of calling function with filename if pattern is a function.
 * Otherwise returns result of matching pattern Regex with filename.
 */

function _shouldIgnore(pattern: Function | RegExp, filename: string) {
  if (typeof pattern === "function") {
    return pattern(filename);
  } else {
    return pattern.test(filename);
  }
}
