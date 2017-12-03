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

import {
  AttachModuleNameTransformer
} from './codegeneration/module/AttachModuleNameTransformer.js';
import {FromOptionsTransformer} from './codegeneration/FromOptionsTransformer.js';
import {Parser} from './syntax/Parser.js';
import {PureES6Transformer} from './codegeneration/PureES6Transformer.js';
import {SourceFile} from './syntax/SourceFile.js';
import {CollectingErrorReporter} from './util/CollectingErrorReporter.js';
import {Options, versionLockedOptions} from './Options.js';
import {ParseTreeMapWriter} from './outputgeneration/ParseTreeMapWriter.js';
import {ParseTreeWriter} from './outputgeneration/ParseTreeWriter.js';
import {
  SourceMapConsumer,
  SourceMapGenerator
} from './outputgeneration/SourceMapIntegration.js';

function merge(...srcs) {
  let dest = Object.create(null);
  srcs.forEach((src) => {
    Object.keys(src).forEach((key) => {
      dest[key] = src[key];
    });
    let srcModules = src.modules;  // modules is a getter on prototype
    if (typeof srcModules !== 'undefined') {
      dest.modules = srcModules;
    }

  });
  return dest;
}

function basePath(name) {
  if (!name)
    return null;
  let lastSlash = name.lastIndexOf('/');
  if (lastSlash < 0)
    return null;
  return name.substring(0, lastSlash + 1);
}

/**
 * Synchronous source to source compiler using default values for options.
 * @param {Options=} overridingOptions
 */
export class Compiler {
  constructor(overridingOptions = {}) {
    this.options_ = new Options(this.defaultOptions());
    this.options_.setFromObject(overridingOptions);
    // Only used if this.options_.sourceMaps is set.
    this.sourceMapConfiguration_ = null;
    // Only used if this.options_sourceMaps = 'memory'.
    this.sourceMapInfo_ = null;
    // Used to cache source map calculation
    this.sourceMapCache_ = null;
  }
  /**
   * Use Traceur to compile ES6 type=script source code to ES5 script.
   *
   * @param  {string} content ES6 source code.
   * @param  {Object=} options Traceur options to override defaults.
   * @return {Promise<{js: string, errors: Array, sourceMap: string}>} Transpiled code.
   */
  static script(content, options = {}) {
    options = new Options(options);  // fresh copy, don't write on argument.
    options.script = true;
    return new Compiler(options).compile(content);
  }
  /**
   * Use Traceur to compile ES6 module source code to 'bootstrap' module format.
   *
   * @param  {string} content ES6 source code.
   * @param  {Object=} options Traceur options to override defaults.
   * @return {Promise<{js: string, errors: Array, sourceMap: string}>} Transpiled code.
   */
  static module(content, options = {}) {
    options = new Options(options);  // fresh copy, don't write on argument.
    options.modules = 'bootstrap';
    return new Compiler(options).compile(content);
  }
  /**
   * Options to create 'amd' module format.
   *
   * @param  {Object=} options Traceur options to override defaults.
   * @return {Object}
   */
  static amdOptions(options = {}) {
    let amdOptions = {
      modules: 'amd',
      sourceMaps: false,
      moduleName: false
    };
    return merge(amdOptions, options);
  }
  /**
   * Options to create 'goog'/Closure module format.
   *
   * @param  {Object=} options Traceur options to override defaults.
   * @return {Object}
   */
  static closureOptions(options = {}) {
    let closureOptions = {
      modules: 'closure',
      sourceMaps: false,
      moduleName: true
    };
    return merge(closureOptions, options);
  }
  /**
   * Options to create 'commonjs' module format.
   *
   * @param  {Object=} options Traceur options to override defaults.
   * @return {Object}
   */
  static commonJSOptions(options = {}) {
    let commonjsOptions = {
      modules: 'commonjs',
      sourceMaps: false,
      moduleName: false
    };
    return merge(commonjsOptions, options);
  }

  /**
   * Compile ES6 source code with Traceur.
   *
   * @param {string} content ES6 source code.
   * @param {string} sourceName
   * @param {string} outputName
   * @param {string} sourceRoot defaults to dir of outputName
   * @return {string} equivalent ES5 source.
   */
  compile(content, sourceName = '<compileSource>',
      outputName = '<compileOutput>', sourceRoot = undefined) {

    sourceName = this.normalize(sourceName);
    outputName = this.normalize(outputName);
    let tree = this.parse(content, sourceName);
    tree = this.transform(tree, sourceName);
    // Attach the sourceURL only if the input and output names differ.
    let sourceURL = sourceName !== outputName ? sourceName : undefined;
    // The sourceRoot argument takes precidence over the option.
    if (sourceRoot === undefined)
      sourceRoot = this.options_.sourceRoot;

    return this.write(tree, outputName, sourceRoot, sourceURL);
  }

  throwIfErrors(errorReporter) {
    if (errorReporter.hadError())
      throw errorReporter.toError();
  }

  /**
   * @param {string} content to be compiled.
   * @param {string} sourceName inserted into sourceMaps
   * @return {ParseTree}
   */
  parse(content, sourceName = '<compiler-parse-input>') {
    sourceName = this.normalize(sourceName);
    this.sourceMapCache_ = null;
    this.sourceMapConfiguration_ = null;

    let errorReporter = new CollectingErrorReporter();
    let sourceFile = new SourceFile(sourceName, content);
    let parser = new Parser(sourceFile, errorReporter, this.options_);
    let tree =
        this.options_.script ? parser.parseScript() : parser.parseModule();
    this.throwIfErrors(errorReporter);

    return tree;
  }

