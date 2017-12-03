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

/**
* Nodejs require() adapter for es6 loader
*/

var path;

function relativeRequire(callerPath, requiredPath) {
  // nodejs wants require(path) to load files relative to the directory
  // containing the source of the caller.  If source of the caller is an ES6
  // module, the node parent module path will not be correct. Let's fix that.

  path = path || typeof require !== 'undefined' && require('path');

  function isDirectory(path) {
    return path.slice(-1) === '/';
  }
  function isAbsolute(path) {
    return path[0] === '/';
  }
  function isRelative(path) {
    return path[0] === '.';
  }
  // These guards mimic nodejs Module._findPath
  if (isDirectory(requiredPath) || isAbsolute(requiredPath))
    return;

  return isRelative(requiredPath) ?
      require(path.resolve(path.dirname(callerPath), requiredPath)) :
      require(requiredPath);
}

$traceurRuntime.require = relativeRequire;
