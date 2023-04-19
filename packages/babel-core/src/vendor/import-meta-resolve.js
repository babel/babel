
/****************************************************************************\
 *                         NOTE FROM BABEL AUTHORS                          *
 * This file is inlined from https://github.com/wooorm/import-meta-resolve, *
 * because we need to compile it to CommonJS.                               *
\****************************************************************************/

/*
(The MIT License)

Copyright (c) 2021 Titus Wormer <mailto:tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

This is a derivative work based on:
<https://github.com/nodejs/node>.
Which is licensed:

"""
Copyright Node.js contributors. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
"""

This license applies to parts of Node.js originating from the
https://github.com/joyent/node repository:

"""
Copyright Joyent, Inc. and other Node contributors. All rights reserved.
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
"""
*/

import assert from 'node:assert';
import fs, { realpathSync, statSync, Stats } from 'node:fs';
import process from 'node:process';
import { fileURLToPath, URL, pathToFileURL } from 'node:url';
import path from 'node:path';
import { builtinModules } from 'node:module';
import v8 from 'node:v8';
import { format, inspect } from 'node:util';

/**
 * @typedef ErrnoExceptionFields
 * @property {number | undefined} [errnode]
 * @property {string | undefined} [code]
 * @property {string | undefined} [path]
 * @property {string | undefined} [syscall]
 * @property {string | undefined} [url]
 *
 * @typedef {Error & ErrnoExceptionFields} ErrnoException
 */

const isWindows = process.platform === 'win32';

const own$1 = {}.hasOwnProperty;

const codes = {};

/**
 * Create a list string in the form like 'A and B' or 'A, B, ..., and Z'.
 * We cannot use Intl.ListFormat because it's not available in
 * --without-intl builds.
 *
 * @param {Array<string>} array
 *   An array of strings.
 * @param {string} [type]
 *   The list type to be inserted before the last element.
 * @returns {string}
 */
function formatList(array, type = 'and') {
  return array.length < 3
    ? array.join(` ${type} `)
    : `${array.slice(0, -1).join(', ')}, ${type} ${array[array.length - 1]}`
}

/** @type {Map<string, MessageFunction|string>} */
const messages = new Map();
const nodeInternalPrefix = '__node_internal_';
/** @type {number} */
let userStackTraceLimit;

codes.ERR_INVALID_MODULE_SPECIFIER = createError(
  'ERR_INVALID_MODULE_SPECIFIER',
  /**
   * @param {string} request
   * @param {string} reason
   * @param {string} [base]
   */
  (request, reason, base = undefined) => {
    return `Invalid module "${request}" ${reason}${
      base ? ` imported from ${base}` : ''
    }`
  },
  TypeError
);

codes.ERR_INVALID_PACKAGE_CONFIG = createError(
  'ERR_INVALID_PACKAGE_CONFIG',
  /**
   * @param {string} path
   * @param {string} [base]
   * @param {string} [message]
   */
  (path, base, message) => {
    return `Invalid package config ${path}${
      base ? ` while importing ${base}` : ''
    }${message ? `. ${message}` : ''}`
  },
  Error
);

codes.ERR_INVALID_PACKAGE_TARGET = createError(
  'ERR_INVALID_PACKAGE_TARGET',
  /**
   * @param {string} pkgPath
   * @param {string} key
   * @param {unknown} target
   * @param {boolean} [isImport=false]
   * @param {string} [base]
   */
  (pkgPath, key, target, isImport = false, base = undefined) => {
    const relError =
      typeof target === 'string' &&
      !isImport &&
      target.length > 0 &&
      !target.startsWith('./');
    if (key === '.') {
      assert(isImport === false);
      return (
        `Invalid "exports" main target ${JSON.stringify(target)} defined ` +
        `in the package config ${pkgPath}package.json${
          base ? ` imported from ${base}` : ''
        }${relError ? '; targets must start with "./"' : ''}`
      )
    }

    return `Invalid "${
      isImport ? 'imports' : 'exports'
    }" target ${JSON.stringify(
      target
    )} defined for '${key}' in the package config ${pkgPath}package.json${
      base ? ` imported from ${base}` : ''
    }${relError ? '; targets must start with "./"' : ''}`
  },
  Error
);

codes.ERR_MODULE_NOT_FOUND = createError(
  'ERR_MODULE_NOT_FOUND',
  /**
   * @param {string} path
   * @param {string} base
   * @param {string} [type]
   */
  (path, base, type = 'package') => {
    return `Cannot find ${type} '${path}' imported from ${base}`
  },
  Error
);

codes.ERR_NETWORK_IMPORT_DISALLOWED = createError(
  'ERR_NETWORK_IMPORT_DISALLOWED',
  "import of '%s' by %s is not supported: %s",
  Error
);

codes.ERR_PACKAGE_IMPORT_NOT_DEFINED = createError(
  'ERR_PACKAGE_IMPORT_NOT_DEFINED',
  /**
   * @param {string} specifier
   * @param {string} packagePath
   * @param {string} base
   */
  (specifier, packagePath, base) => {
    return `Package import specifier "${specifier}" is not defined${
      packagePath ? ` in package ${packagePath}package.json` : ''
    } imported from ${base}`
  },
  TypeError
);

codes.ERR_PACKAGE_PATH_NOT_EXPORTED = createError(
  'ERR_PACKAGE_PATH_NOT_EXPORTED',
  /**
   * @param {string} pkgPath
   * @param {string} subpath
   * @param {string} [base]
   */
  (pkgPath, subpath, base = undefined) => {
    if (subpath === '.')
      return `No "exports" main defined in ${pkgPath}package.json${
        base ? ` imported from ${base}` : ''
      }`
    return `Package subpath '${subpath}' is not defined by "exports" in ${pkgPath}package.json${
      base ? ` imported from ${base}` : ''
    }`
  },
  Error
);

codes.ERR_UNSUPPORTED_DIR_IMPORT = createError(
  'ERR_UNSUPPORTED_DIR_IMPORT',
  "Directory import '%s' is not supported " +
    'resolving ES modules imported from %s',
  Error
);

codes.ERR_UNKNOWN_FILE_EXTENSION = createError(
  'ERR_UNKNOWN_FILE_EXTENSION',
  /**
   * @param {string} ext
   * @param {string} path
   */
  (ext, path) => {
    return `Unknown file extension "${ext}" for ${path}`
  },
  TypeError
);

codes.ERR_INVALID_ARG_VALUE = createError(
  'ERR_INVALID_ARG_VALUE',
  /**
   * @param {string} name
   * @param {unknown} value
   * @param {string} [reason='is invalid']
   */
  (name, value, reason = 'is invalid') => {
    let inspected = inspect(value);

    if (inspected.length > 128) {
      inspected = `${inspected.slice(0, 128)}...`;
    }

    const type = name.includes('.') ? 'property' : 'argument';

    return `The ${type} '${name}' ${reason}. Received ${inspected}`
  },
  TypeError
  // Note: extra classes have been shaken out.
  // , RangeError
);

