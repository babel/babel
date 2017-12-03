// Copyright 2012 Traceur Authors.
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
  CONSTRUCTOR
} from '../syntax/PredefinedName.js';
import {
  AnonBlock,
  ClassExpression,
  ExportDeclaration,
  ExportSpecifier,
  ExportSpecifierSet,
  FunctionDeclaration,
  FunctionExpression,
  GetAccessor,
  Method,
  NamedExport,
  SetAccessor
} from '../syntax/trees/ParseTrees.js';
import {
  CLASS_DECLARATION,
  COMPUTED_PROPERTY_NAME,
  EXPORT_DEFAULT,
  GET_ACCESSOR,
  LITERAL_PROPERTY_NAME,
  METHOD,
  SET_ACCESSOR,
} from '../syntax/trees/ParseTreeType.js';
import {TempVarTransformer} from './TempVarTransformer.js';
import {
  CONST,
  LET,
  VAR,
  STRING
} from '../syntax/TokenType.js';
import {MakeStrictTransformer} from './MakeStrictTransformer.js';
import {ParenTrait} from './ParenTrait.js';
import ImportRuntimeTrait from './ImportRuntimeTrait.js';
import {
  createBindingIdentifier,
  createIdentifierExpression as id,
  createIdentifierToken,
  createObjectLiteral,
  createVariableStatement,
} from './ParseTreeFactory.js';
import {hasUseStrict} from '../semantics/util.js';
import {
  parseExpression,
  parsePropertyDefinition,
  parseStatement,
} from './PlaceholderParser.js';

// Maximally minimal classes
//
//   http://wiki.ecmascript.org/doku.php?id=strawman:maximally_minimal_classes
//
// This transforms class declarations and class expressions.
//
//   class C extends B {
//     constructor(x) {
//       super();
//     }
//     method() {
//       super.m();
//     }
//   }
//
//   =>
//
//   var C = function(x) {
//     $traceurRuntime.superConstructor($C).call(this));
//   };
//   var $C = $traceurRuntime.createClass(C, {
//     method: function() {
//       $traceurRuntime.superGet(this, $C.prototype, 'm').call(this);
//     }
//   }, {}, B);
//
// The super property and super calls are transformed in the SuperTransformer.

function methodNameFromTree(tree) {
  // COMPUTED_PROPERTY_NAME such as [Symbol.iterator]
  if (tree.type === COMPUTED_PROPERTY_NAME) {
    return '';
  }

  if (tree.literalToken && tree.literalToken.type === STRING) {
    return tree.getStringValue().substr(1, -1);
  }

  // identifier, delete, import, catch, etc.
  return tree.getStringValue();
}

function classMethodDebugName(className, methodName, isStatic) {
  if (isStatic) {
    return createBindingIdentifier('$__' + className + '_' + methodName);
  }

  return createBindingIdentifier('$__' + className + '_prototype_' + methodName);
}

function functionExpressionToDeclaration(tree, name) {
  if (tree.name === null) {
    name = createBindingIdentifier(name);
  } else {
    name = tree.name;
  }
  return new FunctionDeclaration(tree.location, name, tree.functionKind,
      tree.parameterList, tree.typeAnnotation, tree.annotations, tree.body);
}

function removeStaticModifier(tree) {
  switch (tree.type) {
    case GET_ACCESSOR:
      return new GetAccessor(tree.location, false, tree.name,
          tree.typeAnnotation, tree.annotations, tree.body);
    case SET_ACCESSOR:
      return new SetAccessor(tree.location, false, tree.name,
          tree.parameterList, tree.annotations, tree.body);
    case METHOD:
      return new Method(tree.location, false,
          tree.functionKind, tree.name, tree.parameterList, tree.typeAnnotation,
          tree.annotations, tree.body, tree.debugName);
    default:
      throw new Error('unreachable');
  }
}

function isConstructor(tree) {
  if (tree.type !== METHOD || tree.isStatic ||
      tree.functionKind !== null) {
    return false;
  }
  let {name} = tree;
  return name.type === LITERAL_PROPERTY_NAME &&
      name.literalToken.value === CONSTRUCTOR;
}

