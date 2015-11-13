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

/*before*/_foo4. /*after*/bar;
/*before*/_foo5. /*after*/foo;
/*before*/_foo2.default;
/*after*/
