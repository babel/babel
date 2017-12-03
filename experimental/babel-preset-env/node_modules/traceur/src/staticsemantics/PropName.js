// Copyright 2013 Traceur Authors.
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
  COMPUTED_PROPERTY_NAME,
  GET_ACCESSOR,
  LITERAL_PROPERTY_NAME,
  METHOD,
  PROPERTY_NAME_ASSIGNMENT,
  PROPERTY_NAME_SHORTHAND,
  SET_ACCESSOR
} from '../syntax/trees/ParseTreeType.js';
import {IDENTIFIER} from '../syntax/TokenType.js';

/**
 * Matches "Static Semantics: PropName" in the spec.
 * @param {ParseTree} tree
 * @return {string}
 */
export function propName(tree) {
  switch (tree.type) {
    case LITERAL_PROPERTY_NAME: {
      let token = tree.literalToken;
      if (token.isKeyword() || token.type === IDENTIFIER)
        return token.toString();
      return String(tree.literalToken.processedValue);
    }
    case COMPUTED_PROPERTY_NAME:
      return '';
    case PROPERTY_NAME_SHORTHAND:
      return tree.name.toString();
    case METHOD:
    case PROPERTY_NAME_ASSIGNMENT:
    case GET_ACCESSOR:
    case SET_ACCESSOR:
      return propName(tree.name);
  }
}
