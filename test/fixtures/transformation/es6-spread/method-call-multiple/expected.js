"use strict";

var _toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

add.apply(null, [foo].concat(_toArray(numbers), [bar, what], _toArray(test)));
