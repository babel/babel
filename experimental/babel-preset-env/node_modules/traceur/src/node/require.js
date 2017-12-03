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

'use strict';

var fs = require('fs');
var Module = require('module');
var traceurAPI = require('./api.js');

var ext = '.traceur-compiled';

Module._extensions[ext] = function(module, filename) {
  module.filename = filename.slice(0, -ext.length);
  module._compile(module.compiledCode, module.filename);
};

function compile(filename, options) {
  var contents = fs.readFileSync(filename, 'utf-8');
  options = options || {};
  options.moduleName = filename;
  return traceurAPI.compile(contents, options, filename);
}

function traceurRequire(filename) {
  filename = require.resolve(filename);
  var source = compile(filename);
  var module = new Module(filename, require.main);
  module.compiledCode = source;
  module.load(filename + ext);
  return module.exports;
}

var filters = [];
var originalRequireJs = Module._extensions['.js'];

function shouldCompile(filename) {
  if (filters.length === 0)
    return true;
  for (var i = 0; i < filters.length; i++) {
    if (filters[i].call(null, filename))
      return true;
  }
  return false;
}

traceurRequire.nodeRequire = require;

traceurRequire.makeDefault = function(filter, options) {
  if (!filter)
    filters = [];
  else
    filters.push(filter);

  Module._extensions['.js'] = function(module, filename) {
    if (shouldCompile(filename)) {
      var source = compile(filename, options);
      return module._compile(source, filename);
    }
    return originalRequireJs(module, filename);
  };
};

module.exports = traceurRequire;
