"use strict";

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var _ref = ["hello", [", ", "junk"], ["world"]];

var a = _ref[0];
var _ref$1 = _slicedToArray(_ref[1], 1);

var b = _ref$1[0];
var _ref$2 = _slicedToArray(_ref[2], 1);

var c = _ref$2[0];
var d = _ref[3];
