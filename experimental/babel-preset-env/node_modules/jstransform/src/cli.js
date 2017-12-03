/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var assign = require('object-assign');
var transform = require('./simple').transform;

require('commoner').version(
  require('../package.json').version
).resolve(function(id) {
  return this.readModuleP(id);
}).option(
  '--react',
  'Turns on the React JSX and React displayName transforms'
).option(
  '--es6',
  'Turns on available ES6 transforms'
).option(
  '--es7',
  'Turns on available ES7 transforms'
).option(
  '--harmony',
  'Shorthand to enable all ES6 and ES7 transforms'
).option(
  '--utility',
  'Turns on available utility transforms'
).option(
  '--target [version]',
  'Specify your target version of ECMAScript. Valid values are "es3" and ' +
  '"es5". The default is "es5". "es3" will avoid uses of defineProperty and ' +
  'will quote reserved words. WARNING: "es5" is not properly supported, even ' +
  'with the use of es5shim, es5sham. If you need to support IE8, use "es3".',
  'es5'
).option(
  '--strip-types',
  'Strips out type annotations.'
).option(
  '--es6module',
  'Parses the file as a valid ES6 module. ' +
  '(Note that this means implicit strict mode)'
).option(
  '--non-strict-es6module',
  'Parses the file as an ES6 module, except disables implicit strict-mode. ' +
  '(This is useful if you\'re porting non-ES6 modules to ES6, but haven\'t ' +
  'yet verified that they are strict-mode safe yet)'
).option(
  '--source-map-inline',
  'Embed inline sourcemap in transformed source'
).option(
  '--source-filename',
  'Filename to use when generating the inline sourcemap. Will default to ' +
  'filename when processing files'
).process(function(id, source) {
  // This is where JSX, ES6, etc. desugaring happens.
  // We don't do any pre-processing of options so that the command line and the
  // JS API both expose the same set of options. We will set the sourceFilename
  // to something more correct than "source.js".
  var options;
  if (id !== '<stdin>') {
    options = assign({sourceFilename: id + '.js'}, this.options);
  } else {
    options = this.options;
  }
  var result = transform(source, options);
  return result.code;
});

