// Copyright 2014 Traceur Authors.
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

import {assert} from '../util/assert.js';
import {LoaderCompiler} from './LoaderCompiler.js';
import {ExportsList} from '../codegeneration/module/ModuleSymbol.js';
import {isAbsolute, resolveUrl} from '../util/url.js';
import {Options} from '../Options.js';

var NOT_STARTED = 0;
var LOADING = 1;
var LOADED = 2;
var PARSED = 3;
var TRANSFORMING = 4
var TRANSFORMED = 5;
var COMPLETE = 6;
var ERROR = 7;

function mapToValues(map) {
  // We are having issues with cross frame/context symbols so we cannot use
  // iterators here.
  // https://github.com/google/traceur-compiler/issues/1152
  var array = [];
  map.forEach((v) => {
    array.push(v);
  });
  return array;
}

class LoaderError extends Error {
  constructor(msg, tree) {
    super();
    this.message = msg;
    this.tree = tree;
    this.name = 'LoaderError';
  }
}

/**
 * Base class representing a piece of code that is to be loaded or evaluated.
 * Similar to js-loader Load object
 */
class CodeUnit {
  /**
   * @param {LoaderCompiler} loaderCompiler Callbacks for parsing/transforming.
   * @param {string} normalizedName The normalized name of this dependency.
   * @param {string} type Either 'script' or 'module'. This determinse how to
   *     parse the code.
   * @param {number} state
   */
  constructor(loaderCompiler, normalizedName, type, state,
      name, referrerName, address) {
    this.promise = new Promise((res, rej) => {
      this.loaderCompiler = loaderCompiler;
      this.normalizedName = normalizedName;
      this.type = type;
      this.name_ = name;
      this.referrerName_ = referrerName;
      this.address = address;
      this.state_ = state || NOT_STARTED;
      this.error = null;
      this.result = null;
      this.metadata_ = {};
      this.dependencies = [];
      this.resolve = res;
      this.reject = rej;
    });
  }

  get state() {
    return this.state_;
  }

  set state(value) {
    if (value < this.state_) {
      throw new Error('Invalid state change');
    }
    this.state_ = value;
  }

  /**
   * @return opaque value set and used by loaderCompiler
   */
  get metadata() {
    return this.metadata_;
  }

  set metadata(value) {
    assert(value);
    this.metadata_ = value;
  }

  nameTrace() {
    var trace = this.specifiedAs();
    if (isAbsolute(this.name_)) {
      return trace + 'An absolute name.\n';
    }
    if (this.referrerName_) {
      return trace + this.importedBy() + this.normalizesTo();
    }
    return trace + this.normalizesTo();
  }

  specifiedAs() {
    return `Specified as ${this.name_}.\n`;
  }

  importedBy() {
    return `Imported by ${this.referrerName_}.\n`;
  }

  normalizesTo() {
    return 'Normalizes to ' + this.normalizedName + '\n';
  }

}

/**
 * CodeUnit coming from {@code Loader.set}.
 */
class PreCompiledCodeUnit extends CodeUnit {
  constructor(loaderCompiler, normalizedName, name, referrerName, address,
      module) {
    super(loaderCompiler, normalizedName, 'module', COMPLETE,
        name, referrerName, address);
    this.result = module;
    this.resolve(this.result);
  }
}

/**
 * CodeUnit coming from {@code Loader.register}.
 */
class BundledCodeUnit extends CodeUnit {
  constructor(loaderCompiler, normalizedName, name, referrerName, address,
      deps, execute, setModule) {
    super(loaderCompiler, normalizedName, 'module', TRANSFORMED,
        name, referrerName, address);
    this.deps = deps;
    this.execute = execute;
  }
  getModuleSpecifiers() {
    return this.deps;
  }
  evaluate() {
    var normalizedNames =
        this.deps.map((name) => this.loader_.normalize(name));
    var module = this.execute.apply(Reflect.global, normalizedNames);
    setModule(this.normalizedName, module);
    return module;
  }
}

/**
 * CodeUnit for sharing methods that just call back to loaderCompiler
 */
class HookedCodeUnit extends CodeUnit {
  getModuleSpecifiers() {
    return this.loaderCompiler.getModuleSpecifiers(this);
  }
  evaluate() {
    return this.loaderCompiler.evaluateCodeUnit(this);
  }
}

