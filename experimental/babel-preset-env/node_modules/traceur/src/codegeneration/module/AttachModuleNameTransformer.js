
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

import {ParseTreeTransformer} from '../ParseTreeTransformer.js';
import {
  Module,
  Script
} from '../../syntax/trees/ParseTrees.js';


/**
 * Annotates a tree with its URL
 */

export class AttachModuleNameTransformer extends ParseTreeTransformer {
  /**
   * @param {SourceFile} file
   */
  constructor(moduleName) {
    super();
    this.moduleName_ = moduleName;
  }

  transformModule(tree) {
    return new Module(tree.location, tree.scriptItemList, this.moduleName_);
  }

  transformScript(tree) {
    return new Script(tree.location, tree.scriptItemList, this.moduleName_);
  }
}