codes.ERR_UNSUPPORTED_ESM_URL_SCHEME = createError(
  'ERR_UNSUPPORTED_ESM_URL_SCHEME',
  /**
   * @param {URL} url
   * @param {Array<string>} supported
   */
  (url, supported) => {
    let message = `Only URLs with a scheme in: ${formatList(
      supported
    )} are supported by the default ESM loader`;

    if (isWindows && url.protocol.length === 2) {
      message += '. On Windows, absolute paths must be valid file:// URLs';
    }

    message += `. Received protocol '${url.protocol}'`;
    return message
  },
  Error
);

/**
 * Utility function for registering the error codes. Only used here. Exported
 * *only* to allow for testing.
 * @param {string} sym
 * @param {MessageFunction|string} value
 * @param {ErrorConstructor} def
 * @returns {new (...args: Array<any>) => Error}
 */
function createError(sym, value, def) {
  // Special case for SystemError that formats the error message differently
  // The SystemErrors only have SystemError as their base classes.
  messages.set(sym, value);

  return makeNodeErrorWithCode(def, sym)
}

/**
 * @param {ErrorConstructor} Base
 * @param {string} key
 * @returns {ErrorConstructor}
 */
function makeNodeErrorWithCode(Base, key) {
  // @ts-expect-error It’s a Node error.
  return NodeError
  /**
   * @param {Array<unknown>} args
   */
  function NodeError(...args) {
    const limit = Error.stackTraceLimit;
    if (isErrorStackTraceLimitWritable()) Error.stackTraceLimit = 0;
    const error = new Base();
    // Reset the limit and setting the name property.
    if (isErrorStackTraceLimitWritable()) Error.stackTraceLimit = limit;
    const message = getMessage(key, args, error);
    Object.defineProperties(error, {
      // Note: no need to implement `kIsNodeError` symbol, would be hard,
      // probably.
      message: {
        value: message,
        enumerable: false,
        writable: true,
        configurable: true
      },
      toString: {
        /** @this {Error} */
        value() {
          return `${this.name} [${key}]: ${this.message}`
        },
        enumerable: false,
        writable: true,
        configurable: true
      }
    });

    captureLargerStackTrace(error);
    // @ts-expect-error It’s a Node error.
    error.code = key;
    return error
  }
}

/**
 * @returns {boolean}
 */
function isErrorStackTraceLimitWritable() {
  // Do no touch Error.stackTraceLimit as V8 would attempt to install
  // it again during deserialization.
  try {
    // @ts-expect-error: not in types?
    if (v8.startupSnapshot.isBuildingSnapshot()) {
      return false
    }
  } catch {}

  const desc = Object.getOwnPropertyDescriptor(Error, 'stackTraceLimit');
  if (desc === undefined) {
    return Object.isExtensible(Error)
  }

  return own$1.call(desc, 'writable') && desc.writable !== undefined
    ? desc.writable
    : desc.set !== undefined
}

/**
 * This function removes unnecessary frames from Node.js core errors.
 * @template {(...args: unknown[]) => unknown} T
 * @param {T} fn
 * @returns {T}
 */
function hideStackFrames(fn) {
  // We rename the functions that will be hidden to cut off the stacktrace
  // at the outermost one
  const hidden = nodeInternalPrefix + fn.name;
  Object.defineProperty(fn, 'name', {value: hidden});
  return fn
}

const captureLargerStackTrace = hideStackFrames(
  /**
   * @param {Error} error
   * @returns {Error}
   */
  // @ts-expect-error: fine
  function (error) {
    const stackTraceLimitIsWritable = isErrorStackTraceLimitWritable();
    if (stackTraceLimitIsWritable) {
      userStackTraceLimit = Error.stackTraceLimit;
      Error.stackTraceLimit = Number.POSITIVE_INFINITY;
    }

    Error.captureStackTrace(error);

    // Reset the limit
    if (stackTraceLimitIsWritable) Error.stackTraceLimit = userStackTraceLimit;

    return error
  }
);

/**
 * @param {string} key
 * @param {Array<unknown>} args
 * @param {Error} self
 * @returns {string}
 */
function getMessage(key, args, self) {
  const message = messages.get(key);
  assert(typeof message !== 'undefined', 'expected `message` to be found');

  if (typeof message === 'function') {
    assert(
      message.length <= args.length, // Default options do not count.
      `Code: ${key}; The provided arguments length (${args.length}) does not ` +
        `match the required ones (${message.length}).`
    );
    return Reflect.apply(message, self, args)
  }

  const regex = /%[dfijoOs]/g;
  let expectedLength = 0;
  while (regex.exec(message) !== null) expectedLength++;
  assert(
    expectedLength === args.length,
    `Code: ${key}; The provided arguments length (${args.length}) does not ` +
      `match the required ones (${expectedLength}).`
  );
  if (args.length === 0) return message

  args.unshift(message);
  return Reflect.apply(format, null, args)
}

// Manually “tree shaken” from:

const reader = {read};

/**
 * @param {string} jsonPath
 * @returns {{string: string|undefined}}
 */
function read(jsonPath) {
  try {
    const string = fs.readFileSync(
      path.toNamespacedPath(path.join(path.dirname(jsonPath), 'package.json')),
      'utf8'
    );
    return {string}
  } catch (error) {
    const exception = /** @type {ErrnoException} */ (error);

    if (exception.code === 'ENOENT') {
      return {string: undefined}
      // Throw all other errors.
      /* c8 ignore next 4 */
    }

    throw exception
  }
}

// Manually “tree shaken” from:

const {ERR_INVALID_PACKAGE_CONFIG: ERR_INVALID_PACKAGE_CONFIG$1} = codes;

/** @type {Map<string, PackageConfig>} */
const packageJsonCache = new Map();

/**
 * @param {string} path
 * @param {string|URL} specifier Note: `specifier` is actually optional, not base.
 * @param {URL} [base]
 * @returns {PackageConfig}
 */
function getPackageConfig(path, specifier, base) {
  const existing = packageJsonCache.get(path);
  if (existing !== undefined) {
    return existing
  }

  const source = reader.read(path).string;

  if (source === undefined) {
    /** @type {PackageConfig} */
    const packageConfig = {
      pjsonPath: path,
      exists: false,
      main: undefined,
      name: undefined,
      type: 'none',
      exports: undefined,
      imports: undefined
    };
    packageJsonCache.set(path, packageConfig);
    return packageConfig
  }

  /** @type {Record<string, unknown>} */
  let packageJson;
  try {
    packageJson = JSON.parse(source);
  } catch (error) {
    const exception = /** @type {ErrnoException} */ (error);

    throw new ERR_INVALID_PACKAGE_CONFIG$1(
      path,
      (base ? `"${specifier}" from ` : '') + fileURLToPath(base || specifier),
      exception.message
    )
  }

  const {exports, imports, main, name, type} = packageJson;

  /** @type {PackageConfig} */
  const packageConfig = {
    pjsonPath: path,
    exists: true,
    main: typeof main === 'string' ? main : undefined,
    name: typeof name === 'string' ? name : undefined,
    type: type === 'module' || type === 'commonjs' ? type : 'none',
    // @ts-expect-error Assume `Record<string, unknown>`.
    exports,
    // @ts-expect-error Assume `Record<string, unknown>`.
    imports: imports && typeof imports === 'object' ? imports : undefined
  };
  packageJsonCache.set(path, packageConfig);
  return packageConfig
}

