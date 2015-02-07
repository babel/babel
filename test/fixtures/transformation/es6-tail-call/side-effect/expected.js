"use strict";

function f() {
  var _temp;
  return to5Runtime.tailCall((_temp = getObj()).method, [], _temp);
}

function g() {
  var _temp;
  if (_temp = getFalseValue()) {
    return _temp;
  }
  return to5Runtime.tailCall(getValue);
}
