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

import {STRICT_KEYWORD} from './Keywords.js';
import {Token} from './Token.js';

export class KeywordToken extends Token {
  /**
   * @param {TokenType} type
   * @param {number|undefined} keywordType
   * @param {SourceRange} location
   */
  constructor(type, keywordType, location) {
    super(type, location);
    this.isStrictKeyword_ = keywordType === STRICT_KEYWORD;
  }

  isKeyword() {
    return true;
  }

  isStrictKeyword() {
    return this.isStrictKeyword_;
  }
}