/**
 * CodeUnit used for {@code Loader.load}.
 */
class LoadCodeUnit extends HookedCodeUnit {
  /**
   * @param {InternalLoader} loader
   * @param {string} normalizedName
   */
  constructor(loaderCompiler, normalizedName, name, referrerName, address) {
    super(loaderCompiler, normalizedName, 'module', NOT_STARTED,
        name, referrerName, address);
  }
}

/**
 * CodeUnit used for {@code Loader.eval} and {@code Loader.module}.
 */
class EvalCodeUnit extends HookedCodeUnit {
  /**
   * @param {LoaderCompiler} loaderCompiler
   * @param {string} code
   * @param {string} caller script or module name
   */
  constructor(loaderCompiler, code, type = 'script',
      normalizedName, referrerName, address) {
    super(loaderCompiler, normalizedName, type,
        LOADED, null, referrerName, address);
    this.source = code;
  }
}

var uniqueNameCount = 0;

/**
 * The internal implementation of the code loader.
 */
export class InternalLoader {
  /**
   * @param {loaderCompiler} loaderCompiler
   */
  constructor(loader, loaderCompiler) {
    assert(loaderCompiler);

    this.loader_ = loader;
    this.loaderCompiler = loaderCompiler;
    this.cache = new Map();
    this.urlToKey = Object.create(null);
    this.sync_ = false;
    this.sourceMapsByURL_ = Object.create(null);
    this.sourceMapsByOutputName_ = Object.create(null);
  }

  defaultMetadata_(metadata = {}) {
    let incoming = metadata.traceurOptions;
    if (incoming  && !(incoming instanceof Options)) {
      var unknown = Options.listUnknownOptions(incoming);
      if (unknown.length) {
        console.warn('Unknown metadata.traceurOptions ignored: ' +
            unknown.join(','));
      }
    }
    metadata.traceurOptions = incoming || new Options();
    return metadata;
  }

  defaultModuleMetadata_(metadata = {}) {
    var metadata = this.defaultMetadata_(metadata);
    metadata.traceurOptions.script = false;
    return metadata;
  }

  getSourceMap(url) {
    // The caller may want the sourcemap from input to output or vice versa.
    return this.sourceMapsByURL_[url] || this.sourceMapsByOutputName_[url];
  }

  load(name, referrerName = this.loader_.baseURL,
      address, metadata = {}) {
    metadata = this.defaultMetadata_(metadata);
    var codeUnit = this.getOrCreateCodeUnit_(name, referrerName, address, metadata);
    this.load_(codeUnit);
    return codeUnit.promise.then(() => codeUnit);
  }

  load_(codeUnit) {
    if (codeUnit.state === ERROR) {
      return codeUnit;
    }

    if (codeUnit.state === TRANSFORMED) {
      this.handleCodeUnitLoaded(codeUnit)
    } else {
      if (codeUnit.state !== NOT_STARTED)
        return codeUnit;

      codeUnit.state = LOADING;
      codeUnit.address = this.loader_.locate(codeUnit);

      this.loader_.fetch(codeUnit).then((text) => {
        codeUnit.source = text;
        return codeUnit;
      }).
      then((load) => {
        return this.loader_.translate(load)
      }).
      then((source) => {
        codeUnit.source = source;
        codeUnit.state = LOADED;
        this.handleCodeUnitLoaded(codeUnit);
        return codeUnit;
      }).
      catch((err) => {
        try {
          codeUnit.state = ERROR;
          codeUnit.error = err;
          this.handleCodeUnitLoadError(codeUnit);
        } catch (ex) {
          console.error('Internal Error ' + (ex.stack || ex));
        }
      });
    }

    return codeUnit;
  }

  module(code, referrerName, address, metadata) {
    var codeUnit = new EvalCodeUnit(this.loaderCompiler, code, 'module',
                                      null, referrerName, address);
    codeUnit.metadata = this.defaultMetadata_(metadata);
    this.cache.set({}, codeUnit);
    this.handleCodeUnitLoaded(codeUnit);
    return codeUnit.promise;
  }

  define(normalizedName, code, address, metadata) {
    var codeUnit = new EvalCodeUnit(this.loaderCompiler, code, 'module',
                                    normalizedName, null, address);
    var key = this.getKey(normalizedName, 'module');
    codeUnit.metadata = this.defaultMetadata_(metadata);
    this.cache.set(key, codeUnit);
    this.handleCodeUnitLoaded(codeUnit);
    return codeUnit.promise;
  }

