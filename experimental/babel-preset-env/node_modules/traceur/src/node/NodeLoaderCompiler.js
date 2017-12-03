// Copyright 2015 Traceur Authors.
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

import {LoaderCompiler} from '../loader/LoaderCompiler.js';

export class NodeLoaderCompiler extends LoaderCompiler {
  constructor() {
    super();
    this.sourceMapsInMemory_ = false;
  }

  evaluateCodeUnit(codeUnit) {
    // We cannot move these to file scope since this file is included in
    // bin/traceur.js which needs to work in a browser.
    let {runInThisContext} = require('vm');
    let semver = require('semver');

    let content = codeUnit.metadata.transcoded;
    let filename = codeUnit.address || codeUnit.normalizedName;
    // Node eval does not support //# sourceURL yet.
    // In node we use a low level evaluator so that the
    // sourcemap=memory mechanism can help us debug.
    if (codeUnit.metadata.traceurOptions.sourceMaps === 'memory') {
      this.enableMemorySourceMaps_();
    }

    // Node 0.10 uses a string as the filename.
    // Node 0.12 >= uses an option object
    let options;
    if (semver.gte(process.version, '0.12.0')) {
      options = {filename};
    } else {
      options = filename;
    }
    let result = runInThisContext(content, options);
    codeUnit.metadata.transformedTree = null;
    return result;
  }

  enableMemorySourceMaps_() {
    if (this.sourceMapsInMemory_) {
      return;
    }
    require('source-map-support').install({
      retrieveSourceMap: function(url) {
        try {
          let map = System.getSourceMap(url);
          if (map) {
            return {url, map};
          }
        } catch (ex) {
          // Failure in this function results in no error output.
          console.error('retrieveSourceMap FAILED ', ex);
        }
      }
    });
    this.sourceMapsInMemory_ = true;
  }
}
