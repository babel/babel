// Copyright 2012 Traceur Authors.
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
  AMPERSAND_EQUAL,
  BAR_EQUAL,
  CARET_EQUAL,
  EQUAL,
  LEFT_SHIFT_EQUAL,
  MINUS_EQUAL,
  PERCENT_EQUAL,
  PLUS_EQUAL,
  RIGHT_SHIFT_EQUAL,
  SLASH_EQUAL,
  STAR_EQUAL,
  STAR_STAR_EQUAL,
  UNSIGNED_RIGHT_SHIFT_EQUAL
} from './TokenType.js';

/**
 * A Token in a javascript file.
 * Immutable.
 * A plain old data structure. Should contain data members and simple
 * accessors only.
 */
export class Token {
  /**
   * @param {TokenType} type
   * @param {SourceRange} location
   */
  constructor(type, location) {
    this.type = type;
    this.location = location;
  }

  toString() {
    return this.type;
  }

  /** @return {boolean} */
  isAssignmentOperator() {
    return isAssignmentOperator(this.type);
  }

  isKeyword() {
    return false;
  }

  isStrictKeyword() {
    return false;
  }
}

export function isAssignmentOperator(type) {
  switch (type) {
    case AMPERSAND_EQUAL:
    case BAR_EQUAL:
    case CARET_EQUAL:
    case EQUAL:
    case LEFT_SHIFT_EQUAL:
    case MINUS_EQUAL:
    case PERCENT_EQUAL:
    case PLUS_EQUAL:
    case RIGHT_SHIFT_EQUAL:
    case SLASH_EQUAL:
    case STAR_EQUAL:
    case STAR_STAR_EQUAL:
    case UNSIGNED_RIGHT_SHIFT_EQUAL:
      return true;
  }
  return false;
}
