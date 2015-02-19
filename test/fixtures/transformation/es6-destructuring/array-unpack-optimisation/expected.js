"use strict";

// opt
var a = 1;
var b = 2;
var a = 1;
var b = 2;

// deopt
var _ref = [1, 2, 3];
var a = _ref[0];
var b = _ref[1];
var _ref2 = [1, 2, 3];
var a = _ref2[0];
var b = _ref2[1];
var _ref3 = [1, 2, 3];
var a = _ref3[0];
var b = _ref3[1];
var items = _ref3.slice(2);
var _ref4 = [1, 2, 3];
var a = _ref4[0];
var b = _ref4[1];
var items = _ref4.slice(2);
