"use strict";

var _propKey2, _obj2, _propKey4;
var _hasOwn = Object.prototype.hasOwnProperty;
var obj = {};

if (!_hasOwn.call(obj, "x")) obj.x = 2;


console.log((!_hasOwn.call(obj, "x") && (obj.x = 2), obj.x));

var _propKey = x();

if (!_hasOwn.call(obj, _propKey)) obj[_propKey] = 2;


console.log((_propKey2 = x(), !_hasOwn.call(obj, _propKey2) && (obj[_propKey2] = 2), obj[_propKey2]));

var _obj = obj[y()];
var _propKey3 = x();

if (!_hasOwn.call(_obj, _propKey3)) _obj[_propKey3] = 2;


console.log((_obj2 = obj[y()], _propKey4 = x(), !_hasOwn.call(_obj2, _propKey4) && (_obj2[_propKey4] = 2), _obj2[_propKey4]));
