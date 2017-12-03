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

import {ParseTreeTransformer} from './ParseTreeTransformer.js';
import {RewriteTailExpressionsTransformer} from
    './RewriteTailExpressionsTransformer.js';
import {
  ReturnStatement,
  TryStatement
} from '../syntax/trees/ParseTrees.js';
import SkipFunctionsTransformerTrait from './SkipFunctionsTransformerTrait.js';

export class RewriteTailCallsTransformer extends
    SkipFunctionsTransformerTrait(ParseTreeTransformer) {
  constructor(bodyTransformer) {
    super();
    this.bodyTransformer_ = bodyTransformer;
  }

  transformReturnStatement(tree) {
    let expression = tree.expression;
    if (expression !== null) {
      expression = RewriteTailExpressionsTransformer.transform(
          this.bodyTransformer_, expression);
      if (expression !== tree.expression) {
        return new ReturnStatement(tree.location, expression);
      }
    }
    return tree;
  }

  transformTryStatement(tree) {
    let block;
    if (tree.finallyBlock !== null) {
      block = this.transformAny(tree.finallyBlock);
      if (block !== tree.finallyBlock) {
        return new TryStatement(tree.location, tree.body, tree.catchBlock,
            block);
      }
    } else {
      block = this.transformAny(tree.catchBlock);
      if (block !== tree.catchBlock) {
        return new TryStatement(tree.location, tree.body, block,
            tree.finallyBlock);
      }
    }
    return tree;
  }

  transformForInStatement(tree) {return tree;}
  transformForOfStatement(tree) {return tree;}
  transformForOnStatement(tree) {return tree;}
  transformClassDeclaration(tree) {return tree;}
  transformClassExpression(tree) {return tree;}
  transformExpressionStatement(tree) {return tree;}
  transformComprehensionFor(tree) {return tree;}
  transformVariableStatement(tree) {return tree;}

  static transform(bodyTransformer, tree) {
    return new RewriteTailCallsTransformer(bodyTransformer).transformAny(tree);
  }
}