  /**
   * @param {string} code, source to be compiled as 'Script'
   * @param {string=} name,  ModuleSpecifier-like name, not normalized.
   * @param {string=} referrerName,  normalized name of container
   * @param {string=} address, URL
   */
  script(code, name, referrerName, address, metadata) {
    var normalizedName = this.loader_.normalize(name || '', referrerName, address);
    var codeUnit = new EvalCodeUnit(this.loaderCompiler, code, 'script',
                                    normalizedName, referrerName, address);
    var key = {};
    if (name)
      key = this.getKey(normalizedName, 'script');
    codeUnit.metadata = this.defaultMetadata_(metadata);
    this.cache.set(key, codeUnit);
    this.handleCodeUnitLoaded(codeUnit);
    return codeUnit.promise;
  }

  getKey(url, type) {
    var combined = type + ':' + url;
    if (combined in this.urlToKey) {
      return this.urlToKey[combined];
    }

    return this.urlToKey[combined] = {};
  }

  getCodeUnit_(normalizedName, type) {
    var key = this.getKey(normalizedName, type);
    var codeUnit = this.cache.get(key);
    return {key, codeUnit};
  }

  getOrCreateCodeUnit_(name, referrerName, address, metadata) {
    var normalizedName = this.loader_.normalize(name, referrerName, address);
    // TODO(jjb): embed type in name per es-discuss Yehuda Katz,
    // eg import 'name,script';
    var type = 'module';
    if (metadata && metadata.traceurOptions && metadata.traceurOptions.script)
      type = 'script';
    var {key, codeUnit} = this.getCodeUnit_(normalizedName, type);

    if (!codeUnit) {
      // All new code units need metadata set.
      assert(metadata && metadata.traceurOptions);
      var module = this.loader_.get(normalizedName);
      if (module) {
        codeUnit = new PreCompiledCodeUnit(this.loaderCompiler, normalizedName,
            name, referrerName, address, module);
        codeUnit.type = 'module';
      } else {
        codeUnit = new LoadCodeUnit(this.loaderCompiler, normalizedName,
            name, referrerName, address);
        codeUnit.type = type;
      }
      // We copy the incoming metadata to pass values from the API and to
      // inherit value from the API call into modules imported by the root.
      // But we don't want to inherit tree etc.
      // TODO(jjb): move this into the CodeUnit constructors.
      codeUnit.metadata = {
        traceurOptions: metadata.traceurOptions,
        outputName: metadata.outputName,
        rootModule: metadata.rootModule
      };
      this.cache.set(key, codeUnit);
    }
    return codeUnit;
  }

  areAll(state) {
    return mapToValues(this.cache).every((codeUnit) => codeUnit.state >= state);
  }

  getCodeUnitForModuleSpecifier(name, referrerName) {
    var normalizedName = this.loader_.normalize(name, referrerName);
    return this.getCodeUnit_(normalizedName, 'module').codeUnit;
  }

  getExportsListForModuleSpecifier(name, referrer) {
    var codeUnit = this.getCodeUnitForModuleSpecifier(name, referrer);
    var exportsList = codeUnit.metadata.moduleSymbol;
    if (!exportsList) {
      if (codeUnit.result) {
        exportsList =
            new ExportsList(codeUnit.normalizedName);
        exportsList.addExportsFromModule(codeUnit.result);
      } else {
        throw new Error(
            `InternalError: ${name} is not a module, required by ${referrer}`);
      }
    }
    return exportsList;
  }

  /**
   * This is called when a codeUnit is loaded.
   * @param {CodeUnit} codeUnit
   */
  handleCodeUnitLoaded(codeUnit) {
    var referrerName = codeUnit.normalizedName;
    try {
      var moduleSpecifiers = codeUnit.getModuleSpecifiers();
      codeUnit.state = PARSED;

      if (!moduleSpecifiers) {
        this.abortAll(`No module specifiers in ${referrerName}`);
        return;
      }
      codeUnit.dependencies = moduleSpecifiers.map((name) => {
        return this.getOrCreateCodeUnit_(name, referrerName, null,
            this.defaultModuleMetadata_(codeUnit.metadata));
      });
    } catch (error) {
      this.rejectOneAndAll(codeUnit, error);
      return;
    }
    codeUnit.dependencies.forEach((dependency) => {
      this.load_(dependency);
    });

    if (this.areAll(PARSED)) {
      try {
        // Currently analyze is only needed for module dependencies.
        if (codeUnit.type === 'module')
          this.analyze();
        this.transform();
        this.evaluate();
      } catch (error) {
        this.rejectOneAndAll(codeUnit, error);
      }
    }
  }

