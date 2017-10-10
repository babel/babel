"use strict";
"use exports { foo, bar }";

exports.bar = exports.foo = void 0;
const [foo, bar] = [];
exports.bar = bar;
exports.foo = foo;