export class ClassTransformer extends
    ImportRuntimeTrait(ParenTrait(TempVarTransformer)) {
  /**
   * @param {UniqueIdentifierGenerator} identifierGenerator
   * @param {ErrorReporter} reporter
   * @param {Options} options
   */
  constructor(identifierGenerator, reporter, options) {
    super(identifierGenerator, reporter, options);
    this.strictCount_ = 0;
    this.state_ = null;
  }

  transformModule(tree) {
    this.strictCount_ = 1;
    return super.transformModule(tree);
  }

  transformScript(tree) {
    this.strictCount_ = hasUseStrict(tree.scriptItemList) ? 1 : 0;
    return super.transformScript(tree);
  }

  transformFunctionBody(tree) {
    let useStrict = hasUseStrict(tree.statements) ? 1 : 0;
    this.strictCount_ += useStrict;
    let result = super.transformFunctionBody(tree);
    this.strictCount_ -= useStrict;
    return result;
  }

  makeStrict_(tree) {
    if (this.strictCount_)
      return tree;

    return MakeStrictTransformer.transformTree(tree);
  }

  transformClassDeclaration(tree) {
    // `class C {}` is equivalent to `let C = class C {};`
    // Convert to class expression and transform that instead.
    let classExpression = new ClassExpression(tree.location, tree.name,
        tree.superClass, tree.elements, tree.annotations, tree.typeParameters);
    let transformed = this.transformClassExpression(classExpression);
    let useLet = !this.options.transformOptions.blockBinding &&
                 this.options.parseOptions.blockBinding;
    return createVariableStatement(useLet ? LET : VAR, tree.name, transformed);
  }

  transformClassExpression(tree) {
    let superClass = this.transformAny(tree.superClass);
    let elements = this.transformList(tree.elements);
    let annotations = this.transformList(tree.annotations);

    let constructor = null;
    let protoElements = elements.filter((tree) => {
      if (tree.isStatic) return false;
      if (isConstructor(tree)) {
        constructor = tree;
        return false;
      }
      return true;
    });
    let staticElements =
        elements.filter((tree) => tree.isStatic).map(removeStaticModifier);

    let protoObject = createObjectLiteral(protoElements);
    let staticObject = createObjectLiteral(staticElements);

    if (!constructor) {
      constructor = this.getDefaultConstructor_(tree);
    }
    let func = new FunctionExpression(tree.location, tree.name, null,
                                      constructor.parameterList, null,
                                      annotations,
                                      constructor.body);

    let expression;
    let createClass = this.getRuntimeExpression('createClass');
    if (tree.name) {
      let functionStatement;
      let name = tree.name.identifierToken;
      let nameId = id(`${name}`);

      if (!this.options.transformOptions.blockBinding &&
          this.options.parseOptions.blockBinding) {
        functionStatement = createVariableStatement(CONST, tree.name, func);
      } else {
        functionStatement = functionExpressionToDeclaration(func, name);
      }

      if (superClass) {
        expression = parseExpression `function($__super) {
          ${functionStatement};
          return (${createClass})(${nameId}, ${protoObject},
                                  ${staticObject}, $__super);
        }(${superClass})`;
      } else {
        expression = parseExpression `function() {
          ${functionStatement};
          return (${createClass})(${nameId}, ${protoObject}, ${staticObject});
        }()`;
      }
    } else {
      if (superClass) {
        expression = parseExpression
            `(${createClass})(${func}, ${protoObject}, ${staticObject}, ${superClass})`;
      } else {
        expression = parseExpression
            `(${createClass})(${func}, ${protoObject}, ${staticObject})`;
      }
    }

    return this.makeStrict_(expression);
  }

  transformExportDeclaration(tree) {
    if (tree.declaration.type === EXPORT_DEFAULT &&
        tree.declaration.expression.type === CLASS_DECLARATION) {
      // export default class name {}
      // ->
      // class name {}
      // export {name as default}
      return this.transformExportDefaultClass_(tree.declaration);
    }
    return super.transformExportDeclaration(tree);
  }

  transformExportDefaultClass_(tree) {
    const name = tree.expression.name.identifierToken;
    const specifier = new ExportSpecifier(
        name.location, name, createIdentifierToken('default'));
    const exportTree = new ExportSpecifierSet(name.location, [specifier]);
    const named = new NamedExport(name.location, exportTree, null);
    const exp = new ExportDeclaration(name.location, named, []);
    const classTree = this.transformAny(tree.expression);
    return new AnonBlock(null, [classTree, exp]);
  }

  getDefaultConstructor_(tree) {
    // TODO(arv): Move this to SuperTransformer.
    if (tree.superClass) {
      let name = id(tree.name.identifierToken);
      let superConstructor = this.getRuntimeExpression('superConstructor');
      return parsePropertyDefinition `constructor() {
        ${superConstructor}(${name}).apply(this, arguments)
      }`;
    }
    return parsePropertyDefinition `constructor() {}`;
  }
}
