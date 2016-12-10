const babel = require("../../babel-core");
const vm = require("vm");

module.exports.Runner = function Runner (initialModules) {
  if (!(this instanceof Runner)) {
    throw new Error("Runner can only be instantiated");
  }

  this.modules = {};
  this.cache = {};

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

  transformAndRun: function (code) {
    return this.transformAndRunInNewContext(code, this.makeContext());
  },

  transformAndRunInNewContext: function (code, context) {
    code = babel.transform(code, {
      "plugins": [
        [require("../"), {spec: true}],
      ],
      "ast": false,
    }).code;
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
