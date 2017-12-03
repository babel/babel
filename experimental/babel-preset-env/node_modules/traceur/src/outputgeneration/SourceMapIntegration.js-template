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

// The official 'source-map' requires a 'define' function that matches the
// CommonJS module specification. Since it only uses a subset of that
// functionality, we cheat here and only provide that minimum subset.

/**
 * @param {Object} mapping Maps between module ids and exports.
 * @param {string} id A module id.
 * @return {Function} A 'define' function that initializes |mapping[id]| with
 *     the exports from |factory|.
 */
function makeDefine(mapping, id) {
  var require = function(id) { return mapping[id]; };
  var exports = mapping[id] = {};
  var module = null; // Unused arg. Included for completeness.
  return function(factory) {
    factory(require, exports, module);
  };
}

var define, m = {};

define = makeDefine(m, './util');
// #include ../../node_modules/source-map/lib/source-map/util.js
define = makeDefine(m, './array-set');
// #include ../../node_modules/source-map/lib/source-map/array-set.js
define = makeDefine(m, './base64');
// #include ../../node_modules/source-map/lib/source-map/base64.js
define = makeDefine(m, './base64-vlq');
// #include ../../node_modules/source-map/lib/source-map/base64-vlq.js
define = makeDefine(m, './binary-search');
// #include ../../node_modules/source-map/lib/source-map/binary-search.js
define = makeDefine(m, './mapping-list');
// #include ../../node_modules/source-map/lib/source-map/mapping-list.js
define = makeDefine(m, './source-map-generator');
// #include ../../node_modules/source-map/lib/source-map/source-map-generator.js
define = makeDefine(m, './source-map-consumer');
// #include ../../node_modules/source-map/lib/source-map/source-map-consumer.js
define = makeDefine(m, './source-node');
// #include ../../node_modules/source-map/lib/source-map/source-node.js

export var SourceMapGenerator = m['./source-map-generator'].SourceMapGenerator;
export var SourceMapConsumer = m['./source-map-consumer'].SourceMapConsumer;
export var SourceNode = m['./source-node'].SourceNode;
export var join = m['./util'].join;
