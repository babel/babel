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

// Node.js API
//
// This is what you get when you `require('traceur')`.
// It's suppose to be used by custom scripts or tools such as Grunt or Karma.

'use strict';

var path = require('path');
var fs = require('fs');
var util = require('./file-util.js');
var writeFile = util.writeFile;
var traceur = require('./traceur.js');

var Compiler = traceur.Compiler;

function NodeCompiler(options, sourceRoot) {
  sourceRoot = sourceRoot || process.cwd();
  Compiler.call(this, options, sourceRoot);
}

NodeCompiler.prototype = {
  __proto__: Compiler.prototype,

  writeTreeToFile: function(tree, filename) {
    filename = this.normalize(filename);
    var compiledCode = this.write(tree, filename);
    if (this.options_.sourceMaps === 'file') {
      var sourcemap = this.getSourceMap();
      if (sourcemap) {
        var mapName = this.sourceMappingURL(filename);
        // Write the map file next to the output file.
        mapName = path.resolve(path.dirname(filename), mapName);
        writeFile(mapName, sourcemap);
      }
    }

    writeFile(filename, compiledCode);
  },

  compileSingleFile: function(inputFilePath, outputFilePath, errback) {
    inputFilePath = this.normalize(inputFilePath);
    outputFilePath = this.normalize(outputFilePath);
    fs.readFile(inputFilePath, function(err, contents) {
      if (err) {
        errback(err);
        return;
      }

      var parsed = this.parse(contents.toString(), inputFilePath);
      this.writeTreeToFile(this.transform(parsed, inputFilePath),
                           outputFilePath);
    }.bind(this));
  },

  sourceMappingURL: function(filename) {
    if (this.options_.sourceMaps === 'inline') {
      var base64sm = new Buffer(this.getSourceMap()).toString('base64');
      return 'data:application/json;base64,' + base64sm;
    }
    return Compiler.prototype.sourceMappingURL.call(this, filename);
  }
};


module.exports = {
  NodeCompiler: NodeCompiler
};
