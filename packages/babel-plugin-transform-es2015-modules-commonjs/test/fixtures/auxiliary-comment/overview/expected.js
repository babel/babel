/*before*/
"use strict";
"use exports { test, test2 }";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test2 = exports.test = void 0;

/*after*/

/*before*/
require("foo")
/*after*/
;

/*before*/
require("foo-bar")
/*after*/
;

/*before*/
require("./directory/foo-bar")
/*after*/
;

var
/*before*/
_foo2 = babelHelpers.interopRequireDefault(require("foo2"))
/*after*/
;

var
/*before*/
foo2 = babelHelpers.interopRequireWildcard(require("foo3"))
/*after*/
;

var
/*before*/
_foo4 = require("foo4")
/*after*/
;

var
/*before*/
_foo5 = require("foo5")
/*after*/
;

var test;

/*before*/
exports.test = test;

/*after*/
var test2 = 5;

/*before*/
exports.test2 = test2;

/*after*/

/*before*/
(0, _foo4.bar)
/*after*/
(
/*before*/
_foo2.default
/*after*/
,
/*before*/
_foo5.foo
/*after*/
);
/* my comment */

/*before*/
_foo5.foo
/*after*/
;

/*before*/
_foo2.default
/*after*/
;
