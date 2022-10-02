"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foofoo = exports.foo = exports.bazbaz = exports.baz = exports.barbar = exports.bar = void 0;
var _foo, _bar, _baz;
let foo = 1n;
exports.foofoo = exports.foo = foo;
let bar = (_foo = foo++, exports.foofoo = exports.foo = foo, _foo);
exports.barbar = exports.bar = bar;
let baz = exports.barbar = exports.bar = ++bar;
exports.bazbaz = exports.baz = baz;
expect(foo).toBe(2n);
expect(bar).toBe(2n);
expect(baz).toBe(2n);
exports.foofoo = exports.foo = --foo;
_bar = bar--, exports.barbar = exports.bar = bar, _bar;
_baz = baz--, exports.bazbaz = exports.baz = baz, _baz;
