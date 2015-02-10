"use strict";

var _foo, _foo$bar, _foo$bar2;
var _defaults = function (obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; if (obj[key] === undefined) { Object.defineProperty(obj, key, Object.getOwnPropertyDescriptor(defaults, key)); } } return obj; };

console.log((_foo = foo, _defaults(_foo, bar), _foo));

console.log((_foo$bar = foo[bar], _defaults(_foo$bar, bar), _foo$bar));

console.log((_foo$bar2 = foo[bar()], _defaults(_foo$bar2, bar), _foo$bar2));