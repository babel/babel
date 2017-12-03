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

import {
  IDENTIFIER_EXPRESSION,
  MEMBER_EXPRESSION,
  MEMBER_LOOKUP_EXPRESSION,
  PAREN_EXPRESSION,
} from '../syntax/trees/ParseTreeType.js';

/**
 * Matches "Static Semantics: IsValidSimpleAssignmentTarget" in the spec.
 * @param {ParseTree} tree
 * @return {boolean}
 */
export default function isValidSimpleAssignmentTarget(tree, isStrict) {
  switch (tree.type) {
    case IDENTIFIER_EXPRESSION: {
      if (!isStrict) return true;
      let {value} = tree.identifierToken;
      return value !== 'arguments' && value !== 'eval';
    }

    case PAREN_EXPRESSION:
      return isValidSimpleAssignmentTarget(tree.expression, isStrict);

    case MEMBER_EXPRESSION:
    case MEMBER_LOOKUP_EXPRESSION:
      return true;

    default:
      return false;
  }
}
