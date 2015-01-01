"use strict";

var _ref2, _obj2, _ref4;
var _hasOwn = Object.prototype.hasOwnProperty;
var obj = {};

if (!_hasOwn.call(obj, "x")) obj.x = 2;


console.log((!_hasOwn.call(obj, "x") && (obj.x = 2), obj.x));

var _ref = x();

if (!_hasOwn.call(obj, _ref)) obj[_ref] = 2;


console.log((_ref2 = x(), !_hasOwn.call(obj, _ref2) && (obj[_ref2] = 2), obj[_ref2]));

var _obj = obj[y()];
var _ref3 = x();

if (!_hasOwn.call(_obj, _ref3)) _obj[_ref3] = 2;


console.log((_obj2 = obj[y()], _ref4 = x(), !_hasOwn.call(_obj2, _ref4) && (_obj2[_ref4] = 2), _obj2[_ref4]));
