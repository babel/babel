/**
 * Copyright (c) 2013, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var hasOwn = Object.prototype.hasOwnProperty;

exports.guessTabWidth = function(source) {
  var counts = []; // Sparse array.
  var lastIndent = 0;

  source.split("\n").forEach(function(line) {
    var indent = /^\s*/.exec(line)[0].length;
    var diff = Math.abs(indent - lastIndent);
    counts[diff] = ~~counts[diff] + 1;
    lastIndent = indent;
  });

  var maxCount = -1;
  var result = 2;

  for (var tabWidth = 1;
       tabWidth < counts.length;
       tabWidth += 1) {
    if (tabWidth in counts &&
        counts[tabWidth] > maxCount) {
      maxCount = counts[tabWidth];
      result = tabWidth;
    }
  }

  return result;
};

exports.defaults = function(obj) {
  var len = arguments.length;
  var extension;

  for (var i = 1; i < len; ++i) {
    if ((extension = arguments[i])) {
      for (var key in extension) {
        if (hasOwn.call(extension, key) && !hasOwn.call(obj, key)) {
          obj[key] = extension[key];
        }
      }
    }
  }

  return obj;
};