/**
 * @param {URL} resolved
 * @returns {PackageConfig}
 */
function getPackageScopeConfig(resolved) {
  let packageJsonUrl = new URL('package.json', resolved);

  while (true) {
    const packageJsonPath = packageJsonUrl.pathname;

    if (packageJsonPath.endsWith('node_modules/package.json')) break

    const packageConfig = getPackageConfig(
      fileURLToPath(packageJsonUrl),
      resolved
    );
    if (packageConfig.exists) return packageConfig

    const lastPackageJsonUrl = packageJsonUrl;
    packageJsonUrl = new URL('../package.json', packageJsonUrl);

    // Terminates at root where ../package.json equals ../../package.json
    // (can't just check "/package.json" for Windows support).
    if (packageJsonUrl.pathname === lastPackageJsonUrl.pathname) break
  }

  const packageJsonPath = fileURLToPath(packageJsonUrl);
  /** @type {PackageConfig} */
  const packageConfig = {
    pjsonPath: packageJsonPath,
    exists: false,
    main: undefined,
    name: undefined,
    type: 'none',
    exports: undefined,
    imports: undefined
  };
  packageJsonCache.set(packageJsonPath, packageConfig);
  return packageConfig
}

// Manually “tree shaken” from:

/**
 * @param {URL} url
 * @returns {PackageType}
 */
function getPackageType(url) {
  const packageConfig = getPackageScopeConfig(url);
  return packageConfig.type
}

// Manually “tree shaken” from:

const {ERR_UNKNOWN_FILE_EXTENSION} = codes;

const hasOwnProperty = {}.hasOwnProperty;

/** @type {Record<string, string>} */
const extensionFormatMap = {
  // @ts-expect-error: hush.
  __proto__: null,
  '.cjs': 'commonjs',
  '.js': 'module',
  '.json': 'json',
  '.mjs': 'module'
};

/**
 * @param {string|null} mime
 * @returns {string | null}
 */
function mimeToFormat(mime) {
  if (
    mime &&
    /\s*(text|application)\/javascript\s*(;\s*charset=utf-?8\s*)?/i.test(mime)
  )
    return 'module'
  if (mime === 'application/json') return 'json'
  return null
}

/**
 * @callback ProtocolHandler
 * @param {URL} parsed
 * @param {{parentURL: string}} context
 * @param {boolean} ignoreErrors
 * @returns {string|null|void}
 */

/**
 * @type {Record<string, ProtocolHandler>}
 */
const protocolHandlers = {
  // @ts-expect-error: hush.
  __proto__: null,
  'data:': getDataProtocolModuleFormat,
  'file:': getFileProtocolModuleFormat,
  'http:': getHttpProtocolModuleFormat,
  'https:': getHttpProtocolModuleFormat,
  'node:'() {
    return 'builtin'
  }
};

/**
 * @param {URL} parsed
 */
function getDataProtocolModuleFormat(parsed) {
  const {1: mime} = /^([^/]+\/[^;,]+)[^,]*?(;base64)?,/.exec(
    parsed.pathname
  ) || [null, null, null];
  return mimeToFormat(mime)
}

/**
 * @type {ProtocolHandler}
 */
function getFileProtocolModuleFormat(url, _context, ignoreErrors) {
  const filepath = fileURLToPath(url);
  const ext = path.extname(filepath);
  if (ext === '.js') {
    return getPackageType(url) === 'module' ? 'module' : 'commonjs'
  }

  const format = extensionFormatMap[ext];
  if (format) return format

  // Explicit undefined return indicates load hook should rerun format check
  if (ignoreErrors) {
    return undefined
  }

  throw new ERR_UNKNOWN_FILE_EXTENSION(ext, filepath)
}

function getHttpProtocolModuleFormat() {
  // To do: HTTPS imports.
}

/**
 * @param {URL} url
 * @param {{parentURL: string}} context
 * @returns {string|null}
 */
function defaultGetFormatWithoutErrors(url, context) {
  if (!hasOwnProperty.call(protocolHandlers, url.protocol)) {
    return null
  }

  return protocolHandlers[url.protocol](url, context, true) || null
}

// Manually “tree shaken” from:

const {ERR_INVALID_ARG_VALUE} = codes;

// In Node itself these values are populated from CLI arguments, before any
// user code runs.
// Here we just define the defaults.
const DEFAULT_CONDITIONS = Object.freeze(['node', 'import']);
const DEFAULT_CONDITIONS_SET = new Set(DEFAULT_CONDITIONS);

function getDefaultConditions() {
  return DEFAULT_CONDITIONS
}

function getDefaultConditionsSet() {
  return DEFAULT_CONDITIONS_SET
}

/**
 * @param {Array<string>} [conditions]
 * @returns {Set<string>}
 */
function getConditionsSet(conditions) {
  if (conditions !== undefined && conditions !== getDefaultConditions()) {
    if (!Array.isArray(conditions)) {
      throw new ERR_INVALID_ARG_VALUE(
        'conditions',
        conditions,
        'expected an array'
      )
    }

    return new Set(conditions)
  }

  return getDefaultConditionsSet()
}

// Manually “tree shaken” from:

const RegExpPrototypeSymbolReplace = RegExp.prototype[Symbol.replace];

// To do: potentially enable?
const experimentalNetworkImports = false;

const {
  ERR_NETWORK_IMPORT_DISALLOWED,
  ERR_INVALID_MODULE_SPECIFIER,
  ERR_INVALID_PACKAGE_CONFIG,
  ERR_INVALID_PACKAGE_TARGET,
  ERR_MODULE_NOT_FOUND,
  ERR_PACKAGE_IMPORT_NOT_DEFINED,
  ERR_PACKAGE_PATH_NOT_EXPORTED,
  ERR_UNSUPPORTED_DIR_IMPORT,
  ERR_UNSUPPORTED_ESM_URL_SCHEME
} = codes;

const own = {}.hasOwnProperty;

const invalidSegmentRegEx =
  /(^|\\|\/)((\.|%2e)(\.|%2e)?|(n|%6e|%4e)(o|%6f|%4f)(d|%64|%44)(e|%65|%45)(_|%5f)(m|%6d|%4d)(o|%6f|%4f)(d|%64|%44)(u|%75|%55)(l|%6c|%4c)(e|%65|%45)(s|%73|%53))?(\\|\/|$)/i;
