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

/**
 * The javascript keywords.
 */
const keywords = [
  // 7.6.1.1 Keywords
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'export',
  'finally',
  'for',
  'function',
  'if',
  'import',
  'in',
  'instanceof',
  'let',  // should be in strictKeywords
  'new',
  'return',
  'super',
  'switch',
  'this',
  'throw',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',

  // 7.6.1.2 Future Reserved Words
  'enum',
  'extends',

  // 7.8 Literals
  'null',
  'true',
  'false'
];

const strictKeywords = [
  // Future Reserved Words in a strict context
  'implements',
  'interface',
  'package',
  'private',
  'protected',
  'public',
  'static',
  'yield'
];

const keywordsByName = Object.create(null);

export const NORMAL_KEYWORD = 1;
export const STRICT_KEYWORD = 2;

keywords.forEach((value) => {
  keywordsByName[value] = NORMAL_KEYWORD;
});

strictKeywords.forEach((value) => {
  keywordsByName[value] = STRICT_KEYWORD;
});

export function getKeywordType(value) {
  return keywordsByName[value];
}

export function isStrictKeyword(value) {
  return getKeywordType(value) === STRICT_KEYWORD;
}
