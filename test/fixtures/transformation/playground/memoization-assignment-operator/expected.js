"use strict";

var _obj2, _obj4, _ref2, _obj6, _ref4;
var _hasOwn = Object.prototype.hasOwnProperty;
var obj = {};

var _obj = obj;
if (!_hasOwn.call(_obj, "x")) _obj.x = 2;


console.log((_obj2 = obj, !_hasOwn.call(_obj2, "x") && (_obj2.x = 2), _obj2.x));

var _obj3 = obj;
var _ref = x();

if (!_hasOwn.call(_obj3, _ref)) _obj3[_ref] = 2;


console.log((_obj4 = obj, _ref2 = x(), !_hasOwn.call(_obj4, _ref2) && (_obj4[_ref2] = 2), _obj4[_ref2]));

var _obj5 = obj[y()];
var _ref3 = x();

if (!_hasOwn.call(_obj5, _ref3)) _obj5[_ref3] = 2;


console.log((_obj6 = obj[y()], _ref4 = x(), !_hasOwn.call(_obj6, _ref4) && (_obj6[_ref4] = 2), _obj6[_ref4]));
