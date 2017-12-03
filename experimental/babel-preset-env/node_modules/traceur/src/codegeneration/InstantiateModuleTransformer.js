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

import {
  AnonBlock,
  ArrayLiteral,
  ClassExpression,
  CommaExpression,
  ExpressionStatement,
  VariableDeclaration
} from '../syntax/trees/ParseTrees.js';
import {
  ANON_BLOCK,
  CLASS_DECLARATION,
  FUNCTION_DECLARATION,
  IDENTIFIER_EXPRESSION,
  IMPORT_SPECIFIER_SET,
  NAME_SPACE_IMPORT
} from '../syntax/trees/ParseTreeType.js';
import {ParseTreeVisitor} from '../syntax/ParseTreeVisitor.js';
import {ScopeTransformer} from './ScopeTransformer.js';
import {
  createEmptyParameterList,
  createFunctionBody,
  createFunctionExpression,
  createIdentifierExpression as id,
  createObjectLiteralForDescriptor,
  createUseStrictDirective,
  createVariableDeclarationList,
  createVariableStatement
} from './ParseTreeFactory.js';
import {ModuleTransformer} from './ModuleTransformer.js';
import {
  MINUS_MINUS,
  PLUS_PLUS,
  VAR
} from '../syntax/TokenType.js';
import {
  parseExpression,
  parseStatement,
  parseStatements
} from './PlaceholderParser.js';
import HoistVariablesTransformer from './HoistVariablesTransformer.js';

function flattenAnonBlocks(statements) {
  let result = [];
  for (let i = 0; i < statements.length; i++) {
    let statement = statements[i];
    if (statement.type === ANON_BLOCK) {
      result.push(...statement.statements);
    } else {
      result.push(statement);
    }
  }
  return result;
}

/**
 * Used to find the bindings in a variable declaration traversing into
 * destructuring patterns.
 */
class ExportBindingsVisitor extends ParseTreeVisitor {
  constructor() {
    super();
    this.bindings = [];
  }
  visitVariableDeclaration(tree) {
    this.visitAny(tree.lvalue);
    // Don't visit the initializer.
  }
  visitBindingIdentifier(tree) {
    this.bindings.push(tree);
  }
  visitBindingElement(tree) {
    this.visitAny(tree.binding);
    // Don't visit the initializer.
  }
}

/**
 * Extracts variable and function declarations from the module scope.
 */
class DeclarationExtractionTransformer extends HoistVariablesTransformer {
  constructor() {
    super();
    this.declarations_ = [];
  }
  getDeclarationStatements() {
    return flattenAnonBlocks(
        [this.getVariableStatement(), ...this.declarations_]);
  }
  addDeclaration(tree) {
    this.declarations_.push(tree);
  }
  transformFunctionDeclaration(tree) {
    this.addDeclaration(tree);
    return new AnonBlock(null, []);
  }
  transformClassDeclaration(tree) {
    this.addVariable(tree.name.identifierToken.value);

    // Convert a class declaration into a class expression.
    tree = new ClassExpression(tree.location, tree.name, tree.superClass,
        tree.elements, tree.annotations, tree.typeParameters);

    return parseStatement `${tree.name.identifierToken} = ${tree}`;
  }
}

/**
 * Replaces __moduleName with $__moduleContext.id
 *
 * This allows code to use the __moduleName temporary syntax to reference 
 * the current module name for relative importing via System.import('./x', __moduleName)
 * In the future this will be deprecated and $__moduleContext extended in the implementation
 * to support any contextual metadata and loading features determined in the spec.
 */
class ModuleNameIdentifierTransformer extends ScopeTransformer {
  constructor() {
    super('__moduleName');
    this.usesModuleName = false;
  }

  transformIdentifierExpression(tree) {
    if (tree.identifierToken.value === '__moduleName') {
      this.usesModuleName = true;
      return parseExpression `$__moduleContext.id`;
    }
    return super.transformIdentifierExpression(tree);
  }

}

/**
 * Replaces assignments of an identifier with an update function to update
 * dependent modules
 *
 * a = b
 * a++
 * --a
 * var a = b
 * =>
 * $__export('a', a = b)
 * a++, $__export('a', a);
 * $__export('a', a++);
 * $__export('a', --a);
 * var a = b;
 * $__export('a', a);
 */
