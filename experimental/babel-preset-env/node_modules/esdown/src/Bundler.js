import * as Path from 'path';
import { readFile, writeFile } from './AsyncFS.js';
import { locateModule } from './Locator.js';
import { translate, wrapModule } from './Translator.js';
import { isLegacyScheme, removeScheme, isNodeModule, isPackageSpecifier } from './Specifier.js';

const BUNDLE_INIT =
  'var __M; ' +
  '(function(a) { ' +
    'var list = Array(a.length / 2); ' +

    '__M = function(i, es) { ' +
      'var m = list[i], f, e; ' +
      'if (typeof m === "function") { ' +
        'f = m; ' +
        'm = i ? { exports: {} } : module; ' +
        'f(list[i] = m, m.exports); ' +
        'e = m.exports; ' +
        'm.__es = Object(e) !== e || e.constructor === Object ? e : ' +
          'Object.create(e, { "default": { value: e } }); ' +
      '} ' +
      'return es ? m.__es : m.exports; ' +
    '}; ' +

    'for (var i = 0; i < a.length; i += 2) { ' +
      'var j = Math.abs(a[i]); ' +
      'list[j] = a[i + 1]; ' +
      'if (a[i] >= 0) __M(j); ' +
    '} ' +
  '})';

const BROKEN_LINK = '##broken_link##';

class Node {
  constructor(path, id) {
    this.path = path;
    this.id = id;
    this.edges = new Map;
    this.output = null;
    this.runtime = [];
    this.legacy = false;
    this.importCount = 0;
    this.ignore = false;
  }
}

class GraphBuilder {

  constructor(root, options = {}) {
    this.nodes = new Map();
    this.nextID = 0;
    this.allowBrokenLinks = Boolean(options.allowBrokenLinks);
    this.deep = Boolean(options.deep);
    this.root = this.add(root);
  }

  has(key) {
    return this.nodes.has(key);
  }

  get(key) {
    return this.nodes.get(key);
  }

  add(key) {
    if (this.nodes.has(key))
      return this.nodes.get(key);

    let node = new Node(key, this.nextID++);
    this.nodes.set(key, node);
    return node;
  }

  sort(key = this.root.path) {
    let visited = new Set;
    let list = [];

    let visit = key => {
      if (visited.has(key))
        return;

      visited.add(key);
      let node = this.nodes.get(key);
      node.edges.forEach((node, key) => visit(key));
      list.push(node);
    };

    visit(key);
    return list;
  }

  addEdge(node, spec, fromRequire) {
    let key = spec;
    let legacy = false;
    let ignore = false;

    if (fromRequire) {
      legacy = true;
    } else if (isLegacyScheme(spec)) {
      legacy = true;
      key = removeScheme(spec);
    }

    if (isNodeModule(key) || (!this.deep && isPackageSpecifier(key)))
      ignore = true;

    if (ignore && fromRequire)
      return null;

    if (!ignore) {
      try {
        let pathInfo = locateModule(key, node.base, legacy);
        key = pathInfo.path;
        legacy = pathInfo.legacy;
      } catch (x) {
        if (!this.allowBrokenLinks)
          throw x;

        key = BROKEN_LINK;
        legacy = false;
      }
    }

    let target = this.nodes.get(key);

    if (target) {
      if (target.legacy !== legacy)
        throw new Error(`Module '${ key }' referenced as both legacy and non-legacy`);
    } else {
      target = this.add(key);
      target.legacy = legacy;
      target.ignore = ignore;
    }

    if (!fromRequire)
      target.importCount++;

    node.edges.set(key, target);
    return target;
  }

  process(node, input) {
    if (node.output !== null)
      throw new Error('Node already processed');

    let result = {};

    node.base = Path.dirname(node.path);

    if (Path.extname(node.path) === '.json')
      input = 'module.exports = ' + input + ';';

    node.output = translate(input, {
      identifyModule: path => `__M(${ this.addEdge(node, path, false).id }, 1)`,
      replaceRequire: path => {
        let n = this.addEdge(node, path, true);
        return n ? `__M(${ n.id }, 0)` : null;
      },
      module: !node.legacy,
      functionContext: node.legacy,
      noWrap: true,
      noShebang: true,
      result,
    });

    if (!node.legacy)
      node.output = "'use strict'; " + node.output;

    node.runtime = result.runtime;
  }

}

export function bundle(rootPath, options = {}) {
  rootPath = Path.resolve(rootPath);

  let builder = new GraphBuilder(rootPath, options);
  let visited = new Set;
  let pending = 0;
  let resolver;
  let allFetched;

  allFetched = new Promise((resolve, reject) => resolver = { resolve, reject });

  function visit(node) {
    let path = node.path;

    // Exit if module has already been processed or should be ignored
    if (node.ignore || visited.has(path))
      return;

    visited.add(path);
    pending += 1;

    let content = path === BROKEN_LINK ? '' : readFile(path, { encoding: 'utf8' });

    Promise.resolve(content).then(code => {
      builder.process(node, code);
      node.edges.forEach(visit);
      pending -= 1;
      if (pending === 0)
        resolver.resolve(null);
    }).then(null, err => {
      if (err instanceof SyntaxError && 'sourceText' in err)
        err.filename = path;

      resolver.reject(err);
    });
  }

  visit(builder.root);

  return allFetched.then(() => {
    let runtimeSet = new Set();

    let output = builder.sort().map(node => {
      node.runtime.forEach(name => runtimeSet.add(name));

      let id = node.id;

      if (node.importCount === 0)
        id = -id;

      let init = node.output === null ?
        `function(m) { m.exports = require(${ JSON.stringify(node.path) }) }` :
        `function(module, exports) {\n\n${ node.output }\n\n}`;

      return `${ id }, ${ init }`;
    }).join(',\n');

    output = BUNDLE_INIT + `([\n${ output }]);\n`;

    output = wrapModule(output, [], {
      global: options.global,
      runtime: options.fullRuntime ? true : runtimeSet,
    });

    if (options.output)
      return writeFile(Path.resolve(options.output), output, 'utf8').then(() => '');

    return output;
  });
}
