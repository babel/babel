"use strict";

var _foob, _foob$test;
var _toArray = function (arr) { if (Array.isArray(arr)) { var arr2 = []; for (var i = 0; i < arr.length; i++) arr2.push(arr[i]); return arr2; } else { return Array.from(arr); } };

(_foob = foob).add.apply(_foob, [foo, bar].concat(_toArray(numbers)));
(_foob$test = foob.test).add.apply(_foob$test, [foo, bar].concat(_toArray(numbers)));