const deprecatedInvalidSegmentRegEx =
  /(^|\\|\/)((\.|%2e)(\.|%2e)?|(n|%6e|%4e)(o|%6f|%4f)(d|%64|%44)(e|%65|%45)(_|%5f)(m|%6d|%4d)(o|%6f|%4f)(d|%64|%44)(u|%75|%55)(l|%6c|%4c)(e|%65|%45)(s|%73|%53))(\\|\/|$)/i;
const invalidPackageNameRegEx = /^\.|%|\\/;
const patternRegEx = /\*/g;
const encodedSepRegEx = /%2f|%5c/i;
/** @type {Set<string>} */
const emittedPackageWarnings = new Set();

const doubleSlashRegEx = /[/\\]{2}/;

/**
 *
 * @param {string} target
 * @param {string} request
 * @param {string} match
 * @param {URL} packageJsonUrl
 * @param {boolean} internal
 * @param {URL} base
 * @param {boolean} isTarget
 */
function emitInvalidSegmentDeprecation(
  target,
  request,
  match,
  packageJsonUrl,
  internal,
  base,
  isTarget
) {
  const pjsonPath = fileURLToPath(packageJsonUrl);
  const double = doubleSlashRegEx.exec(isTarget ? target : request) !== null;
  process.emitWarning(
    `Use of deprecated ${
      double ? 'double slash' : 'leading or trailing slash matching'
    } resolving "${target}" for module ` +
      `request "${request}" ${
        request === match ? '' : `matched to "${match}" `
      }in the "${
        internal ? 'imports' : 'exports'
      }" field module resolution of the package at ${pjsonPath}${
        base ? ` imported from ${fileURLToPath(base)}` : ''
      }.`,
    'DeprecationWarning',
    'DEP0166'
  );
}

/**
 * @param {URL} url
 * @param {URL} packageJsonUrl
 * @param {URL} base
 * @param {unknown} [main]
 * @returns {void}
 */
function emitLegacyIndexDeprecation(url, packageJsonUrl, base, main) {
  const format = defaultGetFormatWithoutErrors(url, {parentURL: base.href});
  if (format !== 'module') return
  const path = fileURLToPath(url.href);
  const pkgPath = fileURLToPath(new URL('.', packageJsonUrl));
  const basePath = fileURLToPath(base);
  if (main)
    process.emitWarning(
      `Package ${pkgPath} has a "main" field set to ${JSON.stringify(main)}, ` +
        `excluding the full filename and extension to the resolved file at "${path.slice(
          pkgPath.length
        )}", imported from ${basePath}.\n Automatic extension resolution of the "main" field is` +
        'deprecated for ES modules.',
      'DeprecationWarning',
      'DEP0151'
    );
  else
    process.emitWarning(
      `No "main" or "exports" field defined in the package.json for ${pkgPath} resolving the main entry point "${path.slice(
        pkgPath.length
      )}", imported from ${basePath}.\nDefault "index" lookups for the main are deprecated for ES modules.`,
      'DeprecationWarning',
      'DEP0151'
    );
}

/**
 * @param {string} path
 * @returns {Stats}
 */
function tryStatSync(path) {
  // Note: from Node 15 onwards we can use `throwIfNoEntry: false` instead.
  try {
    return statSync(path)
  } catch {
    return new Stats()
  }
}

/**
 * Legacy CommonJS main resolution:
 * 1. let M = pkg_url + (json main field)
 * 2. TRY(M, M.js, M.json, M.node)
 * 3. TRY(M/index.js, M/index.json, M/index.node)
 * 4. TRY(pkg_url/index.js, pkg_url/index.json, pkg_url/index.node)
 * 5. NOT_FOUND
 *
 * @param {URL} url
 * @returns {boolean}
 */
function fileExists(url) {
  const stats = statSync(url, {throwIfNoEntry: false});
  const isFile = stats ? stats.isFile() : undefined;
  return isFile === null || isFile === undefined ? false : isFile
}

/**
 * @param {URL} packageJsonUrl
 * @param {PackageConfig} packageConfig
 * @param {URL} base
 * @returns {URL}
 */
function legacyMainResolve(packageJsonUrl, packageConfig, base) {
  /** @type {URL|undefined} */
  let guess;
  if (packageConfig.main !== undefined) {
    guess = new URL(packageConfig.main, packageJsonUrl);
    // Note: fs check redundances will be handled by Descriptor cache here.
    if (fileExists(guess)) return guess

    const tries = [
      `./${packageConfig.main}.js`,
      `./${packageConfig.main}.json`,
      `./${packageConfig.main}.node`,
      `./${packageConfig.main}/index.js`,
      `./${packageConfig.main}/index.json`,
      `./${packageConfig.main}/index.node`
    ];
    let i = -1;

    while (++i < tries.length) {
      guess = new URL(tries[i], packageJsonUrl);
      if (fileExists(guess)) break
      guess = undefined;
    }

    if (guess) {
      emitLegacyIndexDeprecation(
        guess,
        packageJsonUrl,
        base,
        packageConfig.main
      );
      return guess
    }
    // Fallthrough.
  }

  const tries = ['./index.js', './index.json', './index.node'];
  let i = -1;

  while (++i < tries.length) {
    guess = new URL(tries[i], packageJsonUrl);
    if (fileExists(guess)) break
    guess = undefined;
  }

  if (guess) {
    emitLegacyIndexDeprecation(guess, packageJsonUrl, base, packageConfig.main);
    return guess
  }

  // Not found.
  throw new ERR_MODULE_NOT_FOUND(
    fileURLToPath(new URL('.', packageJsonUrl)),
    fileURLToPath(base)
  )
}

/**
 * @param {URL} resolved
 * @param {URL} base
 * @param {boolean} [preserveSymlinks]
 * @returns {URL}
 */
function finalizeResolution(resolved, base, preserveSymlinks) {
  if (encodedSepRegEx.exec(resolved.pathname) !== null)
    throw new ERR_INVALID_MODULE_SPECIFIER(
      resolved.pathname,
      'must not include encoded "/" or "\\" characters',
      fileURLToPath(base)
    )

  const filePath = fileURLToPath(resolved);

  const stats = tryStatSync(
    filePath.endsWith('/') ? filePath.slice(-1) : filePath
  );

  if (stats.isDirectory()) {
    const error = new ERR_UNSUPPORTED_DIR_IMPORT(filePath, fileURLToPath(base));
    // @ts-expect-error Add this for `import.meta.resolve`.
    error.url = String(resolved);
    throw error
  }

  if (!stats.isFile()) {
    throw new ERR_MODULE_NOT_FOUND(
      filePath || resolved.pathname,
      base && fileURLToPath(base),
      'module'
    )
  }

  if (!preserveSymlinks) {
    const real = realpathSync(filePath);
    const {search, hash} = resolved;
    resolved = pathToFileURL(real + (filePath.endsWith(path.sep) ? '/' : ''));
    resolved.search = search;
    resolved.hash = hash;
  }

  return resolved
}

