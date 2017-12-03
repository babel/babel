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

import ImportRuntimeTrait from './ImportRuntimeTrait.js';
import {TempVarTransformer} from './TempVarTransformer.js';
import {
  ArgumentList,
  ClassDeclaration,
  ClassExpression,
  GetAccessor,
  MemberExpression,
  Method,
  SetAccessor,
} from '../syntax/trees/ParseTrees.js';
import {
  MEMBER_EXPRESSION,
  MEMBER_LOOKUP_EXPRESSION,
  SUPER_EXPRESSION
} from '../syntax/trees/ParseTreeType.js';
import {
  EQUAL,
  MINUS_MINUS,
  PLUS_PLUS
} from '../syntax/TokenType.js';
import {
  createAssignmentExpression,
  createBindingIdentifier,
  createIdentifierExpression,
  createIdentifierToken,
  createParenExpression,
  createStringLiteral,
  createThisExpression,
} from './ParseTreeFactory.js';
import {parseExpression} from './PlaceholderParser.js';
import {ExplodeExpressionTransformer} from './ExplodeExpressionTransformer.js';

function hasSuperMemberExpression(tree) {
  return (tree.type === MEMBER_EXPRESSION ||
          tree.type === MEMBER_LOOKUP_EXPRESSION) &&
         tree.operand.type === SUPER_EXPRESSION;
}

/**
 * Used to keep track of the name of the variable representing the home object
 * as we transform the tree recursively.
 */
class State {
  constructor(transformer, home) {
    this.transformer = transformer;
    this.home_ = home;
    this.tempName = home ? null : transformer.getTempIdentifier();
    this.hasSuper = false;
  }
  get home() {
    this.hasSuper = true;
    if (this.home_ === null) {
      this.home_ =
          createIdentifierExpression(createIdentifierToken(this.tempName));
    }
    return this.home_;
  }
}

/**
 * Used to keep track of the name of the variable representing the class object
 * as we transform the tree recursively.
 */
class ClassState extends State {
  constructor(transformer, tree) {
    let home = null;
    if (tree.name !== null) {
      home = createIdentifierExpression(tree.name.identifierToken);
    }
    super(transformer, home);
    this.name_ = tree.name;
  }

  get name() {
    if (this.name_ !== null) return this.name_;
    if (this.hasSuper) {
      return createBindingIdentifier(this.home.identifierToken);
    }
    return null;
  }
}

/**
 * Used to keep track of the name of the variable representing the prototype
 * object as we transform the tree recursively.
 */
class PrototypeState extends State {
  constructor(transformer, classState) {
    super(transformer, null);
    this.classState = classState;
  }

  get home() {
    let ident = this.classState.home;
    return new MemberExpression(null, ident,
                                createIdentifierToken('prototype'));
  }
}

/**
 * Transforms super in object literals and class literals.
 *
 * For object literals we do something like this:
 *
 *   {
 *     m() { super.x(); }
 *   }
 *
 * =>
 *
 *   $tmp = { m() { $traceurRuntime.superGet(this, $tmp, "x").call(this); } }
 *
 * For classes we just ensure that the class has a name
 *
 *   class {
 *     m() { super.x() }
 *   }
 *
 * =>
 *
 *   class $tmp {
 *     m() {
 *       $traceurRuntime.superGet(this, $tmp.prototype, "x").call(this);
 *     }
 *   }
 */
export class SuperTransformer extends ImportRuntimeTrait(TempVarTransformer) {
  constructor(identifierGenerator, reporter, options) {
    super(identifierGenerator, reporter, options);
    // Pushing onto this stack is done in pairs. For classes we push one state
    // for the class object and one for the prototype object. This way we can
    // remove the prototype state as we visit static class elements. We also
    // peek at the length - 2 when we find a super() (since that needs the class
    // object).
    this.stateStack_ = [];
  }

  pushState(state) {
    this.stateStack_.push(state);
  }

  popState() {
    return this.stateStack_.pop();
  }

  peekState() {
    return this.stateStack_[this.stateStack_.length - 1];
  }

  transformObjectLiteral(tree) {
    let state = new State(this, null);
    this.pushState(state);
    this.pushState(state);
    let result = super.transformObjectLiteral(tree);
    this.popState();
    this.popState();
    if (state.hasSuper) {
      this.registerTempVarName(state.tempName);
      return createAssignmentExpression(state.home, result);
    }
    this.releaseTempName(state.tempName);
    return result;
  }

  transformClassExpression(tree) {
    let superClass = this.transformAny(tree.superClass);
    let annotations = this.transformList(tree.annotations);

    let classState = new ClassState(this, tree);
    let prototypeState = new PrototypeState(this, classState);

    this.pushState(classState);
    this.pushState(prototypeState);
    let elements = this.transformList(tree.elements);
    this.popState();
    this.popState();

    if (tree.name === null && tree.superClass !== null) {
      // In case the class expression has no constructor and it has an extends
      // clause call the home accessor for its side effect.
      classState.home;
    } else if (tree.superClass === superClass && tree.elements === elements &&
               tree.annotations === annotations) {
      return tree;
    }

    return new ClassExpression(tree.location, classState.name, superClass,
                               elements, tree.annotations, tree.typeParameters);
  }

  transformClassDeclaration(tree) {
    let superClass = this.transformAny(tree.superClass);
    let annotations = this.transformList(tree.annotations);

    let classState = new ClassState(this, tree);
    let prototypeState = new PrototypeState(this, classState);

    this.pushState(classState);
    this.pushState(prototypeState);
    let elements = this.transformList(tree.elements);
    this.popState();
    this.popState();

    if (tree.superClass === superClass && tree.elements === elements &&
        tree.annotations === annotations) {
      return tree;
    }

    return new ClassDeclaration(tree.location, tree.name, superClass, elements,
                                tree.annotations, tree.typeParameters);
  }

