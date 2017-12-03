// Copyright 2013 Traceur Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
(function(global) {
  'use strict';

  var {
    canonicalizeUrl,
    resolveUrl,
    isAbsolute,
  } = $traceurRuntime;

  var moduleInstantiators = Object.create(null);

  // Until ecmascript defines System.normalize/resolve we follow requirejs
  // for module ids, http://requirejs.org/docs/api.html
  // "default baseURL is the directory that contains the HTML page"
  var baseURL;
  if (global.location && global.location.href)
    baseURL = resolveUrl(global.location.href, './');
  else
    baseURL = '';

  function UncoatedModuleEntry(url, uncoatedModule) {
    this.url = url;
    this.value_ = uncoatedModule;
  }


  function ModuleEvaluationError(erroneousModuleName, cause) {
    this.message =
        this.constructor.name + ': ' + this.stripCause(cause) +
        ' in ' + erroneousModuleName;

    if (!(cause instanceof ModuleEvaluationError) && cause.stack)
      this.stack = this.stripStack(cause.stack);
    else
      this.stack = '';
  }

  ModuleEvaluationError.prototype = Object.create(Error.prototype);

  ModuleEvaluationError.prototype.constructor = ModuleEvaluationError;

  ModuleEvaluationError.prototype.stripError = function(message) {
    return message.replace(/.*Error:/, this.constructor.name + ':');
  };

  ModuleEvaluationError.prototype.stripCause = function(cause) {
    if (!cause)
      return '';
    if (!cause.message)
      return cause + '';
    return this.stripError(cause.message);
  };

  ModuleEvaluationError.prototype.loadedBy = function(moduleName) {
    this.stack += '\n loaded by ' + moduleName;
  };

  ModuleEvaluationError.prototype.stripStack = function(causeStack) {
    var stack = [];
    causeStack.split('\n').some((frame) => {
      if (/UncoatedModuleInstantiator/.test(frame))
        return true;
      stack.push(frame);
    });
    stack[0] = this.stripError(stack[0]);
    return stack.join('\n');
  };

  function beforeLines(lines, number) {
    var result = [];
    var first = number - 3;
    if (first < 0)
      first = 0;
    for (var i = first; i < number; i++) {
      result.push(lines[i]);
    }
    return result;
  }

  function afterLines(lines, number) {
    var last = number + 1;
    if (last > lines.length - 1)
      last = lines.length - 1;
    var result = [];
    for (var i = number; i <= last; i++) {
      result.push(lines[i]);
    }
    return result;
  }

  function columnSpacing(columns) {
    var result = '';
    for (var i = 0; i < columns - 1; i++) {
      result += '-';
    }
    return result;
  }

  function UncoatedModuleInstantiator(url, func) {
    UncoatedModuleEntry.call(this, url, null);
    this.func = func;
  }

  UncoatedModuleInstantiator.prototype =
      Object.create(UncoatedModuleEntry.prototype);

  UncoatedModuleInstantiator.prototype.getUncoatedModule = function() {
    if (this.value_)
      return this.value_;
    try {
      var relativeRequire;
      if (typeof $traceurRuntime !== undefined && $traceurRuntime.require) {
        relativeRequire = $traceurRuntime.require.bind(null, this.url);
      }
      return this.value_ = this.func.call(global, relativeRequire);
    } catch(ex) {
      if (ex instanceof ModuleEvaluationError) {
        ex.loadedBy(this.url);
        throw ex;
      }
      if (ex.stack) {
        // Assume V8 stack format
        var lines = this.func.toString().split('\n')

        var evaled = [];
        ex.stack.split('\n').some((frame, index) => {
          // End when we find ourselves on the stack.
          if (frame.indexOf('UncoatedModuleInstantiator.getUncoatedModule') > 0)
            return true;
          // The angle bracket in the regexp will hit on evaled frames
          // and miss on eg node compiled frames.
          var m = /(at\s[^\s]*\s).*>:(\d*):(\d*)\)/.exec(frame);
          if (m) {
            var line = parseInt(m[2], 10);
            evaled = evaled.concat(beforeLines(lines, line));
            // The first evaled frame should be the one from 'this.func'
            if (index === 1) {
              evaled.push(columnSpacing(m[3]) + '^ ' + this.url);
            } else {
              evaled.push(columnSpacing(m[3]) + '^');
            }
            evaled = evaled.concat(afterLines(lines, line));
            evaled.push('= = = = = = = = =');
          } else {
            evaled.push(frame);
          }
        });
        ex.stack = evaled.join('\n');
      }

      throw new ModuleEvaluationError(this.url, ex);
    }
  };

  function getUncoatedModuleInstantiator(name) {
    if (!name)
      return;
    var url = ModuleStore.normalize(name);
    return moduleInstantiators[url];
  };

  var moduleInstances = Object.create(null);

  var liveModuleSentinel = {};

  function Module(uncoatedModule, isLive = undefined) {
    var coatedModule = Object.create(null);
    Object.getOwnPropertyNames(uncoatedModule).forEach((name) => {
      var getter, value;
      // Module instances acquired using `import * as m from 'name'` should have
      // live references so when we create these internally we pass a sentinel.
      if (isLive === liveModuleSentinel) {
        var descr = Object.getOwnPropertyDescriptor(uncoatedModule, name);
        // Some internal modules do not use getters at this point.
        if (descr.get)
          getter = descr.get;
      }
      if (!getter) {
        value = uncoatedModule[name];
        getter = function() {
          return value;
        };
      }

      Object.defineProperty(coatedModule, name, {
        get: getter,
        enumerable: true
      });
    });
    Object.preventExtensions(coatedModule);
    return coatedModule;
  }

  var ModuleStore = {

    normalize(name, refererName, refererAddress) {
      if (typeof name !== 'string')
          throw new TypeError('module name must be a string, not ' + typeof name);
      if (isAbsolute(name))
        return canonicalizeUrl(name);
      if(/[^\.]\/\.\.\//.test(name)) {
        throw new Error('module name embeds /../: ' + name);
      }
      if (name[0] === '.' && refererName)
        return resolveUrl(refererName, name);
      return canonicalizeUrl(name);
    },

    get(normalizedName) {
      var m = getUncoatedModuleInstantiator(normalizedName);
      if (!m)
        return undefined;
      var moduleInstance = moduleInstances[m.url];
      if (moduleInstance)
        return moduleInstance;

      moduleInstance = Module(m.getUncoatedModule(), liveModuleSentinel);
      return moduleInstances[m.url] = moduleInstance;
    },

    set(normalizedName, module) {
      normalizedName = String(normalizedName);  // Req. by spec., why?
      moduleInstantiators[normalizedName] =
          new UncoatedModuleInstantiator(normalizedName, () => module);
      moduleInstances[normalizedName] = module;
    },

    get baseURL() {
      return baseURL;
    },

    set baseURL(v) {
      baseURL = String(v);
    },

    // -- Non standard extensions to ModuleStore.

    registerModule(name, deps, func) {
      var normalizedName = ModuleStore.normalize(name);
      if (moduleInstantiators[normalizedName])
        throw new Error('duplicate module named ' + normalizedName);
      moduleInstantiators[normalizedName] =
          new UncoatedModuleInstantiator(normalizedName, func);
    },

    bundleStore: Object.create(null),

    register(name, deps, func) {
      if (!deps || !deps.length && !func.length) {
        // Traceur System.register
        this.registerModule(name, deps, func);
      } else {
        // System.register instantiate form
        this.bundleStore[name] = {
          deps: deps,
          execute: function() {
            var depMap = {};
            deps.forEach((dep, index) => depMap[dep] = arguments[index]);

            // TODO: separate into two-phase declaration / execution
            var registryEntry = func.call(this, depMap);

            registryEntry.execute.call(this);

            return registryEntry.exports;
          }
        };
      }
    },

    getAnonymousModule(func) {
      return new Module(func(), liveModuleSentinel);
    },
  };

  var moduleStoreModule = new Module({ModuleStore});
  ModuleStore.set('@traceur/src/runtime/ModuleStore.js', moduleStoreModule);

  // Override setupGlobals so that System is added to future globals.
  var setupGlobals = $traceurRuntime.setupGlobals;
  $traceurRuntime.setupGlobals = function(global) {
    setupGlobals(global);
  };

  $traceurRuntime.ModuleStore = ModuleStore;
  $traceurRuntime.registerModule = ModuleStore.registerModule.bind(ModuleStore);
  $traceurRuntime.getModule = ModuleStore.get;
  $traceurRuntime.setModule = ModuleStore.set;
  $traceurRuntime.normalizeModuleName = ModuleStore.normalize;

})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