/**
 * @param {string} specifier
 * @param {URL|undefined} packageJsonUrl
 * @param {URL} base
 * @returns {Error}
 */
function importNotDefined(specifier, packageJsonUrl, base) {
  return new ERR_PACKAGE_IMPORT_NOT_DEFINED(
    specifier,
    packageJsonUrl && fileURLToPath(new URL('.', packageJsonUrl)),
    fileURLToPath(base)
  )
}

/**
 * @param {string} subpath
 * @param {URL} packageJsonUrl
 * @param {URL} base
 * @returns {Error}
 */
function exportsNotFound(subpath, packageJsonUrl, base) {
  return new ERR_PACKAGE_PATH_NOT_EXPORTED(
    fileURLToPath(new URL('.', packageJsonUrl)),
    subpath,
    base && fileURLToPath(base)
  )
}

/**
 * @param {string} request
 * @param {string} match
 * @param {URL} packageJsonUrl
 * @param {boolean} internal
 * @param {URL} [base]
 * @returns {never}
 */
function throwInvalidSubpath(request, match, packageJsonUrl, internal, base) {
  const reason = `request is not a valid match in pattern "${match}" for the "${
    internal ? 'imports' : 'exports'
  }" resolution of ${fileURLToPath(packageJsonUrl)}`;
  throw new ERR_INVALID_MODULE_SPECIFIER(
    request,
    reason,
    base && fileURLToPath(base)
  )
}

/**
 * @param {string} subpath
 * @param {unknown} target
 * @param {URL} packageJsonUrl
 * @param {boolean} internal
 * @param {URL} [base]
 * @returns {Error}
 */
function invalidPackageTarget(subpath, target, packageJsonUrl, internal, base) {
  target =
    typeof target === 'object' && target !== null
      ? JSON.stringify(target, null, '')
      : `${target}`;

  return new ERR_INVALID_PACKAGE_TARGET(
    fileURLToPath(new URL('.', packageJsonUrl)),
    subpath,
    target,
    internal,
    base && fileURLToPath(base)
  )
}

/**
 * @param {string} target
 * @param {string} subpath
 * @param {string} match
 * @param {URL} packageJsonUrl
 * @param {URL} base
 * @param {boolean} pattern
 * @param {boolean} internal
 * @param {boolean} isPathMap
 * @param {Set<string>|undefined} conditions
 * @returns {URL}
 */
function resolvePackageTargetString(
  target,
  subpath,
  match,
  packageJsonUrl,
  base,
  pattern,
  internal,
  isPathMap,
  conditions
) {
  if (subpath !== '' && !pattern && target[target.length - 1] !== '/')
    throw invalidPackageTarget(match, target, packageJsonUrl, internal, base)

  if (!target.startsWith('./')) {
    if (internal && !target.startsWith('../') && !target.startsWith('/')) {
      let isURL = false;

      try {
        new URL(target);
        isURL = true;
      } catch {
        // Continue regardless of error.
      }

      if (!isURL) {
        const exportTarget = pattern
          ? RegExpPrototypeSymbolReplace.call(
              patternRegEx,
              target,
              () => subpath
            )
          : target + subpath;

        return packageResolve(exportTarget, packageJsonUrl, conditions)
      }
    }

    throw invalidPackageTarget(match, target, packageJsonUrl, internal, base)
  }

  if (invalidSegmentRegEx.exec(target.slice(2)) !== null) {
    if (deprecatedInvalidSegmentRegEx.exec(target.slice(2)) === null) {
      if (!isPathMap) {
        const request = pattern
          ? match.replace('*', () => subpath)
          : match + subpath;
        const resolvedTarget = pattern
          ? RegExpPrototypeSymbolReplace.call(
              patternRegEx,
              target,
              () => subpath
            )
          : target;
        emitInvalidSegmentDeprecation(
          resolvedTarget,
          request,
          match,
          packageJsonUrl,
          internal,
          base,
          true
        );
      }
    } else {
      throw invalidPackageTarget(match, target, packageJsonUrl, internal, base)
    }
  }

  const resolved = new URL(target, packageJsonUrl);
  const resolvedPath = resolved.pathname;
  const packagePath = new URL('.', packageJsonUrl).pathname;

  if (!resolvedPath.startsWith(packagePath))
    throw invalidPackageTarget(match, target, packageJsonUrl, internal, base)

  if (subpath === '') return resolved

  if (invalidSegmentRegEx.exec(subpath) !== null) {
    const request = pattern
      ? match.replace('*', () => subpath)
      : match + subpath;
    if (deprecatedInvalidSegmentRegEx.exec(subpath) === null) {
      if (!isPathMap) {
        const resolvedTarget = pattern
          ? RegExpPrototypeSymbolReplace.call(
              patternRegEx,
              target,
              () => subpath
            )
          : target;
        emitInvalidSegmentDeprecation(
          resolvedTarget,
          request,
          match,
          packageJsonUrl,
          internal,
          base,
          false
        );
      }
    } else {
      throwInvalidSubpath(request, match, packageJsonUrl, internal, base);
    }
  }

  if (pattern) {
    return new URL(
      RegExpPrototypeSymbolReplace.call(
        patternRegEx,
        resolved.href,
        () => subpath
      )
    )
  }

  return new URL(subpath, resolved)
}

/**
 * @param {string} key
 * @returns {boolean}
 */
function isArrayIndex(key) {
  const keyNumber = Number(key);
  if (`${keyNumber}` !== key) return false
  return keyNumber >= 0 && keyNumber < 0xff_ff_ff_ff
}

/**
 * @param {URL} packageJsonUrl
 * @param {unknown} target
 * @param {string} subpath
 * @param {string} packageSubpath
 * @param {URL} base
 * @param {boolean} pattern
 * @param {boolean} internal
 * @param {boolean} isPathMap
 * @param {Set<string>|undefined} conditions
 * @returns {URL|null}
 */
