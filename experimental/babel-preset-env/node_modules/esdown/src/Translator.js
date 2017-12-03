import { Runtime } from './Runtime.js';
import { replaceText } from './Replacer.js';
import { isNodeModule, isLegacyScheme, removeScheme } from './Specifier.js';

const WRAP_CALLEE = '(function(fn, name) { ' +
  // CommonJS:
  'if (typeof exports !== "undefined") { ' +
    'fn(exports, module); ' +
  // DOM global module:
  '} else if (typeof self !== "undefined") { ' +
    'var e = name === "*" ? self : (name ? self[name] = {} : {}); ' +
    'fn(e, { exports: e }); ' +
  '} ' +
'})';

const MODULE_IMPORT = 'function __import(e) { ' +
  'return Object(e) !== e || e.constructor === Object ? e : ' +
    'Object.create(e, { "default": { value: e } }); ' +
'} ';

function wrapRuntime(featureSet) {
  if (!featureSet || featureSet.size === 0) {
    return '';
  }
  // Remove unnecessary features
  let matcher = /(?:^|\n)\/\/\/\/\s(\w+)[\s\S]*?(?=\n\/\/\/\/|$)/g;
  let text = Runtime.API.replace(matcher, (m, m1) => {
    return featureSet === true || featureSet.has(m1) ? m : '';
  });
  // Wrap runtime library in an IIFE, exporting into the _esdown variable
  return 'var _esdown = {}; (function() { var exports = _esdown;\n\n' +
    text +
  '\n\n})();\n\n';
}

export function translate(input, options = {}) {
  let shebang = '';

  // From node/lib/module.js/Module.prototype._compile
  input = input.replace(/^\#\!.*/, m => { shebang = m; return ''; });

  // From node/lib/module.js/stripBOM
  if (input.charCodeAt(0) === 0xFEFF)
    input = input.slice(1);

  // Node modules are wrapped inside of a function expression, which allows
  // return statements
  if (options.functionContext)
    input = '(function(){' + input + '\n})';

  let result = replaceText(input, options);
  let output = result.output;
  let imports = result.imports;

  // Remove function expression wrapper for node-modules
  if (options.functionContext)
    output = output.slice(12, -3);

  // Add esdown-runtime dependency if runtime features are used
  if (!options.runtimeImports && result.runtime.length > 0)
    imports.push({ url: 'esdown-runtime', identifier: '_esdown' });

  if (options.module && !options.noWrap)
    output = "'use strict'; " + wrapModule(output, imports, options);

  // Preserve shebang line for executable scripts
  if (shebang && !options.noShebang)
    output = shebang + output;

  if (options.result) {
    let r = options.result;
    r.input = input;
    r.output = output;
    r.imports = imports;
    r.runtime = result.runtime;
  }

  return output;
}

export function wrapModule(text, imports = [], options = {}) {
  let prefix = '';

  // Leave room for shebang line if necessary
  if (text.startsWith('\n')) {
    prefix = '\n';
    text = text.slice(1);
  }

  let header = '';

  if (imports.length > 0)
    header += MODULE_IMPORT;

  let requires = imports.map(dep => {
    let ident = dep.identifier;
    let url = dep.url;
    let legacy = false;

    if (isLegacyScheme(url)) {
      legacy = true;
      url = removeScheme(url);
    } else if (isNodeModule(url)) {
      legacy = true;
    }

    if (options.runtimeImports && !legacy)
      url += '##ES6';

    return `${ ident } = __import(require(${ JSON.stringify(url) }))`;
  });

  if (requires.length > 0)
    header += 'var ' + requires.join(', ') + '; ';

  header += wrapRuntime(options.runtime);

  if (!options.global || typeof options.global !== 'string')
    return prefix + header + text;

  let name = options.global;

  if (name === '.')
    name = '';

  return prefix + WRAP_CALLEE + '(' +
    'function(exports, module) { ' + header + text + '\n\n}, ' +
    JSON.stringify(name) +
    ');';
}
