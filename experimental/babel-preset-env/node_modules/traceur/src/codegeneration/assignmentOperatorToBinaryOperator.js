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
  AMPERSAND,
  AMPERSAND_EQUAL,
  BAR,
  BAR_EQUAL,
  CARET,
  CARET_EQUAL,
  LEFT_SHIFT,
  LEFT_SHIFT_EQUAL,
  MINUS,
  MINUS_EQUAL,
  PERCENT,
  PERCENT_EQUAL,
  PLUS,
  PLUS_EQUAL,
  RIGHT_SHIFT,
  RIGHT_SHIFT_EQUAL,
  SLASH,
  SLASH_EQUAL,
  STAR,
  STAR_EQUAL,
  STAR_STAR,
  STAR_STAR_EQUAL,
  UNSIGNED_RIGHT_SHIFT,
  UNSIGNED_RIGHT_SHIFT_EQUAL
} from '../syntax/TokenType.js';

/**
 * Returns the binary operator that the assignment operator should use. For
 * example *= should use *.
 */
function assignmentOperatorToBinaryOperator(type) {
  switch (type) {
    case STAR_EQUAL:
      return STAR;
    case STAR_STAR_EQUAL:
      return STAR_STAR;
    case SLASH_EQUAL:
      return SLASH;
    case PERCENT_EQUAL:
      return PERCENT;
    case PLUS_EQUAL:
      return PLUS;
    case MINUS_EQUAL:
      return MINUS;
    case LEFT_SHIFT_EQUAL:
      return LEFT_SHIFT;
    case RIGHT_SHIFT_EQUAL:
      return RIGHT_SHIFT;
    case UNSIGNED_RIGHT_SHIFT_EQUAL:
      return UNSIGNED_RIGHT_SHIFT;
    case AMPERSAND_EQUAL:
      return AMPERSAND;
    case CARET_EQUAL:
      return CARET;
    case BAR_EQUAL:
      return BAR;
    default:
      throw Error('unreachable');
  }
}

export default assignmentOperatorToBinaryOperator;