function resolvePackageTarget(
  packageJsonUrl,
  target,
  subpath,
  packageSubpath,
  base,
  pattern,
  internal,
  isPathMap,
  conditions
) {
  if (typeof target === 'string') {
    return resolvePackageTargetString(
      target,
      subpath,
      packageSubpath,
      packageJsonUrl,
      base,
      pattern,
      internal,
      isPathMap,
      conditions
    )
  }

  if (Array.isArray(target)) {
    /** @type {Array<unknown>} */
    const targetList = target;
    if (targetList.length === 0) return null

    /** @type {ErrnoException|null|undefined} */
    let lastException;
    let i = -1;

    while (++i < targetList.length) {
      const targetItem = targetList[i];
      /** @type {URL|null} */
      let resolveResult;
      try {
        resolveResult = resolvePackageTarget(
          packageJsonUrl,
          targetItem,
          subpath,
          packageSubpath,
          base,
          pattern,
          internal,
          isPathMap,
          conditions
        );
      } catch (error) {
        const exception = /** @type {ErrnoException} */ (error);
        lastException = exception;
        if (exception.code === 'ERR_INVALID_PACKAGE_TARGET') continue
        throw error
      }

      if (resolveResult === undefined) continue

      if (resolveResult === null) {
        lastException = null;
        continue
      }

      return resolveResult
    }

    if (lastException === undefined || lastException === null) {
      return null
    }

    throw lastException
  }

  if (typeof target === 'object' && target !== null) {
    const keys = Object.getOwnPropertyNames(target);
    let i = -1;

    while (++i < keys.length) {
      const key = keys[i];
      if (isArrayIndex(key)) {
        throw new ERR_INVALID_PACKAGE_CONFIG(
          fileURLToPath(packageJsonUrl),
          base,
          '"exports" cannot contain numeric property keys.'
        )
      }
    }

    i = -1;

    while (++i < keys.length) {
      const key = keys[i];
      if (key === 'default' || (conditions && conditions.has(key))) {
        // @ts-expect-error: indexable.
        const conditionalTarget = /** @type {unknown} */ (target[key]);
        const resolveResult = resolvePackageTarget(
          packageJsonUrl,
          conditionalTarget,
          subpath,
          packageSubpath,
          base,
          pattern,
          internal,
          isPathMap,
          conditions
        );
        if (resolveResult === undefined) continue
        return resolveResult
      }
    }

    return null
  }

  if (target === null) {
    return null
  }

  throw invalidPackageTarget(
    packageSubpath,
    target,
    packageJsonUrl,
    internal,
    base
  )
}

/**
 * @param {unknown} exports
 * @param {URL} packageJsonUrl
 * @param {URL} base
 * @returns {boolean}
 */
function isConditionalExportsMainSugar(exports, packageJsonUrl, base) {
  if (typeof exports === 'string' || Array.isArray(exports)) return true
  if (typeof exports !== 'object' || exports === null) return false

  const keys = Object.getOwnPropertyNames(exports);
  let isConditionalSugar = false;
  let i = 0;
  let j = -1;
  while (++j < keys.length) {
    const key = keys[j];
    const curIsConditionalSugar = key === '' || key[0] !== '.';
    if (i++ === 0) {
      isConditionalSugar = curIsConditionalSugar;
    } else if (isConditionalSugar !== curIsConditionalSugar) {
      throw new ERR_INVALID_PACKAGE_CONFIG(
        fileURLToPath(packageJsonUrl),
        base,
        '"exports" cannot contain some keys starting with \'.\' and some not.' +
          ' The exports object must either be an object of package subpath keys' +
          ' or an object of main entry condition name keys only.'
      )
    }
  }

  return isConditionalSugar
}

/**
 * @param {string} match
 * @param {URL} pjsonUrl
 * @param {URL} base
 */
function emitTrailingSlashPatternDeprecation(match, pjsonUrl, base) {
  const pjsonPath = fileURLToPath(pjsonUrl);
  if (emittedPackageWarnings.has(pjsonPath + '|' + match)) return
  emittedPackageWarnings.add(pjsonPath + '|' + match);
  process.emitWarning(
    `Use of deprecated trailing slash pattern mapping "${match}" in the ` +
      `"exports" field module resolution of the package at ${pjsonPath}${
        base ? ` imported from ${fileURLToPath(base)}` : ''
      }. Mapping specifiers ending in "/" is no longer supported.`,
    'DeprecationWarning',
    'DEP0155'
  );
}

/**
 * @param {URL} packageJsonUrl
 * @param {string} packageSubpath
 * @param {Record<string, unknown>} packageConfig
 * @param {URL} base
 * @param {Set<string>|undefined} conditions
 * @returns {URL}
 */
function packageExportsResolve(
  packageJsonUrl,
  packageSubpath,
  packageConfig,
  base,
  conditions
) {
  let exports = packageConfig.exports;

  if (isConditionalExportsMainSugar(exports, packageJsonUrl, base)) {
    exports = {'.': exports};
  }

  if (
    own.call(exports, packageSubpath) &&
    !packageSubpath.includes('*') &&
    !packageSubpath.endsWith('/')
  ) {
    // @ts-expect-error: indexable.
    const target = exports[packageSubpath];
    const resolveResult = resolvePackageTarget(
      packageJsonUrl,
      target,
      '',
      packageSubpath,
      base,
      false,
      false,
      false,
      conditions
    );
    if (resolveResult === null || resolveResult === undefined) {
      throw exportsNotFound(packageSubpath, packageJsonUrl, base)
    }

    return resolveResult
  }

  let bestMatch = '';
  let bestMatchSubpath = '';
  const keys = Object.getOwnPropertyNames(exports);
  let i = -1;

  while (++i < keys.length) {
    const key = keys[i];
    const patternIndex = key.indexOf('*');

    if (
      patternIndex !== -1 &&
      packageSubpath.startsWith(key.slice(0, patternIndex))
    ) {
      // When this reaches EOL, this can throw at the top of the whole function:
      //
      // if (StringPrototypeEndsWith(packageSubpath, '/'))
      //   throwInvalidSubpath(packageSubpath)
      //
      // To match "imports" and the spec.
      if (packageSubpath.endsWith('/')) {
        emitTrailingSlashPatternDeprecation(
          packageSubpath,
          packageJsonUrl,
          base
        );
      }

      const patternTrailer = key.slice(patternIndex + 1);

      if (
        packageSubpath.length >= key.length &&
        packageSubpath.endsWith(patternTrailer) &&
        patternKeyCompare(bestMatch, key) === 1 &&
        key.lastIndexOf('*') === patternIndex
      ) {
        bestMatch = key;
        bestMatchSubpath = packageSubpath.slice(
          patternIndex,
          packageSubpath.length - patternTrailer.length
        );
      }
    }
  }

  if (bestMatch) {
    // @ts-expect-error: indexable.
    const target = /** @type {unknown} */ (exports[bestMatch]);
    const resolveResult = resolvePackageTarget(
      packageJsonUrl,
      target,
      bestMatchSubpath,
      bestMatch,
      base,
      true,
      false,
      packageSubpath.endsWith('/'),
      conditions
    );

    if (resolveResult === null || resolveResult === undefined) {
      throw exportsNotFound(packageSubpath, packageJsonUrl, base)
    }

    return resolveResult
  }

  throw exportsNotFound(packageSubpath, packageJsonUrl, base)
}

/**
 * @param {string} a
 * @param {string} b
 */
