"use strict";

var _toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

foob.add.apply(foob, _toArray(numbers));
foob.test.add.apply(foob.test, _toArray(numbers));
