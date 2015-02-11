"use strict";

var _applyConstructor = function (Constructor, args) { var instance = Object.create(Constructor.prototype); var result = Constructor.apply(instance, args); return result != null && (typeof result == "object" || typeof result == "function") ? result : instance; };

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { var arr2 = []; for (var i = 0; i < arr.length; i++) arr2.push(arr[i]); return arr2; } else { return Array.from(arr); } };

_applyConstructor(Numbers, _toConsumableArray(nums));
_applyConstructor(Numbers, [1].concat(_toConsumableArray(nums)));