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

import {ModuleVisitor} from './ModuleVisitor.js';
import {assert} from '../../util/assert.js';

/**
 * Visits a parse tree and adds all the export definitions, including export *.
 */
export class ExportVisitor extends ModuleVisitor {
  /**
   * @param {traceur.util.ErrorReporter} reporter
   * @param {Loader} loader
   * @param {ModuleSymbol} moduleSymbol The root of the module system.
   */
  constructor(reporter, loader, moduleSymbol) {
    super(reporter, loader, moduleSymbol);
    this.inExport_ = false;
    this.moduleSpecifier = null;
  }

  addExport_(name, tree) {
    assert(typeof name === 'string');
    if (this.inExport_)
      this.addExport(name, tree);
  }

  addExport(name, tree) {
    let moduleSymbol = this.moduleSymbol;
    let existingExport = moduleSymbol.getExport(name);
    if (existingExport) {
      this.reportError(tree, `Duplicate export. '${name}' was previously ` +
          `exported at ${existingExport.location.start}`);
    } else {
      moduleSymbol.addExport(name, tree);
    }
  }

  visitClassDeclaration(tree) {
    this.addExport_(tree.name.identifierToken.value, tree);
  }

  visitExportDeclaration(tree) {
    this.inExport_ = true;
    this.visitAny(tree.declaration);
    this.inExport_ = false;
  }

  visitNamedExport(tree) {
    this.moduleSpecifier = tree.moduleSpecifier;
    this.visitAny(tree.exportClause);
    this.moduleSpecifier = null;
  }

  visitExportDefault(tree) {
    this.addExport_('default', tree);
  }

  visitExportSpecifier(tree) {
    this.addExport_((tree.rhs || tree.lhs).value, tree);
  }

  visitExportStar(tree) {
    let name = this.moduleSpecifier.token.processedValue;
    let exportList =
        this.getExportsListForModuleSpecifier(name);
    if (exportList) {
      exportList.getExports().forEach((name) => this.addExport(name, tree));
    }  // Else: we already reported an error.
  }

  visitNameSpaceExport(tree) {
    this.addExport_(tree.name.value, tree);
  }

  visitForwardDefaultExport(tree) {
    // export name from 'module'
    // same as
    // export {default as name} from 'module'
    this.addExport_(tree.name.value, tree);
  }

  visitFunctionDeclaration(tree) {
    this.addExport_(tree.name.getStringValue(), tree);
  }

  visitVariableDeclaration(tree) {
    this.visitAny(tree.lvalue);
    // Don't visit the initializer.
  }

  visitBindingIdentifier(tree) {
    this.addExport_(tree.getStringValue(), tree);
  }

  visitBindingElement(tree) {
    this.visitAny(tree.binding);
    // Don't visit the initializer.
  }

  visitTypeAliasDeclaration(tree) {
    this.addExport(tree.name.value, tree);
  }
}