function patternKeyCompare(a, b) {
  const aPatternIndex = a.indexOf('*');
  const bPatternIndex = b.indexOf('*');
  const baseLengthA = aPatternIndex === -1 ? a.length : aPatternIndex + 1;
  const baseLengthB = bPatternIndex === -1 ? b.length : bPatternIndex + 1;
  if (baseLengthA > baseLengthB) return -1
  if (baseLengthB > baseLengthA) return 1
  if (aPatternIndex === -1) return 1
  if (bPatternIndex === -1) return -1
  if (a.length > b.length) return -1
  if (b.length > a.length) return 1
  return 0
}

/**
 * @param {string} name
 * @param {URL} base
 * @param {Set<string>} [conditions]
 * @returns {URL}
 */
function packageImportsResolve(name, base, conditions) {
  if (name === '#' || name.startsWith('#/') || name.endsWith('/')) {
    const reason = 'is not a valid internal imports specifier name';
    throw new ERR_INVALID_MODULE_SPECIFIER(name, reason, fileURLToPath(base))
  }

  /** @type {URL|undefined} */
  let packageJsonUrl;

  const packageConfig = getPackageScopeConfig(base);

  if (packageConfig.exists) {
    packageJsonUrl = pathToFileURL(packageConfig.pjsonPath);
    const imports = packageConfig.imports;
    if (imports) {
      if (own.call(imports, name) && !name.includes('*')) {
        const resolveResult = resolvePackageTarget(
          packageJsonUrl,
          imports[name],
          '',
          name,
          base,
          false,
          true,
          false,
          conditions
        );
        if (resolveResult !== null && resolveResult !== undefined) {
          return resolveResult
        }
      } else {
        let bestMatch = '';
        let bestMatchSubpath = '';
        const keys = Object.getOwnPropertyNames(imports);
        let i = -1;

        while (++i < keys.length) {
          const key = keys[i];
          const patternIndex = key.indexOf('*');

          if (patternIndex !== -1 && name.startsWith(key.slice(0, -1))) {
            const patternTrailer = key.slice(patternIndex + 1);
            if (
              name.length >= key.length &&
              name.endsWith(patternTrailer) &&
              patternKeyCompare(bestMatch, key) === 1 &&
              key.lastIndexOf('*') === patternIndex
            ) {
              bestMatch = key;
              bestMatchSubpath = name.slice(
                patternIndex,
                name.length - patternTrailer.length
              );
            }
          }
        }

        if (bestMatch) {
          const target = imports[bestMatch];
          const resolveResult = resolvePackageTarget(
            packageJsonUrl,
            target,
            bestMatchSubpath,
            bestMatch,
            base,
            true,
            true,
            false,
            conditions
          );

          if (resolveResult !== null && resolveResult !== undefined) {
            return resolveResult
          }
        }
      }
    }
  }

  throw importNotDefined(name, packageJsonUrl, base)
}

// Note: In Node.js, `getPackageType` is here.
// To prevent a circular dependency, we move it to
// `resolve-get-package-type.js`.

/**
 * @param {string} specifier
 * @param {URL} base
 */
function parsePackageName(specifier, base) {
  let separatorIndex = specifier.indexOf('/');
  let validPackageName = true;
  let isScoped = false;
  if (specifier[0] === '@') {
    isScoped = true;
    if (separatorIndex === -1 || specifier.length === 0) {
      validPackageName = false;
    } else {
      separatorIndex = specifier.indexOf('/', separatorIndex + 1);
    }
  }

  const packageName =
    separatorIndex === -1 ? specifier : specifier.slice(0, separatorIndex);

  // Package name cannot have leading . and cannot have percent-encoding or
  // \\ separators.
  if (invalidPackageNameRegEx.exec(packageName) !== null) {
    validPackageName = false;
  }

  if (!validPackageName) {
    throw new ERR_INVALID_MODULE_SPECIFIER(
      specifier,
      'is not a valid package name',
      fileURLToPath(base)
    )
  }

  const packageSubpath =
    '.' + (separatorIndex === -1 ? '' : specifier.slice(separatorIndex));

  return {packageName, packageSubpath, isScoped}
}

/**
 * @param {string} specifier
 * @param {URL} base
 * @param {Set<string>|undefined} conditions
 * @returns {URL}
 */
function packageResolve(specifier, base, conditions) {
  if (builtinModules.includes(specifier)) {
    return new URL('node:' + specifier)
  }

  const {packageName, packageSubpath, isScoped} = parsePackageName(
    specifier,
    base
  );

  // ResolveSelf
  const packageConfig = getPackageScopeConfig(base);

  // Can’t test.
  /* c8 ignore next 16 */
  if (packageConfig.exists) {
    const packageJsonUrl = pathToFileURL(packageConfig.pjsonPath);
    if (
      packageConfig.name === packageName &&
      packageConfig.exports !== undefined &&
      packageConfig.exports !== null
    ) {
      return packageExportsResolve(
        packageJsonUrl,
        packageSubpath,
        packageConfig,
        base,
        conditions
      )
    }
  }

  let packageJsonUrl = new URL(
    './node_modules/' + packageName + '/package.json',
    base
  );
  let packageJsonPath = fileURLToPath(packageJsonUrl);
  /** @type {string} */
  let lastPath;
  do {
    const stat = tryStatSync(packageJsonPath.slice(0, -13));
    if (!stat.isDirectory()) {
      lastPath = packageJsonPath;
      packageJsonUrl = new URL(
        (isScoped ? '../../../../node_modules/' : '../../../node_modules/') +
          packageName +
          '/package.json',
        packageJsonUrl
      );
      packageJsonPath = fileURLToPath(packageJsonUrl);
      continue
    }

    // Package match.
    const packageConfig = getPackageConfig(packageJsonPath, specifier, base);
    if (packageConfig.exports !== undefined && packageConfig.exports !== null) {
      return packageExportsResolve(
        packageJsonUrl,
        packageSubpath,
        packageConfig,
        base,
        conditions
      )
    }

    if (packageSubpath === '.') {
      return legacyMainResolve(packageJsonUrl, packageConfig, base)
    }

    return new URL(packageSubpath, packageJsonUrl)
    // Cross-platform root check.
  } while (packageJsonPath.length !== lastPath.length)

  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base))
}

/**
 * @param {string} specifier
 * @returns {boolean}
 */
function isRelativeSpecifier(specifier) {
  if (specifier[0] === '.') {
    if (specifier.length === 1 || specifier[1] === '/') return true
    if (
      specifier[1] === '.' &&
      (specifier.length === 2 || specifier[2] === '/')
    ) {
      return true
    }
  }

  return false
}

/**
 * @param {string} specifier
 * @returns {boolean}
 */
function shouldBeTreatedAsRelativeOrAbsolutePath(specifier) {
  if (specifier === '') return false
  if (specifier[0] === '/') return true
  return isRelativeSpecifier(specifier)
}

