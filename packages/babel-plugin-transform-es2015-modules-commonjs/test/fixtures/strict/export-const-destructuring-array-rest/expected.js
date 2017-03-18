"use strict";

const [foo, bar, ...baz] = [];
exports.foo = foo;
exports.bar = bar;
exports.bar = baz;
