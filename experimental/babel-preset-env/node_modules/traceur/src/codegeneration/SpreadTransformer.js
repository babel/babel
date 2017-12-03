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
  APPLY,
  BIND,
  FUNCTION,
  PROTOTYPE
} from '../syntax/PredefinedName.js';
import {
  MEMBER_EXPRESSION,
  MEMBER_LOOKUP_EXPRESSION,
  SPREAD_EXPRESSION
} from  '../syntax/trees/ParseTreeType.js';
import {Script} from '../syntax/trees/ParseTrees.js';
import {TempVarTransformer} from './TempVarTransformer.js';
import ImportRuntimeTrait from './ImportRuntimeTrait.js';
import {
  createArgumentList,
  createArrayLiteral,
  createAssignmentExpression,
  createCallExpression,
  createEmptyArgumentList,
  createIdentifierExpression,
  createMemberExpression,
  createMemberLookupExpression,
  createNewExpression,
  createNullLiteral,
  createParenExpression,
  createVoid0
} from './ParseTreeFactory.js';
import {
  parseExpression,
  parseStatement,
} from './PlaceholderParser.js';
import {prependStatements} from './PrependStatements.js';

function hasSpreadMember(trees) {
  return trees.some((tree) => tree && tree.type === SPREAD_EXPRESSION);
}

/**
 * Desugars spread in arrays.
 * TODO(arv): spread in array patterns
 *
 * @see <a href="http://wiki.ecmascript.org/doku.php?id=harmony:spread">harmony:spread</a>
 */
export class SpreadTransformer extends ImportRuntimeTrait(TempVarTransformer) {
  /**
   * Creates an expression that results in an array where all the elements are
   * spread.
   *
   *   ...xs, x, ...ys, y, z
   *
   * transforms to something like
   *
   *   _spread(xs, [x], ys, [y, z])
   *
   * @param {Array.<ParseTree>} elements
   * @return {CallExpression}
   * @private
   */
  createArrayFromElements_(elements) {
    let length = elements.length;

    // Coalesce multiple non spread elements.
    let args = [];
    let lastArray;
    for (let i = 0; i < length; i++) {
      // Arrays can contain holes which are represented by null.
      if (elements[i] && elements[i].type === SPREAD_EXPRESSION) {
        if (lastArray) {
          args.push(createArrayLiteral(lastArray));
          lastArray = null;
        }
        args.push(
            this.transformAny(elements[i].expression));
      } else {
        if (!lastArray)
          lastArray = [];
        lastArray.push(this.transformAny(elements[i]));
      }
    }
    if (lastArray)
      args.push(createArrayLiteral(lastArray));

    const spread = this.getRuntimeExpression('spread');
    return parseExpression `${spread}(${createArgumentList(args)})`;
  }

  desugarCallSpread_(tree) {
    let operand = this.transformAny(tree.operand);
    let functionObject, contextObject;

    this.pushTempScope();

    if (operand.type === MEMBER_EXPRESSION) {
      // expr.fun(a, ...b, c)
      //
      // ($tmp = expr).fun.apply($tmp, expandedArgs)

      let tempIdent = createIdentifierExpression(this.addTempVar());
      let parenExpression = createParenExpression(
          createAssignmentExpression(tempIdent, operand.operand));
      let memberName = operand.memberName;

      contextObject = tempIdent;
      functionObject = createMemberExpression(parenExpression, memberName);

    } else if (tree.operand.type === MEMBER_LOOKUP_EXPRESSION) {
      // expr[fun](a, ...b, c)
      //
      // ($tmp = expr)[fun].apply($tmp, expandedArgs)

      let tempIdent = createIdentifierExpression(this.addTempVar());
      let parenExpression = createParenExpression(
          createAssignmentExpression(tempIdent, operand.operand));
      let memberExpression = this.transformAny(operand.memberExpression);

      contextObject = tempIdent;
      functionObject = createMemberLookupExpression(parenExpression,
                                                    memberExpression);

    } else {

      // f(a, ...b, c)
      //
      // f.apply(undefined, expandedArgs)
      contextObject = createVoid0();
      functionObject = operand;
    }

    this.popTempScope();

    // functionObject.apply(contextObject, expandedArgs)
    let arrayExpression = this.createArrayFromElements_(tree.args.args);
    return createCallExpression(
        createMemberExpression(functionObject, APPLY),
        createArgumentList([contextObject, arrayExpression]));
  }

  desugarNewSpread_(tree) {
    // new Fun(a, ...b, c)
    //
    // new (Function.prototype.bind.apply(Fun, [null, ... args]))

    let arrayExpression = [createNullLiteral(), ...tree.args.args];
    arrayExpression = this.createArrayFromElements_(arrayExpression);

    return createNewExpression(
        createParenExpression(
            createCallExpression(
              createMemberExpression(FUNCTION, PROTOTYPE, BIND, APPLY),
              createArgumentList([
                this.transformAny(tree.operand),
                arrayExpression
              ]))),
        createEmptyArgumentList());
  }

  transformArrayLiteral(tree) {
    if (hasSpreadMember(tree.elements)) {
      return this.createArrayFromElements_(tree.elements);
    }
    return super.transformArrayLiteral(tree);
  }

  transformCallExpression(tree) {
    if (hasSpreadMember(tree.args.args)) {
      return this.desugarCallSpread_(tree);
    }
    return super.transformCallExpression(tree);
  }

  transformNewExpression(tree) {
    if (tree.args !== null && hasSpreadMember(tree.args.args)) {
      return this.desugarNewSpread_(tree);
    }
    return super.transformNewExpression(tree);
  }
}
