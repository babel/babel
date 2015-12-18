/*before*/"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test = undefined;

require("foo");

require("foo-bar");

require("./directory/foo-bar");

var _foo = require("foo2");

var _foo2 = babelHelpers.interopRequireDefault(_foo);

var _foo3 = require("foo3");

var /*after*/foo2 = babelHelpers.interopRequireWildcard(_foo3);
/*before*/
var _foo4 = require("foo4");

var _foo5 = require("foo5");

exports. /*after*/test = test;
var test = /*before*/exports. /*after*/test = 5;

/*before*/(0, _foo4.bar)(_foo2.default) /*after*/;

/* my comment */
/*before*/_foo5.foo; /*after*/
/*before*/_foo2.default; /*after*/
