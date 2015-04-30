"use strict";

var _foo = "yes";

export { _foo as foo };
var bar = {
  foo: function foo() {
    _foo;
  }
};
