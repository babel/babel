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

import {ModuleTransformer} from './ModuleTransformer.js';

import {
  createIdentifierExpression,
  createMemberExpression,
  createPropertyNameAssignment
} from './ParseTreeFactory.js';

import {
  EXPORT_DEFAULT,
  EXPORT_SPECIFIER
} from '../syntax/trees/ParseTreeType.js';

import {
  parseExpression,
  parseStatement,
  parseStatements
} from './PlaceholderParser.js';

import {prependStatements} from './PrependStatements.js';

export class ClosureModuleTransformer extends ModuleTransformer {

  moduleProlog() {
    // 'use strict'; and module name are implied by the goog.module call.
    if (!this.moduleName) {
      throw new Error('Closure modules (goog.module) require a moduleName');
    }
    return parseStatements `goog.module(${this.moduleName});`
  }

  wrapModule(statements) {
    // Ensure that the module contains no "export *" statements.
    if (this.hasStarExports()) {
      throw new Error('Closure modules (goog.module) do not support "export *"');
    }
    // goog.module requires no wrapping, scoping semantics are handled by the
    // module loader at runtime (through evaluation in a function scope).
    return statements;
  }

  addExportStatement(statements) {
    if (!this.hasExports()) return statements;
    let exportObject = this.getExportObject();
    statements.push(parseStatement `exports = ${exportObject}`);
    return statements;
  }

  getGetterExport({name, tree, moduleSpecifier}) {
    // goog.module does not support getters in exports, so all exports are
    // simple assignments into the exports object.
    let expression;
    switch (tree.type) {
      case EXPORT_DEFAULT:
        expression = createIdentifierExpression('$__default');
        break;

      case EXPORT_SPECIFIER:
        if (moduleSpecifier) {
          let idName = this.getTempVarNameForModuleSpecifier(moduleSpecifier);
          expression = createMemberExpression(idName, tree.lhs);
        } else {
          expression = createPropertyNameAssignment(name, tree.lhs)
        }
        break;

      default:
        expression = createIdentifierExpression(name);
        break;
    }
    return createPropertyNameAssignment(name, expression);
  }

  transformModuleSpecifier(tree) {
    let moduleName = tree.token.processedValue;
    return parseExpression `goog.require(${moduleName})`;
  }
}
