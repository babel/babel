"use strict";

define(["foo"], function (_foo) {
  var exports = {};

  var bar = _foo.bar;
  var bar = _foo.bar;
  var baz = _foo.baz;
  var baz = _foo.bar;
  var baz = _foo.bar;
  var xyz = _foo.xyz;

  return exports;
});