  /**
   * Apply transformations selected by options to tree.
   * @param {ParseTree} tree
   * @param {string} candidateModuleName used as the moduleName iff the
   *    moduleName option is set true
   * @return {ParseTree}
   */
  transform(tree, candidateModuleName = undefined, metadata = undefined) {

    let transformer;
    if (candidateModuleName) {
      let transformer = new AttachModuleNameTransformer(candidateModuleName);
      tree = transformer.transformAny(tree);
    }

    let errorReporter = new CollectingErrorReporter();

    if (this.options_.outputLanguage.toLowerCase() === 'es6') {
      transformer = new PureES6Transformer(errorReporter, this.options_, metadata);
    } else {
      transformer = new FromOptionsTransformer(errorReporter, this.options_);
    }

    let transformedTree = transformer.transform(tree);
    this.throwIfErrors(errorReporter);
    return transformedTree;
  }

  createSourceMapConfiguration_(outputName, sourceRoot = undefined,
      sourceURL = undefined) {
    if (this.options_.sourceMaps) {
      return {
        sourceMapGenerator: new SourceMapGenerator({
          file: outputName,
          sourceRoot: sourceRoot,
          skipValidation: true
        }),
        basepath: basePath(outputName),
        inputSourceMap: this.options_.inputSourceMap,
        sourceURL: sourceURL,
        outputName: outputName
      };
    }
  }

  getSourceMap() {
    if (this.sourceMapCache_) {
      return this.sourceMapCache_;
    }

    if (this.sourceMapConfiguration_) {
      let sourceMap = this.sourceMapConfiguration_.sourceMapGenerator.toString();
      let inputSourceMap = this.sourceMapConfiguration_.inputSourceMap;
      if (inputSourceMap) {
        let generator = SourceMapGenerator.fromSourceMap(
            new SourceMapConsumer(sourceMap));
        generator.applySourceMap(new SourceMapConsumer(inputSourceMap));
        sourceMap = generator.toJSON();
      }
      this.sourceMapCache_ = sourceMap;
      return sourceMap;
    }
  }

  get sourceMapInfo() {
    if (!this.sourceMapInfo_ && this.sourceMapConfiguration_) {
      let sourceMap = this.getSourceMap();
      // The source map info for in-memory maps
      this.sourceMapInfo_ = {
        url: this.sourceMapConfiguration_.sourceURL,
        outputName: this.sourceMapConfiguration_.outputName,
        map: sourceMap
      };
    }
    return this.sourceMapInfo_;
  }

  /**
   * Produce output source from tree.
   * @param {ParseTree} tree
   * @param {string} outputName used for sourceMap URL and default sourceRoot.
   * @param {string} sourceRoot base for sourceMap sources
   * @param {string} sourceURL value for sourceURL
   * @return {string}
   */
  write(tree, outputName = undefined, sourceRoot = undefined,
      sourceURL = undefined) {
    outputName = this.normalize(outputName);

    if (sourceRoot === undefined)
      sourceRoot = this.options_.sourceRoot;

    if (sourceRoot === true)
      sourceRoot = basePath(outputName);
    else if (!sourceRoot) // false or '' or undefined
      sourceRoot = undefined;
    else
      sourceRoot = this.normalize(sourceRoot);

    let writer;
    this.sourceMapCache_ = null;
    this.sourceMapConfiguration_ =
        this.createSourceMapConfiguration_(outputName, sourceRoot, sourceURL);
    if (this.sourceMapConfiguration_) {
      this.sourceMapConfiguration_.lowResolution =
          this.options_.lowResolutionSourceMap;
      writer =
          new ParseTreeMapWriter(this.sourceMapConfiguration_, this.options_);
    } else {
      writer = new ParseTreeWriter(this.options_);
    }

    writer.visitAny(tree);

    let compiledCode = writer.toString();

    let link = this.debuggerLink(sourceURL, outputName);
    if (link) {
      compiledCode += link;
    }

    return compiledCode;
  }

  debuggerLink(sourceURL, outputName) {
    if (this.sourceMapConfiguration_) {
      if (this.options_.sourceMaps === 'memory') {
        return;
      }
      let sourceMappingURL =
         this.sourceMappingURL(sourceURL || outputName || 'unnamed.js');
      return '//# sourceMappingURL=' + sourceMappingURL + '\n';
    } else {
      if (sourceURL) {
        return '//# sourceURL=' + sourceURL + '\n';
      }
    }
  }

  sourceName(filename) {
    return filename;
  }

  sourceMappingURL(path) {
    // This implementation works for browsers. The NodeCompiler overrides
    // to use nodejs functions.
    if (this.options_.sourceMaps === 'inline') {
      if (Reflect.global.btoa) {
        return 'data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(this.getSourceMap())));
      }
    }
    path = path || 'unamed.js';
    path = path.split('/').pop();
    return path + '.map';
  }

  sourceNameFromTree(tree) {
    return tree.location.start.source.name;
  }

  defaultOptions() {
    return versionLockedOptions;
  }

  normalize(name) {
    return name && name.replace(/\\/g,'/');
  }
}
