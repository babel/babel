"use strict";

function f() {
  var _temp;
  return to5Runtime.tailCall((_temp = getObj()).method, [], _temp);
}

function g() {
  return getFalseValue() || to5Runtime.tailCall(getValue);
}
