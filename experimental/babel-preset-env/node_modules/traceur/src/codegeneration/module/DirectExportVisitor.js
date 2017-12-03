// Copyright 20123 Traceur Authors.
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

import {ExportVisitor} from './ExportVisitor.js';
import {TYPE_ALIAS_DECLARATION} from '../../syntax/trees/ParseTreeType.js';

/**
 * Visits a parse tree and adds all the exports.
 *
 *   export {x, y as z};
 *   export {a, b as c} from 'd'
 *   export class C {}
 *   export var v = 1;
 *   export default 42;
 *   ...
 *
 * This extends ExportVisitor but instead of following `export * from 'name'`
 * it adds the ModuleSpecifier to the starExports.
 */
export class DirectExportVisitor extends ExportVisitor {
  constructor() {
    super(null, null, null);
    this.namedExports = [];
    this.starExports = [];
  }

  addExport(name, tree) {
    this.namedExports.push({name, tree, moduleSpecifier: this.moduleSpecifier});
  }

  visitExportStar(tree) {
    this.starExports.push(this.moduleSpecifier);
  }

  hasExports() {
    return this.namedExports.length !== 0 || this.starExports.length !== 0;
  }

  getNonTypeNamedExports() {
    return this.namedExports.filter(exp =>
        exp.tree.type !== TYPE_ALIAS_DECLARATION);
  }
}
