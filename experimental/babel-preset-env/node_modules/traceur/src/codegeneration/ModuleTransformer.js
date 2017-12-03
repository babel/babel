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

import {
  AnonBlock,
  BindingElement,
  EmptyStatement,
  LiteralPropertyName,
  Module,
  ObjectPattern,
  ObjectPatternField,
  Script
} from '../syntax/trees/ParseTrees.js';
import {DestructuringTransformer} from './DestructuringTransformer.js';
import {DirectExportVisitor} from './module/DirectExportVisitor.js';
import ImportRuntimeTrait from './ImportRuntimeTrait.js';
import {ImportSimplifyingTransformer} from './ImportSimplifyingTransformer.js';
import {TempVarTransformer} from './TempVarTransformer.js';
import {
  CLASS_DECLARATION,
  EXPORT_DEFAULT,
  EXPORT_SPECIFIER,
  FORWARD_DEFAULT_EXPORT,
  FUNCTION_DECLARATION,
  IMPORT_SPECIFIER_SET,
  IMPORT_TYPE_CLAUSE,
  NAME_SPACE_EXPORT,
} from '../syntax/trees/ParseTreeType.js';
import {VAR} from '../syntax/TokenType.js';
import {assert} from '../util/assert.js';
import {
  resolveUrl,
  canonicalizeUrl
} from '../util/url.js';
import {
  createArgumentList,
  createExpressionStatement,
  createIdentifierExpression,
  createIdentifierToken,
  createMemberExpression,
  createObjectLiteral,
  createUseStrictDirective,
  createVariableStatement,
  createVoid0,
} from './ParseTreeFactory.js';
import {
  parseExpression,
  parsePropertyDefinition,
  parseStatement,
  parseStatements
} from './PlaceholderParser.js';
import SkipFunctionsTransformerTrait from './SkipFunctionsTransformerTrait.js';
import {ParseTreeTransformer} from './ParseTreeTransformer.js';
import {prependStatements} from './PrependStatements.js';

function removeUseStrictDirectives(tree) {
  let result = tree.scriptItemList.filter(tree => !tree.isUseStrictDirective());
  return new Module(tree.location, result, tree.moduleName);
}

class DestructImportVarStatement extends DestructuringTransformer {
  createGuardedExpression(tree) {
    return tree;
  }
}

export class ModuleTransformer extends ImportRuntimeTrait(TempVarTransformer) {
  /**
   * @param {UniqueIdentifierGenerator} identifierGenerator
   */
  constructor(identifierGenerator, reporter, options) {
    super(identifierGenerator, reporter, options);
    this.exportVisitor = new DirectExportVisitor();
    this.importSimplifier_ = new ImportSimplifyingTransformer();
    this.moduleName = null;
  }

  getTempVarNameForModuleName(moduleName) {
    return '$__' + moduleName.replace(/[^a-zA-Z0-9$]/g, function(c) {
      return '_' + String(c.charCodeAt(0)) + '_';
    }) + '__';
  }

  getModuleName(tree) {
    return tree.moduleName;
  }

  getTempVarNameForModuleSpecifier(moduleSpecifier) {
    let name = moduleSpecifier.token.processedValue;
    if (name[0] === '.' && this.moduleName) {
      name = resolveUrl(this.moduleName, name);
    } else {
      name = canonicalizeUrl(name);
    }
    return this.getTempVarNameForModuleName(name);
  }

  transformScript(tree) {
    this.moduleName = tree.moduleName;
    return super.transformScript(tree);
  }

  transformModule(tree) {
    tree = removeUseStrictDirectives(tree);
    tree = this.importSimplifier_.transformModule(tree);
    const replaceThis = new ReplaceThis();
    tree = replaceThis.transformAny(tree);

    this.moduleName = this.getModuleName(tree);

    this.pushTempScope();

    let statements = this.transformList(tree.scriptItemList);
    statements = this.addExportStatement(statements);
    const runtimeImports = this.transformList(this.getRuntimeImports());
    statements = prependStatements(statements, ...runtimeImports);

    this.popTempScope();

    statements = this.wrapModule(this.moduleProlog().concat(statements));

    return new Script(tree.location, statements, null);
  }

  moduleProlog() {
    let statements = [createUseStrictDirective()];
    if (this.moduleName) {
      statements.push(parseStatement `var __moduleName = ${this.moduleName};`);
    }
    return statements;
  }

  wrapModule(statements) {
    let functionExpression;
    if (this.options.transformOptions.require) {
      functionExpression = parseExpression `function(require) {
        ${statements}
      }`;
    } else {
      functionExpression = parseExpression `function() {
        ${statements}
      }`;
    }

    if (this.moduleName === null) {
      return parseStatements
          `$traceurRuntime.ModuleStore.getAnonymousModule(
              ${functionExpression});`;
    }
    return parseStatements
        `$traceurRuntime.registerModule(${this.moduleName}, [], ${functionExpression});`;
  }

  /**
   * This creates the code that defines the getter for an export.
   * @param {{string, ParseTree, ModuleSpecifier}} symbol
   * @return {ParseTree}
   */
  getGetterExport(exp) {
    const returnExpression = this.getGetterExportReturnExpression(exp);
    return parsePropertyDefinition
        `get ${exp.name}() { return ${returnExpression}; }`;
  }

