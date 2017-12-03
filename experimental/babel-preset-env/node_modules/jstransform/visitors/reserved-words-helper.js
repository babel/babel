/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var KEYWORDS = [
  'break', 'do', 'in', 'typeof', 'case', 'else', 'instanceof', 'var', 'catch',
  'export', 'new', 'void', 'class', 'extends', 'return', 'while', 'const',
  'finally', 'super', 'with', 'continue', 'for', 'switch', 'yield', 'debugger',
  'function', 'this', 'default', 'if', 'throw', 'delete', 'import', 'try'
];

var FUTURE_RESERVED_WORDS = [
  'enum', 'await', 'implements', 'package', 'protected', 'static', 'interface',
  'private', 'public'
];

var LITERALS = [
  'null',
  'true',
  'false'
];

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-reserved-words
var RESERVED_WORDS = [].concat(
  KEYWORDS,
  FUTURE_RESERVED_WORDS,
  LITERALS
);

var reservedWordsMap = Object.create(null);
RESERVED_WORDS.forEach(function(k) {
    reservedWordsMap[k] = true;
});

/**
 * This list should not grow as new reserved words are introdued. This list is
 * of words that need to be quoted because ES3-ish browsers do not allow their
 * use as identifier names.
 */
var ES3_FUTURE_RESERVED_WORDS = [
  'enum', 'implements', 'package', 'protected', 'static', 'interface',
  'private', 'public'
];

var ES3_RESERVED_WORDS = [].concat(
  KEYWORDS,
  ES3_FUTURE_RESERVED_WORDS,
  LITERALS
);

var es3ReservedWordsMap = Object.create(null);
ES3_RESERVED_WORDS.forEach(function(k) {
    es3ReservedWordsMap[k] = true;
});

exports.isReservedWord = function(word) {
  return !!reservedWordsMap[word];
};

exports.isES3ReservedWord = function(word) {
  return !!es3ReservedWordsMap[word];
};