class InsertBindingAssignmentTransformer extends ScopeTransformer {
  constructor(exportName, bindingName) {
    super(bindingName);
    this.bindingName_ = bindingName;
    this.exportName_ = exportName;
  }

  matchesBindingName_(binding) {
    return binding.type === IDENTIFIER_EXPRESSION &&
        binding.identifierToken.value === this.bindingName_;
  }

  // ++x
  // --x
  // =>
  // $__export('x', ++x)
  transformUnaryExpression(tree) {
    if (!this.matchesBindingName_(tree.operand))
      return super.transformUnaryExpression(tree);

    let operatorType = tree.operator.type;
    if (operatorType !== PLUS_PLUS && operatorType !== MINUS_MINUS)
      return super.transformUnaryExpression(tree);

    let operand = this.transformAny(tree.operand);
    if (operand !== tree.operand)
      tree = new UnaryExpression(tree.location, tree.operator, operand);

    return parseExpression `$__export(${this.exportName_}, ${tree})`;
  }

  // x++
  // =>
  // ($__export('x', x + 1), x++)
  transformPostfixExpression(tree) {
    tree = super.transformPostfixExpression(tree);

    if (!this.matchesBindingName_(tree.operand))
      return tree;

    switch (tree.operator.type) {
      case PLUS_PLUS:
        return parseExpression
            `($__export(${this.exportName_}, ${tree.operand} + 1), ${tree})`;
      case MINUS_MINUS:
        return parseExpression
            `($__export(${this.exportName_}, ${tree.operand} - 1), ${tree})`;
    }
    return tree;
  }

  // x = y
  // =>
  // $__export('x', x = y);
  transformBinaryExpression(tree) {
    tree = super.transformBinaryExpression(tree);

    if (!tree.operator.isAssignmentOperator())
      return tree;

    if (!this.matchesBindingName_(tree.left))
      return tree;

    return parseExpression `$__export(${this.exportName_}, ${tree})}`;
  }
}

/**
 * Transform a module to a 'instantiate' format:
 * System.register(localName, [deps], function($__export) {});
 * where [deps] are unnormalized (module-specifier-like) names
 * and $__export is the dynamic export binding setter function.
 */
export class InstantiateModuleTransformer extends ModuleTransformer {

  constructor(identifierGenerator, reporter, options = undefined) {
    super(identifierGenerator, reporter, options);

    this.anonymousModule =
        options && !options.bundle && options.moduleName !== true;

    // does the module reference __moduleName
    this.usesModuleName = false;

    this.inExport_ = false;
    this.curDepIndex_ = null;

    this.dependencies = [];

    // export bindings from other modules
    // export {p as q} from 'r';
    // array of arrays, keyed by dependency index
    this.externalExportBindings = [];

    // local import bindings
    // import {s} from 't';
    // array of arrays, keyed by dependency index
    this.importBindings = [];

    // local export bindings
    // export {p as q}
    // array of bindings
    this.localExportBindings = [];

    // function declaration bindings
    // export function q() {}
    // export default function q() {}
    // array of bindings
    this.functionDeclarations = [];

    // module declaration bindings
    // import * as P from 'q';
    // string array keyed by dependency index
    this.moduleBindings = [];

    // whether this module has an export star
    // boolean array keyed by dependency index
    this.exportStarBindings = [];
  }

  getModuleName(tree) {
    if (this.anonymousModule)
      return null;
    return tree.moduleName;
  }

  // module prolog is moved inside System.register
  moduleProlog() {
    return [];
  }

  wrapModule(statements) {
    let prolog = [createUseStrictDirective()];

    statements = prolog.concat(statements);

    if (this.usesModuleName) {
      if (this.moduleName) {
        return parseStatements `System.register(${this.moduleName},
            ${this.dependencies}, function($__export, $__moduleContext) {
              ${statements}
            });`;
      }

      return parseStatements
          `System.register(${this.dependencies}, function($__export, $__moduleContext) {
            ${statements}
          });`;
    }

    if (this.moduleName) {
      return parseStatements `System.register(${this.moduleName},
          ${this.dependencies}, function($__export) {
            ${statements}
          });`;
    }

    return parseStatements
        `System.register(${this.dependencies}, function($__export) {
          ${statements}
        });`;
  }

