"use strict";
"use exports { foo, bar }";

exports.bar = exports.foo = void 0;
const [foo, bar = 2] = [];
exports.bar = bar;
exports.foo = foo;
