// Copyright 2012 Traceur Authors.
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

import {StringMap} from '../../util/StringMap.js';
import {assert} from '../../util/assert.js';

export class ExportsList {
  /**
   * @param {string} normalizedName
   */
  constructor(normalizedName) {
    this.exports_ = new StringMap();
    if (normalizedName !== null)
      this.normalizedName = normalizedName.replace(/\\/g, '/');
    else
      this.normalizedName = null ;
  }

  /**
   * @param {string} name
   * @param {ParseTree|true} tree
   */
  addExport(name, tree) {
    // Duplicate exports should have been checked already.
    assert(!this.exports_.has(name));
    this.exports_.set(name, tree);
  }

  /**
   * @param {string} name
   * @return {ParseTree|true}
   */
  getExport(name) {
    return this.exports_.get(name);
  }

  /**
   * @return {Array.<string>}
   */
  getExports() {
    return this.exports_.keysAsArray();
  }

  addExportsFromModule(module) {
    Object.getOwnPropertyNames(module).forEach((name) => {
      this.addExport(name, true);
    });
  }
}

export class ModuleSymbol extends ExportsList {
  /**
   * @param {Module} tree
   * @param {string} normalizedName
   */
  constructor(tree, normalizedName) {
    super(normalizedName);
    this.tree = tree;
    this.imports_ = new StringMap();
  }

  /**
   * @param {string} name
   * @param {ParseTree} tree
   */
  addImport(name, tree) {
    // Duplicate imports should have been checked already.
    assert(!this.imports_.has(name));
    this.imports_.set(name, tree);
  }

  /**
   * @param {string} name
   * @return {ParseTree}
   */
  getImport(name) {
    return this.imports_.get(name);
  }
}