  rejectOneAndAll(codeUnit, error) {
    codeUnit.state.ERROR;
    codeUnit.error = error;
    codeUnit.reject(error);
    // TODO(jjb): reject the other codeUnits with a distinct error.
    this.abortAll(error);
  }

  /**
   * This is called when a code unit failed to load.
   * @param {CodeUnit} codeUnit
   */
  handleCodeUnitLoadError(codeUnit) {
    var message = codeUnit.error ? String(codeUnit.error) + '\n' :
        `Failed to load '${codeUnit.address}'.\n`;
    message += codeUnit.nameTrace() + this.loader_.nameTrace(codeUnit);

    this.rejectOneAndAll(codeUnit, new Error(message));
  }

  /**
   * Aborts all loading code units.
   */
  abortAll(errorMessage) {
    // Notify all codeUnit listeners (else tests hang til timeout).
    this.cache.forEach((codeUnit) => {
      if (codeUnit.state !== ERROR)
        codeUnit.reject(errorMessage);
    });
  }

  analyze() {
    this.loaderCompiler.analyzeDependencies(mapToValues(this.cache), this);
  }

  transform() {
    this.transformDependencies_(mapToValues(this.cache));
  }

  transformDependencies_(dependencies, dependentName) {
    for (var i = 0; i < dependencies.length; i++) {
      var codeUnit = dependencies[i];
      if (codeUnit.state >= TRANSFORMED) {
        continue;
      }
      if (codeUnit.state === TRANSFORMING) {
        var cir = codeUnit.normalizedName;
        var cle = dependentName;
        this.rejectOneAndAll(codeUnit, new Error(
            `Unsupported circular dependency between ${cir} and ${cle}`));
        return;
      }
      codeUnit.state = TRANSFORMING;
      try {
        this.transformCodeUnit_(codeUnit);
      } catch(error) {
        this.rejectOneAndAll(codeUnit, error);
        return;
      }
    }
  }

  transformCodeUnit_(codeUnit) {
    this.transformDependencies_(codeUnit.dependencies, codeUnit.normalizedName);
    if (codeUnit.state === ERROR)
      return;

    this.loaderCompiler.transform(codeUnit);
    codeUnit.state = TRANSFORMED;
    this.loaderCompiler.write(codeUnit);
    var info = codeUnit.metadata.compiler.sourceMapInfo;
    if (info) {
      this.sourceMapsByURL_[info.url] = info.map;
      this.sourceMapsByOutputName_[info.outputName] = info.map;
    }
    this.loader_.instantiate(codeUnit);
  }

  orderDependencies() {
    // Order the dependencies.
    var visited = new Map();
    var ordered = [];
    function orderCodeUnits(codeUnit) {
      // Cyclic dependency.
      if (visited.has(codeUnit)) {
        return;
      }

      visited.set(codeUnit, true);
      codeUnit.dependencies.forEach(orderCodeUnits);
      ordered.push(codeUnit);
    }

    this.cache.forEach(orderCodeUnits);

    return ordered;
  }

  evaluate() {
    var dependencies = this.orderDependencies();

    for (var i = 0; i < dependencies.length; i++) {
      var codeUnit = dependencies[i];
      if (codeUnit.state >= COMPLETE) {
        continue;
      }

      var result;
      try {
        result = codeUnit.evaluate();
      } catch (ex) {
        this.rejectOneAndAll(codeUnit, ex);
        return;
      }

      codeUnit.result = result;
      codeUnit.source = null;
    }

    for (var i = 0; i < dependencies.length; i++) {
      var codeUnit = dependencies[i];
      if (codeUnit.state >= COMPLETE) {
        continue;
      }
      codeUnit.state = COMPLETE;
      codeUnit.resolve(codeUnit.result);
    }
  }

}

export var internals = {
  CodeUnit,
  EvalCodeUnit,
  LoadCodeUnit,
  LoaderCompiler
};
