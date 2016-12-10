const babel = require("../../babel-core");
const vm = require("vm");

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
}

prepareExtraPlugins();

module.exports.Runner = function Runner (initialModules) {
  if (!(this instanceof Runner)) {
    throw new Error("Runner can only be instantiated");
  }

  this.modules = {};
  this.cache = {};
  this.babelConfig = {
    "plugins": [
      [require("../"), {spec: true}].concat(extraPlugins),
    ],
    "ast": false,
  };

  if (initialModules != null) {
    this.addModules(initialModules);
  }
};

module.exports.Runner.prototype = {
  addModule: function (name, code) {
    this.modules[name] = code;
  },

  addModules: function (dict) {
    for (const key in dict) {
      if (!Object.prototype.hasOwnProperty.call(dict, key)) continue;
      this.addModule(key, dict[key]);
    }
  },

  addToCache: function (name, context) {
    if (! (context && context.module && "exports" in context.module)) {
      throw new Error("The context to cache must have a module.exports");
    }
    this.cache[name] = context;
  },

  getExportsOf: function (name) {
    if (! (name in this.cache || name in this.modules)) {
      throw new Error("Unknown module " + name + " requested");
    }
    return this.contextRequire(name);
  },

  transformAndRun: function (code) {
    return this.transformAndRunInNewContext(code, this.makeContext());
  },

  transformAndRunInNewContext: function (code, context) {
    code = babel.transform(code, this.babelConfig).code;
    vm.runInNewContext(code, context);

    return context.module.exports;
  },

  makeContext: function () {
    const context = { module: { exports: {} }, require: this.contextRequire.bind(this) };
    context.exports = context.module.exports;
    return context;
  },

  contextRequire: function (id) {
    if (id in this.cache) {
      return this.cache[id].module.exports;
    }
    if (id in this.modules) {
      this.cache[id] = this.makeContext();
      this.transformAndRunInNewContext(this.modules[id], this.cache[id]);
      return this.cache[id].module.exports;
    }
    throw new Error("Unmocked module " + id + " required");
  }
};
