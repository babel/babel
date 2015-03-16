// opt
"use strict";

var a = 1;
var b = 2;
var a = 1;
var b = 2;
var a = 1;
var b = 2;
var c = [3, 4];
var a = 1;
var b = 2;
var c = [3, 4];

// deopt
var _ref = [1, 2, 3];
var a = _ref[0];
var b = _ref[1];
var _ref2 = [1, 2, 3];
var a = _ref2[0];
var b = _ref2[1];
