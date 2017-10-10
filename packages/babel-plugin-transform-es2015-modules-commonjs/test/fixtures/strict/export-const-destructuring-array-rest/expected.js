"use strict";
"use exports { foo, bar, baz }";

exports.baz = exports.bar = exports.foo = void 0;
const [foo, bar, ...baz] = [];
exports.baz = baz;
exports.bar = bar;
exports.foo = foo;
