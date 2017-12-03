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

// This is a terrible, terrible hack that will become redundant once
// https://github.com/google/traceur-compiler/issues/1295 is properly fixed.

var modules = {};
var module = {};
var exports = module.exports = {};
var require = function(id) {
  return modules[id];
};

// #include ../../node_modules/regenerate/regenerate.js
modules['regenerate'] = module.exports || window.regenerate;

// #include ../../node_modules/regjsgen/regjsgen.js
modules['regjsgen'] = {
  generate: exports.generate || window.regjsgen
};

// #include ../../node_modules/regjsparser/parser.js
modules['regjsparser'] = module.exports || window.regjsparser;

modules['./data/iu-mappings.json'] = (
// #include ../../node_modules/regexpu/data/iu-mappings.json
);

// #include ../../node_modules/regexpu/data/character-class-escape-sets.js
modules['./data/character-class-escape-sets.js'] = {
  REGULAR: exports.REGULAR,
  UNICODE: exports.UNICODE,
  UNICODE_IGNORE_CASE: exports.UNICODE_IGNORE_CASE
};

// #include ../../node_modules/regexpu/rewrite-pattern.js
export var regexpuRewritePattern = module.exports;