  /**
   * Create the primary System.register structure, separating
   * declaration bindings from execution for ES6 binding support.
   *
   * Converts:
   *   import {s} from 's';
   *   export {p as t, s} from 'q';
   *   export * from 'r';
   *   q(s);
   *   function q() {
   *     s();
   *   }
   *
   * Hoisting the declarations and writing the exports into:
   *
   * System.register("name", ["s", "q", "r"], function($__export) {
   *   var s;
   *   function q() {
   *     s();
   *   }
   *   return {
   *     setters: [
   *       function(m) {
   *         $__export('t', m['p']);
   *         $__export('s', m['s']);
   *       },
   *       function(m) {
   *         s = m['s'];
   *       },
   *       function(m) {
   *         for (var p in m)
   *           $__export(p, m[p]);
   *       }
   *     ],
   *     execute: function() {
   *       q(s);
   *     }
   *   };
   * });
   *
   */
  addExportStatement(statements) {
    let declarationExtractionTransformer = new DeclarationExtractionTransformer();

    // convert __moduleName identifiers into $__moduleContext.id
    let moduleNameIdentifierTransformer = new ModuleNameIdentifierTransformer();
    statements = moduleNameIdentifierTransformer.transformList(statements);
    if (moduleNameIdentifierTransformer.usesModuleName)
      this.usesModuleName = true;

    // replace local export assignments with binding functions
    // using InsertBindingAssignmentTransformer
    this.localExportBindings.forEach((binding) => {
      statements = new InsertBindingAssignmentTransformer(
          binding.exportName, binding.localName).transformList(statements);
    });

    // Transform statements into execution statements only, with declarations
    // removed.
    let executionStatements =
        declarationExtractionTransformer.transformList(statements);

    let executionFunction = createFunctionExpression(
        createEmptyParameterList(),
        createFunctionBody(executionStatements));

    // Extract the declaration statements for hoisting from the previous
    // transform.
    let declarationStatements =
        declarationExtractionTransformer.getDeclarationStatements();

    // create the setter bindings
    let setterFunctions = this.dependencies.map((dep, index) => {
      let importBindings = this.importBindings[index];
      let externalExportBindings = this.externalExportBindings[index];
      let exportStarBinding = this.exportStarBindings[index];
      let moduleBinding = this.moduleBindings[index];

      let setterStatements = [];

      // first set local import bindings for the current dependency
      if (importBindings) {
        importBindings.forEach((binding) => {
          setterStatements.push(parseStatement
              `${id(binding.variableName)} = $__m.${binding.exportName};`);
        });
      }

      // then do export bindings of re-exported dependencies
      if (externalExportBindings) {
        let reexports = Object.create(null);
        externalExportBindings.forEach(({exportName, importName}) => {
          reexports[exportName] = importName === null ?
              parseExpression `$__m` : parseExpression `$__m.${importName}`;
        });
        setterStatements.push(
            parseStatement `$__export(${createObjectLiteralForDescriptor(reexports)})`);
      }

      // create local module bindings
      if (moduleBinding) {
        setterStatements.push(
            parseStatement `${id(moduleBinding)} = $__m;`);
      }

      // finally run export * if applying to this dependency, for not-already
      // exported dependencies
      if (exportStarBinding) {
        setterStatements = setterStatements.concat(parseStatements `
          var exportObj = Object.create(null);
          Object.keys($__m).forEach(function(p) {
            if (p !== 'default' && !$__exportNames[p])
              exportObj[p] = $__m[p];
          });
          $__export(exportObj);
        `);

        let exportNames = {};
        this.localExportBindings.concat(this.externalExportBindings).
            forEach(function(binding) {
              exportNames[binding.exportName] = true;
            });

        declarationStatements.push(parseStatement `
          var $__exportNames = ${createObjectLiteralForDescriptor(exportNames)};
        `);
      }

      if (setterStatements.length) {
        return parseExpression `function($__m) {
          ${setterStatements}
        }`;
      }

      return parseExpression `function($__m) {}`;
    });

    // add function declaration assignments for hoisted function exports
    declarationStatements = declarationStatements.concat(
        this.functionDeclarations.map((binding) => {
          return parseStatement
              `$__export(${binding.exportName}, ${id(binding.functionName)})`;
        }));

    declarationStatements.push(parseStatement `return {
      setters: ${new ArrayLiteral(null, setterFunctions)},
      execute: ${executionFunction}
    }`);

    return declarationStatements;
  }


