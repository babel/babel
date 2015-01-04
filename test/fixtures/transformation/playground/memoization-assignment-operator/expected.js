"use strict";

var _obj2, _obj4, _x2, _obj$y2, _x4;
var _hasOwn = Object.prototype.hasOwnProperty;
var obj = {};

var _obj = obj;
if (!_hasOwn.call(_obj, "x")) _obj.x = 2;


console.log((_obj2 = obj, !_hasOwn.call(_obj2, "x") && (_obj2.x = 2), _obj2.x));

var _obj3 = obj;
var _x = x();

if (!_hasOwn.call(_obj3, _x)) _obj3[_x] = 2;


console.log((_obj4 = obj, _x2 = x(), !_hasOwn.call(_obj4, _x2) && (_obj4[_x2] = 2), _obj4[_x2]));

var _obj$y = obj[y()];
var _x3 = x();

if (!_hasOwn.call(_obj$y, _x3)) _obj$y[_x3] = 2;


console.log((_obj$y2 = obj[y()], _x4 = x(), !_hasOwn.call(_obj$y2, _x4) && (_obj$y2[_x4] = 2), _obj$y2[_x4]));
