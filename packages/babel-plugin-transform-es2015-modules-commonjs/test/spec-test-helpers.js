import * as babel from "../../babel-core";
import vm from "vm";

const extraPlugins = [];

function prepareExtraPlugins () {
  try {
    eval("'use strict'; const foo = 'bar'");
  } catch (e) {
    extraPlugins.push(require("../../babel-plugin-transform-es2015-block-scoping"));
  }

  try {
    eval("'use strict'; ({ get () {} })");
  } catch (e) {
    extraPlugins.push(require("../../babel-plugin-transform-es2015-shorthand-properties"));
  }

  try {
    eval("'use strict'; class Foo {}");
  } catch (e) {
    extraPlugins.push(require("../../babel-plugin-transform-es2015-classes"));
  }
}

prepareExtraPlugins();

export class Runner {

  constructor (initialModules) {
    this.modules = {};
    this.cache = {};
    this.babelConfig = {
      "plugins": [
        [require("../"), {spec: true}],
      ].concat(extraPlugins),
      "ast": false,
    };
    this.fallbackRequire = null;

    if (initialModules != null) {
      this.addModules(initialModules);
    }
  }

  addModule (name, code) {
    this.modules[name] = code;
  }

  addModules (dict) {
    for (const key in dict) {
      if (!Object.prototype.hasOwnProperty.call(dict, key)) continue;
      this.addModule(key, dict[key]);
    }
  }

  addToCache (name, context) {
    if (! (context && context.module && "exports" in context.module)) {
      throw new Error("The context to cache must have a module.exports");
    }
    this.cache[name] = context;
  }

  getExportsOf (name) {
    if (! (name in this.cache || name in this.modules)) {
      throw new Error("Unknown module " + name + " requested");
    }
    return this.contextRequire(name);
  }

  transformAndRun (code) {
    return this.transformAndRunInNewContext(code, this.makeContext());
  }

  transformAndRunInNewContext (code, context) {
    code = babel.transform(code, this.babelConfig).code;
    vm.runInNewContext(code, context);

    return context.module.exports;
  }

  makeContext () {
    const context = { module: { exports: {} }, require: this.contextRequire.bind(this) };
    context.exports = context.module.exports;
    return context;
  }

  contextRequire (id) {
    if (id in this.cache) {
      return this.cache[id].module.exports;
    }
    if (id in this.modules) {
      const cache = this.makeContext();
      this.transformAndRunInNewContext(this.modules[id], cache);
      this.cache[id] = cache;
      return cache.module.exports;
    }
    if (this.fallbackRequire) {
      const res = this.fallbackRequire(id);
      if (res) return res;
    }
    throw new Error("Unmocked module " + id + " required");
  }
}

let hasToStringTagResult = null;
export function hasToStringTag () {
  if (hasToStringTagResult != null) {
    return hasToStringTagResult;
  }

  const context = { module: { exports : {} } };
  vm.runInNewContext("module.exports = typeof Symbol === 'function' && Symbol.toStringTag", context);
  hasToStringTagResult = typeof context.module.exports === "symbol";
  return hasToStringTagResult;
}