  getGetterExportReturnExpression({name, tree, moduleSpecifier}) {
    let returnExpression;
    switch (tree.type) {
      case EXPORT_DEFAULT:
        switch (tree.expression.type) {
          case CLASS_DECLARATION:
          case FUNCTION_DECLARATION:
            return createIdentifierExpression(tree.expression.name);
          default:
            return createIdentifierExpression('$__default');
        }
        break;

      case EXPORT_SPECIFIER:
        if (moduleSpecifier) {
          let idName = this.getTempVarNameForModuleSpecifier(moduleSpecifier);
          return createMemberExpression(idName, tree.lhs);
        }
        return createIdentifierExpression(tree.lhs)

      case NAME_SPACE_EXPORT: {
        let idName = this.getTempVarNameForModuleSpecifier(moduleSpecifier);
        return createIdentifierExpression(idName);
      }

      case FORWARD_DEFAULT_EXPORT: {
        let idName = this.getTempVarNameForModuleSpecifier(moduleSpecifier);
        return createMemberExpression(idName, 'default');
      }

      default:
        return createIdentifierExpression(name);
    }
  }

  getExportProperties() {
    return this.exportVisitor.getNonTypeNamedExports().map((exp) => {
      // export_name: {get: function() { return export_name },
      return this.getGetterExport(exp);
    }).concat(this.exportVisitor.namedExports.map((exp) => {
      return this.getSetterExport(exp);
    })).filter(e => e);
  }

  // By default, the module transformer doesn't create setters,
  // as the Module object is read only.
  getSetterExport({name, tree, moduleSpecifier}) {
    return null;
  }

  getExportObject() {
    let exportObject = createObjectLiteral(this.getExportProperties());
    if (this.hasStarExports()) {
      return this.getExportStar(exportObject);
    }
    return exportObject;
  }

  getExportStar(exportObject) {
    let starExports = this.exportVisitor.starExports;
    let starIdents = starExports.map((moduleSpecifier) => {
      return createIdentifierExpression(
          this.getTempVarNameForModuleSpecifier(moduleSpecifier));
    });
    let args = createArgumentList([exportObject, ...starIdents]);
    const runtime = this.getRuntimeExpression('exportStar');
    return parseExpression `${runtime}(${args})`;
  }

  addExportStatement(statements) {
    let exportObject = this.getExportObject();
    statements.push(parseStatement `return ${exportObject}`);
    return statements;
  }

  /**
   * @return {boolean}
   */
  hasExports() {
    return this.exportVisitor.hasExports();
  }

  /**
   * @return {boolean}
   */
  hasStarExports() {
    return this.exportVisitor.starExports.length > 0;
  }

  transformExportDeclaration(tree) {
    this.exportVisitor.visitAny(tree);
    return this.transformAny(tree.declaration);
  }

  transformExportDefault(tree) {
    switch (tree.expression.type) {
      case CLASS_DECLARATION:
      case FUNCTION_DECLARATION:
        return tree.expression;
    }
    return parseStatement `var $__default = ${tree.expression}`;
  }

  transformNamedExport(tree) {
    let moduleSpecifier = tree.moduleSpecifier;

    if (moduleSpecifier) {
      let expression = this.transformAny(moduleSpecifier);
      let idName = this.getTempVarNameForModuleSpecifier(moduleSpecifier);
      return createVariableStatement(VAR, idName, expression);
    }

    return new AnonBlock(null, [])
  }

  /**
   * @param {ModuleSpecifier} tree
   * @return {ParseTree}
   */
  transformModuleSpecifier(tree) {
    assert(this.moduleName);
    let name = tree.token.processedValue;
    // import/module {x} from './name.js' is relative to the current file.
    return parseExpression `$traceurRuntime.getModule(
      $traceurRuntime.normalizeModuleName(${name}, ${this.moduleName}));`;
  }

  transformImportDeclaration(tree) {
    // import {id} from 'module'
    //  =>
    // const {id} = moduleInstance
    //
    // import {} from 'module'
    //  =>
    // moduleInstance;
    //
    // import * as m from 'module'
    // =>
    // const m = moduleInstance

    if (tree.importClause.type === IMPORT_TYPE_CLAUSE) {
      return new AnonBlock(null, []);
    }

    // import 'module'
    // import {} from 'module'
    if (tree.importClause.type === IMPORT_SPECIFIER_SET &&
        tree.importClause.specifiers.length === 0) {
      return createExpressionStatement(this.transformAny(tree.moduleSpecifier));
    }

    let binding = this.transformAny(tree.importClause);
    let initializer = this.transformAny(tree.moduleSpecifier);

    let varStatement = createVariableStatement(VAR, binding, initializer);

    // If destructuring patterns are kept in the output code, keep this as is,
    // otherwise transform it here.
    if (this.options.transformOptions.destructuring ||
        !this.options.parseOptions.destructuring) {
      let destructuringTransformer =
          new DestructImportVarStatement(this.identifierGenerator,
                                         this.reporter, this.options);
      varStatement = varStatement.transform(destructuringTransformer);
    }

    return varStatement;
  }

  transformImportSpecifierSet(tree) {
    let fields = this.transformList(tree.specifiers);
    return new ObjectPattern(null, fields);
  }

  transformNameSpaceImport(tree) {
    return tree.binding.binding;
  }

  transformImportSpecifier(tree) {
    let binding = tree.binding.binding;
    let bindingElement = new BindingElement(binding.location, binding, null);
    if (tree.name) {
      let name = new LiteralPropertyName(tree.name.location, tree.name);
      return new ObjectPatternField(tree.location, name, bindingElement);
    }
    return bindingElement;
  }
}

// Replaces top level `this` with `void 0`.
class ReplaceThis extends SkipFunctionsTransformerTrait(ParseTreeTransformer) {
  transformThisExpression(tree) {
    return createVoid0();
  }
}
