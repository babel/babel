"use strict";

var _obj$x2, _x2, _obj$y2, _x4;
if (obj == null) obj = {};
if (obj.x == null) obj.x = 2;


console.log((obj.x == null && (obj.x = 2), obj.x));

var _obj$x = obj.x;
if (_obj$x.x == null) _obj$x.x = 2;


console.log((_obj$x2 = obj.x, _obj$x2.x == null && (_obj$x2.x = 2), _obj$x2.x));

var _x = x();

if (obj[_x] == null) obj[_x] = 2;


console.log((_x2 = x(), obj[_x2] == null && (obj[_x2] = 2), obj[_x2]));

var _obj$y = obj[y()];
var _x3 = x();

if (_obj$y[_x3] == null) _obj$y[_x3] = 2;


console.log((_obj$y2 = obj[y()], _x4 = x(), _obj$y2[_x4] == null && (_obj$y2[_x4] = 2), _obj$y2[_x4]));
