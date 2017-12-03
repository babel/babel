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
  ARROW_FUNCTION,
  CLASS_DECLARATION,
  CLASS_EXPRESSION,
  FUNCTION_BODY,
  FUNCTION_DECLARATION,
  FUNCTION_EXPRESSION,
  GET_ACCESSOR,
  METHOD,
  MODULE,
  SCRIPT,
  SET_ACCESSOR
} from '../syntax/trees/ParseTreeType.js';
import {hasUseStrict} from './util.js';

export function isTreeStrict(tree) {
  switch (tree.type) {
    case CLASS_DECLARATION:
    case CLASS_EXPRESSION:
    case MODULE:
      return true;

    case FUNCTION_BODY:
      return hasUseStrict(tree.statements);

    case FUNCTION_EXPRESSION:
    case FUNCTION_DECLARATION:
    case METHOD:
      return isTreeStrict(tree.body);

    case ARROW_FUNCTION:
      if (tree.body.type === FUNCTION_BODY) {
        return isTreeStrict(tree.body);
      }
      return false;

    case GET_ACCESSOR:
    case SET_ACCESSOR:
      return isTreeStrict(tree.body);

    case SCRIPT:
      return hasUseStrict(tree.scriptItemList);

    default:
      return false;
  }
}
