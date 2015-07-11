"use strict";

var bar = function bar() {};
bar.bind(foo);

var foo = {};
foo.bar.bind(foo);
