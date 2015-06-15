import PluginManager from "./file/plugin-manager";
import normalizeAst from "../helpers/normalize-ast";
import Plugin from "./plugin";
import assign from "lodash/object/assign";
import object from "../helpers/object";
import File from "./file";

export default class Pipeline {
  constructor() {
    this.transformers = object();
    this.namespaces   = object();
    this.deprecated   = object();
    this.aliases      = object();
    this.filters      = [];
  }

  addTransformers(transformers) {
    for (var key in transformers) {
      this.addTransformer(key, transformers[key]);
    }
    return this;
  }

  addTransformer(key, plugin) {
    if (this.transformers[key]) throw new Error(); // todo: error

    var namespace = key.split(".")[0];
    this.namespaces[namespace] = this.namespaces[namespace] || [];
    this.namespaces[namespace].push(key);
    this.namespaces[key] = namespace;

    if (typeof plugin === "function") {
      plugin = PluginManager.memoisePluginContainer(plugin);
      plugin.key = key;
      plugin.metadata.optional = true;
    } else {
      plugin = new Plugin(key, plugin);
    }

    this.transformers[key] = plugin;
  }

  addAliases(names) {
    assign(this.aliases, names);
    return this;
  }

  addDeprecated(names) {
    assign(this.deprecated, names);
    return this;
  }

  addFilter(filter: Function) {
    this.filters.push(filter);
    return this;
  }

  canTransform(plugin, fileOpts) {
    if (plugin.metadata.plugin) {
      return true;
    }

    for (var filter of (this.filters: Array)) {
      var result = filter(plugin, fileOpts);
      if (result != null) return result;
    }

    return true;
  }

  analyze(code: string, opts?: Object = {}) {
    opts.code = false;
    return this.transform(code, opts);
  }

  pretransform(code: string, opts?: Object) {
    var file = new File(opts, this);
    return file.wrap(code, function () {
      file.addCode(code);
      file.parseCode(code);
      return file;
    });
  }

  transform(code: string, opts?: Object) {
    var file = new File(opts, this);
    return file.wrap(code, function () {
      file.addCode(code);
      file.parseCode(code);
      return file.transform();
    });
  }

  transformFromAst(ast, code, opts) {
    ast = normalizeAst(ast);

    var file = new File(opts, this);
    return file.wrap(code, function () {
      file.addCode(code);
      file.addAst(ast);
      return file.transform();
    });
  }

  _ensureTransformerNames(type: string, rawKeys: Array<string>) {
    var keys = [];

    for (var i = 0; i < rawKeys.length; i++) {
      var key = rawKeys[i];

      var deprecatedKey = this.deprecated[key];
      var aliasKey = this.aliases[key];
      if (aliasKey) {
        keys.push(aliasKey);
      } else if (deprecatedKey) {
        // deprecated key, remap it to the new one
        console.error(`[BABEL] The transformer ${key} has been renamed to ${deprecatedKey}`);
        rawKeys.push(deprecatedKey);
      } else if (this.transformers[key]) {
        // valid key
        keys.push(key);
      } else if (this.namespaces[key]) {
        // namespace, append all transformers within this namespace
        keys = keys.concat(this.namespaces[key]);
      } else {
        // invalid key
        throw new ReferenceError(`Unknown transformer ${key} specified in ${type}`);
      }
    }

    return keys;
  }
}
