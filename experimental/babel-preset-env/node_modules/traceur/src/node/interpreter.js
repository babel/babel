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
var traceur = require('./traceur.js');
var nodeLoader = require('./nodeLoader.js');

function interpret(filename, options) {
  // Interpret the filename argument as a platform-independent,
  // normalized module name.
  var moduleName = filename.replace(/\\/g, '/');
  var metadata = {
    traceurOptions: options,
    outputName: filename
  };

  System.import(moduleName, {metadata: metadata}).
    catch(function(err) {
      console.error(err.stack || err + '');
      process.exit(1);
    });
}

module.exports = interpret;
