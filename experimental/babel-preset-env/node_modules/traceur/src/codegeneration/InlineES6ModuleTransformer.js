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

import {CONST, LET} from '../syntax/TokenType.js';
import {ModuleTransformer} from './ModuleTransformer.js';
import {
  createAssignmentStatement,
  createArgumentList,
  createBindingIdentifier,
  createCallExpression,
  createExpressionStatement,
  createForInStatement,
  createFunctionBody,
  createIfStatement,
  createImmediatelyInvokedFunctionExpression,
  createIdentifierExpression,
  createMemberLookupExpression,
  createMemberExpression,
  createObjectLiteral,
  createReturnStatement,
  createUseStrictDirective,
  createVariableDeclarationList,
  createVariableStatement
} from './ParseTreeFactory.js';
import {IMPORT_SPECIFIER_SET} from '../syntax/trees/ParseTreeType.js';
import {AnonBlock} from '../syntax/trees/ParseTrees.js';
import {parseStatement} from './PlaceholderParser.js';

let anonInlineModules = 0;

/**
 * Inline's ES6 module imports and outputs to a single ES6 formatted file.
 * usage: traceur --modules=inline --outputLanguage=es6 --out ./out/some-lib.js -- ./src/root.js
 *
 * in:
 *  // a.js
 *  export function a() {
 *    return 'A';
 *  }
 *
 *  // root.js
 *  import {a} from './a.js';
 *  export function b() {
 *    return a();
 *  }
 *
 *  out:
 *  // some-lib.js
 *  const $__module__a__js = (function() {
 *    "use strict";
 *    function a() {
 *      return 'A';
 *    }
 *    return {get a() {
 *        return a;
 *      }};
 *  })();
 *  "use strict";
 *  const {a} = $__module__a__js;
 *  export function b() {
 *    return a();
 *  }
 */
export class InlineES6ModuleTransformer extends ModuleTransformer {

  constructor(identifierGenerator, reporter, options, metadata) {
    super(identifierGenerator, reporter, options);
    this.metadata_ = metadata;
  }

  /**
   * Places "use strict" at the top of each generated module
   * The default `var __moduleName = "../some/path/to/module.js";` is omitted
   * @returns {Array} statements
   */
  moduleProlog() {
    return [createUseStrictDirective()];
  }

  /**
   * Wraps a module in to an IIFE closure and returns the module as a `const` unless it's a root module
   * @param statements
   * @returns {Array} statements
   */
  wrapModule(statements) {
    let seed = this.moduleName || 'anon_' + ++anonInlineModules;
    let idName = this.getTempVarNameForModuleName(seed);

    if (this.isRootModule) {
      // removes the return statement from the output
      statements.pop();
      return statements;
    }

    let body = createFunctionBody(statements);
    let moduleExpression = createImmediatelyInvokedFunctionExpression(body);
    return [createVariableStatement(CONST, idName, moduleExpression)];
  }

  /**
   * Preserves the `export` statements for root modules
   * @param tree
   * @returns {Tree}
   */
  transformExportDeclaration(tree) {
    if (this.isRootModule)
      return tree;

    this.exportVisitor.visitAny(tree);
    return this.transformAny(tree.declaration);
  }

  /**
   * Transforms imports to use `const` statements
   * @param tree
   * @returns {VariableStatement}
   */
  transformImportDeclaration(tree) {
    if (!tree.importClause ||
      (tree.importClause.type === IMPORT_SPECIFIER_SET &&
      tree.importClause.specifiers.length === 0)) {
      return createExpressionStatement(this.transformAny(tree.moduleSpecifier));
    }
    let binding = this.transformAny(tree.importClause);
    let initializer = this.transformAny(tree.moduleSpecifier);
    return createVariableStatement(CONST, binding, initializer);
  }

  transformNamedExport(tree) {
    return new AnonBlock(null, []);
  }

  /**
   * Handles importing modules that have `export * from './path/to/foo.js'` declarations.
   * Generates the following output:
   *
   * forEach $starIdent
   *  let ${exports} = {};
   *  for (let ${key} in ${starIdent})
   *    if (${starIdent}.hasOwnProperty(${key}))
   *      $exports[${key}] = $starIdent[${key}];
   *  return ${exports};
   *
   * @returns {Array} statements
   */
  addExportStatement(statements) {
    let exportProperties = this.getExportProperties();
    let exportObject = createObjectLiteral(exportProperties);
    if (this.exportVisitor.starExports.length) {
      let starExports = this.exportVisitor.starExports;
      let starIdents = starExports.map((moduleSpecifier) => {
        return createIdentifierExpression(
          this.getTempVarNameForModuleSpecifier(moduleSpecifier));
      });

      if (exportProperties.length)
        starIdents.push(exportObject);

      // let ${exports} = {};
      let exports = this.getTempIdentifier();
      statements.push(createVariableStatement(LET, exports, createObjectLiteral("")));

      let key = this.getTempIdentifier();
      starIdents.forEach((starIdent) => {
        statements.push(
          // for
          createForInStatement(
            // let ${key}
            createVariableDeclarationList(LET, key, null),
            // in ${starIdent}
            starIdent,
            // if
            createIfStatement(
              // (${starIdent}.hasOwnProperty(${key}))
              createCallExpression(
                createMemberExpression(starIdent, 'hasOwnProperty'),
                createArgumentList([createIdentifierExpression(key)])),
              // true part: $exports[${key}] = $starIdent[${key}]
              createAssignmentStatement(
                createMemberLookupExpression(
                  createIdentifierExpression(exports),
                  createIdentifierExpression(key)),
                createMemberLookupExpression(
                  starIdent,
                  createIdentifierExpression(key)))))
        );
      });
      // return ${exports}
      statements.push(createReturnStatement(createIdentifierExpression(exports)));
      return statements;
    }
    statements.push(parseStatement `return ${exportObject}`);
    return statements;
  }

  /**
   * Ensures each transformed module has a unique name
   * @param tree
   * @returns {BindingIdentifier}
   */
  transformModuleSpecifier(tree) {
    return createBindingIdentifier(this.getTempVarNameForModuleSpecifier(tree));
  }

  get isRootModule() {
    return this.moduleName === (this.metadata_ && this.metadata_.rootModule);
  }
}
