// Copyright 2015 Traceur Authors.
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
  ClassDeclaration,
  ClassExpression,
  FormalParameterList,
  IdentifierExpression,
  Method,
  ReturnStatement,
} from '../syntax/trees/ParseTrees.js';
import {
  GET_ACCESSOR,
  METHOD,
  PROPERTY_VARIABLE_DECLARATION,
  SET_ACCESSOR,
} from '../syntax/trees/ParseTreeType.js';
import {TempVarTransformer} from './TempVarTransformer.js';
import {
  createCommaExpression,
  createFunctionBody,
  createIdentifierToken,
  createImmediatelyInvokedFunctionExpression,
  createLiteralPropertyName,
  createRestParameter,
} from './ParseTreeFactory.js';
import {
  parsePropertyDefinition,
  parseStatement,
} from './PlaceholderParser.js';
import {parseExpression} from './PlaceholderParser.js';
import {prependStatements} from './PrependStatements.js';
import {propName} from '../staticsemantics/PropName.js';
import {transformConstructor} from './MemberVariableConstructorTransformer.js';

/**
 * Transforms post ES6 member variable declarations to valid ES6 classes.
 *
 * - instance variables are initialized in the constructor,
 * - static variables are initialized after the class definition,
 *   through `Object.defineProperty(...)`
 *
 *   class C {
 *     x = 42;
 *   }
 *
 * To:
 *
 *   class C {
 *     constructor() {
 *       this.x = 42;
 *     }
 *   }
 */
export class MemberVariableTransformer extends TempVarTransformer {
  transformClassElements_(tree) {
    let elements = [];
    let initInstanceVars = [], initStaticVars = [];
    let constructor;
    let constructorIndex = 0;

    tree.elements.forEach((tree) => {
      let initVars;
      if (tree.isStatic) {
        initVars = initStaticVars;
      } else {
        initVars = initInstanceVars;
      }

      switch (tree.type) {
        case GET_ACCESSOR:
        case SET_ACCESSOR:
          elements.push(this.transformAny(tree));
          break;

        case METHOD:
          if (!tree.isStatic && propName(tree) === CONSTRUCTOR) {
            constructor = tree;
            constructorIndex = elements.length;
          } else {
            elements.push(this.transformAny(tree));
          }
          break;

        case PROPERTY_VARIABLE_DECLARATION:
          tree = this.transformAny(tree);
          if (tree.initializer !== null) {
            initVars.push(tree);
          }
          break;

        default:
          throw new Error(`Unexpected class element: ${tree.type}`);
      }
    });

    if (initInstanceVars.length > 0) {
      let initExpression = getInstanceInitExpression(initInstanceVars);

      if (!constructor) {
        constructor = this.getDefaultConstructor_(tree);
      }

      constructor = transformConstructor(constructor, initExpression,
          tree.superClass);
    }

    if (constructor) {
      elements.splice(constructorIndex, 0, constructor);
    }

    return {
      elements,
      initStaticVars,
    };
  }

  /**
   * Transforms a single class declaration
   *
   * @param {ClassDeclaration} tree
   * @return {ParseTree}
   */
  transformClassDeclaration(tree) {
    let {
      elements,
      initStaticVars,
    } = this.transformClassElements_(tree);

    let superClass = this.transformAny(tree.superClass);
    let classDecl = new ClassDeclaration(tree.location, tree.name, superClass,
        elements, tree.annotations, tree.typeParameters);

    if (initStaticVars.length === 0) {
      return classDecl;
    }

    let statements =
        createStaticInitializerStatements(tree.name.identifierToken,
                                          initStaticVars);
    statements = prependStatements(statements, classDecl);

    return new AnonBlock(null, statements);
  }

  /**
   * Transforms a single class expression
   *
   * @param {ClassExpression} tree
   * @return {ParseTree}
   */
  transformClassExpression(tree) {
    let {
      elements,
      initStaticVars,
    } = this.transformClassElements_(tree);

    let superClass = this.transformAny(tree.superClass);
    let classExpression = new ClassExpression(tree.location, tree.name,
        superClass, elements, tree.annotations, tree.typeParameters);

    if (initStaticVars.length === 0) {
      return classExpression;
    }

    this.pushTempScope();
    let id = this.getTempIdentifier();
    let idToken = createIdentifierToken(id);
    let idExpression = new IdentifierExpression(idToken.location, idToken);
    let statements = [
      parseStatement `let ${id} = ${classExpression}`,
      ...createStaticInitializerStatements(idToken, initStaticVars),
      new ReturnStatement(null, idExpression)
    ];
    let body = createFunctionBody(statements);
    this.popTempScope();

    return createImmediatelyInvokedFunctionExpression(body);
  }

  getDefaultConstructor_(tree) {
    if (tree.superClass) {
      let param = createRestParameter(createIdentifierToken('args'));
      let paramList = new FormalParameterList(null, [param]);
      let body = createFunctionBody([parseStatement `super(...args)`]);
      let name = createLiteralPropertyName(CONSTRUCTOR);
      return new Method(tree.location, false, null, name,
          paramList, null, [], body, null);
    }

    return parsePropertyDefinition `constructor() {}`;
  }
}

// TODO(vicb): Does not handle computed properties
function createStaticInitializerStatements(idToken, initStaticMemberVars) {
  let className = new IdentifierExpression(idToken.location, idToken);
  return initStaticMemberVars.map((mv) => {
    let propName = mv.name.literalToken.value;
    return parseStatement
        `Object.defineProperty(${className}, ${propName}, {enumerable: true,
        configurable: true, value: ${mv.initializer}, writable: true})`;
  });
}

// TODO(vicb): Does not handle computed properties
function getInstanceInitExpression(initInstanceVars) {
  let expressions = initInstanceVars.map((mv) => {
    let name = mv.name.literalToken;
    return parseExpression `this.${name} = ${mv.initializer}`;
  });
  return createCommaExpression(expressions);
}
