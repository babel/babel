/*
 * Copyright 2016 The Closure Compiler Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Gulp task for closure-compiler. Sends multiple input files
 * into the compile method of Closure Compiler. This will yield a single
 * vinyl file as output. Every input file includes contents, path and optional
 * sourcemap.
 */

'use strict';

const PLUGIN_NAME = 'gulp-google-closure-compiler-js';
const DEFAULT_OUTPUT_PATH = 'compiled.js';


/**
 * Convert keys in the form "--foo_bar" or "zing_foo" to "fooBar" or "zingFoo", respectively.
 *
 * @param {string} key to convert
 * @return {string}
 */
function cleanupOptionKey(key) {
  // replace "_foo" with "Foo"
  key = key.replace(/_(\w)/g, match => match[1].toUpperCase());

  // remove leading dashes
  key = key.replace(/^--/, '');

  return key;
}


/**
 * @return {function(Object<string>=, Object<string>=):Object}
 */
module.exports = function() {
  const events = require('events');
  const path = require('path');

  const compile = require('../compile');
  const logger = require('../logger');
  const File = require('vinyl');
  const Transform = require('stream').Transform;

  class CompilationStream extends Transform {
    constructor(compilationOptions, pluginOptions) {
      super({objectMode: true});

      this.compilationOptions_ = compilationOptions;
      this.pluginName_ = pluginOptions.pluginName || PLUGIN_NAME;
      this.logger_ = pluginOptions.logger || (message => console.info(message));

      this.fileList_ = [];
    }

    _transform(file, enc, cb) {
      if (file.isNull()) {
        // Ignore empty files.
      } else if (file.isStream()) {
        this.emit('error', new PluginError(this.pluginName_, 'Streaming not supported'));
      } else {
        this.fileList_.push(file);
      }
      cb();
    }

    _flush(cb) {
      const options = {};
      for (const k in this.compilationOptions_) {
        options[cleanupOptionKey(k)] = this.compilationOptions_[k];
      }
      options.jsCode = (options.jsCode || []).concat(this.fileList_.map(file => {
        return {
          // TODO(samthor): It's not clear we always want to have modules rooted 'here'
          path: path.relative(process.cwd(), file.path),
          src: file.contents.toString(),
          sourceMap: file.sourceMap ? JSON.stringify(file.sourceMap) : undefined,
        };
      }));

      const outputFile = options.jsOutputFile;
      delete options.jsOutputFile;

      const output = compile(options);
      if (logger(options, output, this.logger_)) {
        const message = `Compilation error, ${output.errors.length} errors`;
        this.emit('error', new PluginError(this.pluginName_, message));
      }

      const file = new File({
        path: outputFile || DEFAULT_OUTPUT_PATH,
        contents: new Buffer(output.compiledCode),
      });
      if (output.sourceMap) {
        file.sourceMap = JSON.parse(output.sourceMap);
      }
      this.push(file);

      cb();
    }
  };

  return function(compilationOptions, pluginOptions) {
    return new CompilationStream(compilationOptions || {}, pluginOptions || {});
  };
};

class PluginError {
  constructor(plugin, message) {
    this.plugin = plugin;
    this.message = message;
  }
}