  // Add a new local binding
  addLocalExportBinding(exportName, localName = exportName) {
    this.localExportBindings.push({
      exportName: exportName,
      localName: localName
    });
  }


  // Add a new local binding for a given dependency index
  // import {p as q} from 't';
  addImportBinding(depIndex, variableName, exportName) {
    this.importBindings[depIndex] = this.importBindings[depIndex] || [];
    this.importBindings[depIndex].push({
      variableName: variableName,
      exportName: exportName
    });
  }
  // Add a new export binding for a given dependency index
  // export {a as p} from 'q';
  addExternalExportBinding(depIndex, exportName, importName) {
    this.externalExportBindings[depIndex] =
        this.externalExportBindings[depIndex] || [];
    this.externalExportBindings[depIndex].push({exportName, importName});
  }
  // Note that we have an export * for a dep index
  addExportStarBinding(depIndex) {
    this.exportStarBindings[depIndex] = true;
  }
  // Add a new module binding
  // import * as P from 'q';
  addModuleBinding(depIndex, variableName) {
    this.moduleBindings[depIndex] = variableName;
  }

  // Add a new assignment of a hoisted function declaration
  // export function p() {}
  // export default function q() {}
  addExportFunction(exportName, functionName = exportName) {
    this.functionDeclarations.push({
      exportName: exportName,
      functionName: functionName
    });
  }

  getOrCreateDependencyIndex(moduleSpecifier) {
    let name = moduleSpecifier.token.processedValue;

    let depIndex = this.dependencies.indexOf(name);

    if (depIndex === -1) {
      depIndex = this.dependencies.length;
      this.dependencies.push(name);
    }
    return depIndex;
  }

  transformExportDeclaration(tree) {
    this.inExport_ = true;

    if (tree.declaration.moduleSpecifier) {
      this.curDepIndex_ =
          this.getOrCreateDependencyIndex(tree.declaration.moduleSpecifier);
    } else {
      this.curDepIndex_ = null;
    }

    let transformed = this.transformAny(tree.declaration);
    this.inExport_ = false;
    return transformed;
  }

  // export var p = 5, q;
  // =>
  // var p = 5, q;
  // $__export('p', p);
  // $__export('q', q);
  transformVariableStatement(tree) {
    if (!this.inExport_)
      return super.transformVariableStatement(tree);

    this.inExport_ = false;

    let bindingVisitor = new ExportBindingsVisitor();
    bindingVisitor.visitAny(tree);
    let statements = [];
    for (let i = 0; i < bindingVisitor.bindings.length; i++) {
      let {identifierToken} = bindingVisitor.bindings[i];
      let name = identifierToken.value;
      this.addLocalExportBinding(name);
      statements.push(
          parseStatement `$__export(${name}, ${id(identifierToken)})`);
    }

    // Transform the tree after the export bindings have been registered.
    statements.unshift(super.transformAny(tree));

    return new AnonBlock(null, statements);
  }

  transformExportStar(tree) {
    this.inExport_ = false;
    this.addExportStarBinding(this.curDepIndex_);
    return new AnonBlock(null, []);
  }

  // export class q {}
  // =>
  // class q {}
  // $__export('q', q)
  transformClassDeclaration(tree) {
    if (!this.inExport_)
      return super.transformClassDeclaration(tree);

    this.inExport_ = false;

    let {identifierToken} = tree.name;
    let name = identifierToken.value;
    this.addLocalExportBinding(name);

    let statements = [
      super.transformClassDeclaration(tree),
      parseStatement `$__export(${name}, ${id(identifierToken)})`
    ];
    return new AnonBlock(null, statements);
  }

  // export function q() {}
  // =>
  // function q() {}
  // (functions are hoisted and assigned exports shortly)
  transformFunctionDeclaration(tree) {
    // simply note the function declaration to do assignment in the declaration phase later
    if (this.inExport_) {
      let name = tree.name.getStringValue();
      this.addLocalExportBinding(name);
      this.addExportFunction(name);
      this.inExport_ = false;
    }
    return super.transformFunctionDeclaration(tree);
  }

  transformNamedExport(tree) {
    // visit the module specifier, which sets the current dependency index
    this.transformAny(tree.moduleSpecifier);

    let exportClause = this.transformAny(tree.exportClause);

    if (this.curDepIndex_ === null) {
      // if it is an export statement, it just becomes the variable declarations
      return exportClause;
    }
    // if it is a re-export, it becomes empty
    return new AnonBlock(null, []);
  }

