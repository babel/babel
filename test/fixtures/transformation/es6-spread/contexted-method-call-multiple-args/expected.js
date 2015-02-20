"use strict";

var _foob, _foob$test;

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

(_foob = foob).add.apply(_foob, [foo, bar].concat(_toConsumableArray(numbers)));
(_foob$test = foob.test).add.apply(_foob$test, [foo, bar].concat(_toConsumableArray(numbers)));
