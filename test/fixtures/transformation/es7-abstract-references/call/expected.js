"use strict";

var _foo, _foo2;
_foo = foo, bar[Symbol.referenceGet](_foo).call(_foo);
_foo2 = foo, bar[Symbol.referenceGet](_foo2).call(_foo2, "arg");

var test = "test";
bar[Symbol.referenceGet](test).call(test);
bar[Symbol.referenceGet](test).call(test, "arg");