  transformImportDeclaration(tree) {
    // import {id} from 'module'
    // import id from 'module'
    //  =>
    // var id;
    //
    // import {id, id2 as newid} from 'module'
    // =>
    // var id, newid;
    //
    // import 'module'
    // =>
    // <empty>
    //
    // import * as m from 'module';
    // =>
    // var m;
    //
    this.curDepIndex_ = this.getOrCreateDependencyIndex(tree.moduleSpecifier);

    let initializer = this.transformAny(tree.moduleSpecifier);

    if (!tree.importClause) {
      return new AnonBlock(null, []);
    }

    // visit the import clause to store the bindings
    let importClause = this.transformAny(tree.importClause);

    if (tree.importClause.type === NAME_SPACE_IMPORT) {
      // we visit the declaration only
      let bindingIdentifier = tree.importClause.binding.binding;
      let name = bindingIdentifier.getStringValue();
      this.addModuleBinding(this.curDepIndex_, name);
      return parseStatement `var ${bindingIdentifier};`;
    }

    if (tree.importClause.type === IMPORT_SPECIFIER_SET) {
      // loop each specifier generating the variable declaration list
      return importClause;
    }

    // import default form
    let bindingName = tree.importClause.binding.getStringValue();
    this.addImportBinding(this.curDepIndex_, bindingName, 'default');
    return parseStatement `var ${bindingName};`;
  }

  transformImportSpecifierSet(tree) {
    return createVariableStatement(
        createVariableDeclarationList(VAR, this.transformList(tree.specifiers)));
  }

  transformExportDefault(tree) {
    //
    // export default function p() {}
    // =>
    // function p() {}
    //
    // export default class Q ...
    // =>
    // $__export('default', ...expression...)
    // (classes don't hoist)
    //
    // export default ...
    // =>
    // $__export('default', ...)
    //
    this.inExport_ = false;
    let expression = this.transformAny(tree.expression);
    this.addLocalExportBinding('default');

    // convert class into a class expression
    if (expression.type === CLASS_DECLARATION) {
      expression = new ClassExpression(expression.location, expression.name,
          expression.superClass, expression.elements, expression.annotations,
          expression.typeParameters);
    }

    if (expression.type === FUNCTION_DECLARATION) {
      this.addExportFunction('default', expression.name.identifierToken.value);
      return expression;
    } else {
      return parseStatement `$__export('default', ${expression});`;
    }
  }

  transformExportSpecifier(tree) {
    let exportName;
    let bindingName;

    if (tree.rhs) {
      exportName = tree.rhs.value;
      bindingName = tree.lhs.value;
    } else {
      exportName = tree.lhs.value;
      bindingName = exportName;
    }

    if (this.curDepIndex_ !== null) {
      this.addExternalExportBinding(this.curDepIndex_, exportName, bindingName);
    } else {
      this.addLocalExportBinding(exportName, bindingName);
      return parseExpression `$__export(${exportName}, ${id(bindingName)});`;
    }
  }

  // export {a, b as c}
  // =>
  // $__export('a', a), $__export('c', b);
  transformExportSpecifierSet(tree) {
    let specifiers = this.transformList(tree.specifiers);
    return new ExpressionStatement(tree.location,
        new CommaExpression(tree.location,
                            specifiers.filter((specifier) => specifier)));
  }

  transformNameSpaceExport(tree) {
    this.addExternalExportBinding(this.curDepIndex_, tree.name.value, null);
    return tree;
  }

  transformForwardDefaultExport(tree) {
    this.addExternalExportBinding(this.curDepIndex_, tree.name.value, 'default');
    return tree;
  }

  transformImportSpecifier(tree) {
    let localBinding = tree.binding.binding;
    let localBindingToken = localBinding.identifierToken;
    let importName = (tree.name || localBindingToken).value;
    this.addImportBinding(this.curDepIndex_, localBindingToken.value,
                          importName);
    return new VariableDeclaration(tree.location, localBinding, null, null);
  }

  transformModuleSpecifier(tree) {
    this.curDepIndex_ = this.getOrCreateDependencyIndex(tree);
    return tree;
  }
}
