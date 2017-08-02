/*before*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test2 = exports.test = undefined;

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

/*after*/
foo = babelHelpers.interopRequireDefault(require("foo2"));
var
/*before*/

/*after*/
foo2 = babelHelpers.interopRequireWildcard(require("foo3"));

var
/*before*/
_foo = require("foo4")
/*after*/
;

var
/*before*/
_foo2 = require("foo5")
/*after*/
;

/*before*/
exports.
/*after*/
test = test;
var test2 =
/*before*/
exports.
/*after*/
test2 = 5;

/*before*/
(0, _foo.bar)
/*after*/
(foo,
/*before*/
_foo2.foo
/*after*/
);
/* my comment */

/*before*/
_foo2.foo
/*after*/
;
foo;
