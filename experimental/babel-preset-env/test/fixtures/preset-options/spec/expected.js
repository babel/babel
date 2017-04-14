"use strict";

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

var bar = "bar";
var x = function () {
  _newArrowCheck(undefined, undefined);

  return "foo" + bar;
}.bind(undefined);