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

// Node.js API
//
// This is what you get when you `require('traceur')`.
// It's suppose to be used by custom scripts or tools such as Grunt or Karma.

'use strict';

var path = require('path');
var traceur = require('./traceur.js');

var NodeCompilerModule = require('./NodeCompiler.js');
var NodeCompiler = NodeCompilerModule.NodeCompiler;

var recursiveModuleCompile = require('./recursiveModuleCompile.js');
var compileAllJsFilesInDir = require('./compileAllJsFilesInDir.js');

var Compiler = traceur.Compiler;

function compile(src, options, sourceName, outputName) {
  sourceName = sourceName || '<compile-source>';
  outputName = outputName || '<compile-output>';
  return new NodeCompiler(Compiler.commonJSOptions(options)).
      compile(src, sourceName, outputName);
}

// The absolute path to traceur-runtime.js -- the file that should be executed
// if you want to run Traceur-compiled scripts when the compiler isn't present.
var RUNTIME_PATH = path.join(__dirname, '../../bin/traceur-runtime.js').replace(/\\/g, '/');

// extend traceur module
module.exports = {
  __proto__: traceur,
  recursiveModuleCompileToSingleFile:
      recursiveModuleCompile.recursiveModuleCompileToSingleFile,
  forEachRecursiveModuleCompile:
      recursiveModuleCompile.forEachRecursiveModuleCompile,
  compileAllJsFilesInDir:
    compileAllJsFilesInDir.compileAllJsFilesInDir,
  NodeCompiler: NodeCompiler,
  compile: compile,
  commonJSOptions: Compiler.commonJSOptions,
  amdOptions: Compiler.amdOptions,
  closureOptions: Compiler.closureOptions,
  RUNTIME_PATH: RUNTIME_PATH
};
