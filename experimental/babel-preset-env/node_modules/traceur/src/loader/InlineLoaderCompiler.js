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

import {LoaderCompiler} from './LoaderCompiler.js';
import {Script} from '../syntax/trees/ParseTrees.js';

export class InlineLoaderCompiler extends LoaderCompiler {

  constructor(elements) {
    super();
    this.elements = elements;
  }

  write() {
    // no-op. The tree will be concatentated by evaluate and
    // written by the caller of toTree();
  }

  evaluateCodeUnit(codeUnit) {
    // Don't eval. Instead append the trees to the output.
    var tree = codeUnit.metadata.transformedTree;
    this.elements.push(...tree.scriptItemList);
  }

  toTree() {
    return new Script(null, this.elements, null);
  }
}