  transformMethod(tree) {
    let name = this.transformAny(tree.name);
    let prototypeState;
    if (tree.isStatic) {
      prototypeState = this.popState();
    }

    let parameterList = this.transformAny(tree.parameterList);
    let body = this.transformAny(tree.body);

    if (tree.isStatic) {
      this.pushState(prototypeState);
    }

    if (tree.name === name && tree.parameterList === parameterList &&
        tree.body === body) {
      return tree;
    }

    return new Method(tree.location, tree.isStatic,
        tree.functionKind, name, parameterList, tree.typeAnnotation,
        tree.annotations, body, tree.debugName);
  }

  transformGetAccessor(tree) {
    let name = this.transformAny(tree.name);
    let prototypeState;
    if (tree.isStatic) {
      prototypeState = this.popState();
    }

    let body = this.transformAny(tree.body);

    if (tree.isStatic) {
      this.pushState(prototypeState);
    }

    if (tree.name === name && tree.body === body) {
      return tree;
    }

    return new GetAccessor(tree.location, tree.isStatic, name,
        tree.typeAnnotation,
        tree.annotations, body);
  }

  transformSetAccessor(tree) {
    let name = this.transformAny(tree.name);
    let prototypeState;
    if (tree.isStatic) {
      prototypeState = this.popState();
    }

    let parameterList = this.transformAny(tree.parameterList);
    let body = this.transformAny(tree.body);

    if (tree.isStatic) {
      this.pushState(prototypeState);
    }

    if (tree.name === name && tree.parameterList === parameterList &&
        tree.body === body) {
      return tree;
    }

    return new SetAccessor(tree.location, tree.isStatic, name, parameterList,
        tree.annotations, body);
  }

  transformComputedPropertyName(tree) {
    let s1 = this.popState();
    let s2 = this.popState();
    let result = super.transformComputedPropertyName(tree);
    this.pushState(s2);
    this.pushState(s1);
    return result;
  }

  transformSuperExpression(tree) {
    throw new Error('unreachable');
  }

  transformMemberShared_(name) {
    let {home} = this.peekState();
    let superGet = this.getRuntimeExpression('superGet');
    return parseExpression `${superGet}(this, ${home}, ${name})`;
  }

  /**
   * @param {MemberExpression} tree
   * @return {ParseTree}
   */
  transformMemberExpression(tree) {
    if (tree.operand.type === SUPER_EXPRESSION) {
      return this.transformMemberShared_(tree.memberName.value);
    }
    return super.transformMemberExpression(tree);
  }

  transformMemberLookupExpression(tree) {
    if (tree.operand.type === SUPER_EXPRESSION)
      return this.transformMemberShared_(tree.memberExpression);
    return super.transformMemberLookupExpression(tree);
  }

  transformCallExpression(tree) {
    let operand, args;
    if (tree.operand.type === SUPER_EXPRESSION) {
      // super(args)
      args = this.transformAny(tree.args);
      args = new ArgumentList(tree.location, [
        createThisExpression(), ...args.args
      ]);
      let {home} = this.stateStack_[this.stateStack_.length - 2];
      let superConstructor = this.getRuntimeExpression('superConstructor');
      operand = parseExpression `${superConstructor}(${home})`;
    } else if (hasSuperMemberExpression(tree.operand)) {
      // super.x(args)
      operand = this.transformAny(tree.operand);
      args = this.transformAny(tree.args);
      args = new ArgumentList(args.location, [
        createThisExpression(), ...args.args
      ]);
    } else {
      return super.transformCallExpression(tree);
    }

    return parseExpression `${operand}.call(${args})`;
  }

  transformBinaryExpression(tree) {
    if (tree.operator.isAssignmentOperator() &&
        hasSuperMemberExpression(tree.left)) {
      if (tree.operator.type !== EQUAL) {
        let exploded =
            new ExplodeExpressionTransformer(this).transformAny(tree);
        return this.transformAny(createParenExpression(exploded));
      }

      let name = tree.left.type === MEMBER_LOOKUP_EXPRESSION ?
          tree.left.memberExpression :
          createStringLiteral(tree.left.memberName.value);

      let right = this.transformAny(tree.right);
      let {home} = this.peekState();
      let superSet = this.getRuntimeExpression('superSet');
      return parseExpression
          `${superSet}(this, ${home}, ${name}, ${right})`;
    }

    return super.transformBinaryExpression(tree);
  }

  transformUnaryExpression(tree) {
    let transformed = this.transformIncrementDecrement_(tree);
    if (transformed)
      return transformed;
    return super.transformUnaryExpression(tree);
  }

  transformPostfixExpression(tree) {
    let transformed = this.transformIncrementDecrement_(tree);
    if (transformed)
      return transformed;
    return super.transformPostfixExpression(tree);
  }

  transformIncrementDecrement_(tree) {
    let operator = tree.operator;
    let operand = tree.operand;
    if ((operator.type === PLUS_PLUS || operator.type === MINUS_MINUS) &&
        hasSuperMemberExpression(operand)) {
      let exploded = new ExplodeExpressionTransformer(this).transformAny(tree);
      if (exploded !== tree)
        exploded = createParenExpression(exploded);
      return this.transformAny(exploded);
    }

    return null;
  }
}