/**
 * The “Resolver Algorithm Specification” as detailed in the Node docs (which is
 * sync and slightly lower-level than `resolve`).
 *
 * @param {string} specifier
 *   `/example.js`, `./example.js`, `../example.js`, `some-package`, `fs`, etc.
 * @param {URL} base
 *   Full URL (to a file) that `specifier` is resolved relative from.
 * @param {Set<string>} [conditions]
 *   Conditions.
 * @param {boolean} [preserveSymlinks]
 *   Keep symlinks instead of resolving them.
 * @returns {URL}
 *   A URL object to the found thing.
 */
function moduleResolve(specifier, base, conditions, preserveSymlinks) {
  const isRemote = base.protocol === 'http:' || base.protocol === 'https:';
  // Order swapped from spec for minor perf gain.
  // Ok since relative URLs cannot parse as URLs.
  /** @type {URL|undefined} */
  let resolved;

  if (shouldBeTreatedAsRelativeOrAbsolutePath(specifier)) {
    resolved = new URL(specifier, base);
  } else if (!isRemote && specifier[0] === '#') {
    resolved = packageImportsResolve(specifier, base, conditions);
  } else {
    try {
      resolved = new URL(specifier);
    } catch {
      if (!isRemote) {
        resolved = packageResolve(specifier, base, conditions);
      }
    }
  }

  assert(typeof resolved !== 'undefined', 'expected to be defined');

  if (resolved.protocol !== 'file:') {
    return resolved
  }

  return finalizeResolution(resolved, base, preserveSymlinks)
}

/**
 * @param {string} specifier
 * @param {URL|undefined} parsed
 * @param {URL|undefined} parsedParentURL
 */
function checkIfDisallowedImport(specifier, parsed, parsedParentURL) {
  if (
    parsed &&
    parsedParentURL &&
    (parsedParentURL.protocol === 'http:' ||
      parsedParentURL.protocol === 'https:')
  ) {
    if (shouldBeTreatedAsRelativeOrAbsolutePath(specifier)) {
      // Data: and blob: disallowed due to allowing file: access via
      // indirection
      if (
        parsed &&
        parsed.protocol !== 'https:' &&
        parsed.protocol !== 'http:'
      ) {
        throw new ERR_NETWORK_IMPORT_DISALLOWED(
          specifier,
          parsedParentURL,
          'remote imports cannot import from a local location.'
        )
      }

      return {url: parsed.href}
    }

    if (builtinModules.includes(specifier)) {
      throw new ERR_NETWORK_IMPORT_DISALLOWED(
        specifier,
        parsedParentURL,
        'remote imports cannot import from a local location.'
      )
    }

    throw new ERR_NETWORK_IMPORT_DISALLOWED(
      specifier,
      parsedParentURL,
      'only relative and absolute specifiers are supported.'
    )
  }
}

/**
 * @param {URL} url
 */
function throwIfUnsupportedURLProtocol(url) {
  if (
    url.protocol !== 'file:' &&
    url.protocol !== 'data:' &&
    url.protocol !== 'node:'
  ) {
    throw new ERR_UNSUPPORTED_ESM_URL_SCHEME(url)
  }
}

/**
 * @param {URL|undefined} parsed
 * @param {boolean} experimentalNetworkImports
 */
function throwIfUnsupportedURLScheme(parsed, experimentalNetworkImports) {
  if (
    parsed &&
    parsed.protocol !== 'file:' &&
    parsed.protocol !== 'data:' &&
    (!experimentalNetworkImports ||
      (parsed.protocol !== 'https:' && parsed.protocol !== 'http:'))
  ) {
    throw new ERR_UNSUPPORTED_ESM_URL_SCHEME(
      parsed,
      ['file', 'data'].concat(
        experimentalNetworkImports ? ['https', 'http'] : []
      )
    )
  }
}

/**
 * @param {string} specifier
 * @param {{parentURL?: string, conditions?: Array<string>}} context
 * @returns {{url: string, format?: string|null}}
 */
function defaultResolve(specifier, context = {}) {
  const {parentURL} = context;
  assert(typeof parentURL !== 'undefined', 'expected `parentURL` to be defined');

  /** @type {URL|undefined} */
  let parsedParentURL;
  if (parentURL) {
    try {
      parsedParentURL = new URL(parentURL);
    } catch {
      // Ignore exception
    }
  }

  /** @type {URL|undefined} */
  let parsed;
  try {
    parsed = shouldBeTreatedAsRelativeOrAbsolutePath(specifier)
      ? new URL(specifier, parsedParentURL)
      : new URL(specifier);

    if (
      parsed.protocol === 'data:' ||
      (experimentalNetworkImports &&
        (parsed.protocol === 'https:' || parsed.protocol === 'http:'))
    ) {
      return {url: parsed.href, format: null}
    }
  } catch {
    // Ignore exception
  }

  // There are multiple deep branches that can either throw or return; instead
  // of duplicating that deeply nested logic for the possible returns, DRY and
  // check for a return. This seems the least gnarly.
  const maybeReturn = checkIfDisallowedImport(
    specifier,
    parsed,
    parsedParentURL
  );

  if (maybeReturn) return maybeReturn

  // This must come after checkIfDisallowedImport
  if (parsed && parsed.protocol === 'node:') return {url: specifier}

  throwIfUnsupportedURLScheme(parsed, experimentalNetworkImports);

  const conditions = getConditionsSet(context.conditions);

  const url = moduleResolve(specifier, new URL(parentURL), conditions, false);

  throwIfUnsupportedURLProtocol(url);

  return {
    // Do NOT cast `url` to a string: that will work even when there are real
    // problems, silencing them
    url: url.href,
    format: defaultGetFormatWithoutErrors(url, {parentURL})
  }
}

/**
 * @typedef {import('./lib/errors.js').ErrnoException} ErrnoException
 */

/**
 * Match `import.meta.resolve` except that `parent` is required (you can pass
 * `import.meta.url`).
 *
 * @param {string} specifier
 *   The module specifier to resolve relative to parent
 *   (`/example.js`, `./example.js`, `../example.js`, `some-package`, `fs`,
 *   etc).
 * @param {string} parent
 *   The absolute parent module URL to resolve from.
 *   You should pass `import.meta.url` or something else.
 * @returns {string}
 *   Returns a string to a full `file:`, `data:`, or `node:` URL
 *   to the found thing.
 */
function resolve(specifier, parent) {
  if (!parent) {
    throw new Error(
      'Please pass `parent`: `import-meta-resolve` cannot ponyfill that'
    )
  }

  try {
    return defaultResolve(specifier, {parentURL: parent}).url
  } catch (error) {
    const exception = /** @type {ErrnoException} */ (error);

    if (
      exception.code === 'ERR_UNSUPPORTED_DIR_IMPORT' &&
      typeof exception.url === 'string'
    ) {
      return exception.url
    }

    throw error
  }
}

export { moduleResolve, resolve };
