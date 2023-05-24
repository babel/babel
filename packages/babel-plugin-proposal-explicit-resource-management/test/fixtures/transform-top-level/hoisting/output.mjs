import { doSomething } from "somewhere";
export * from "somewhere else";
export * as ns from "somewhere else";
function f() {
  a;
  B;
}
function h() {
  b;
  A;
}
export function g() {
  c;
}
export { f };
export { b };
export { B };
try {
  var _stack = [];
  doSomething();
  var {
    b
  } = {};
  var c = 2;
  var A = class {};
  var B = class {};
  var x = babelHelpers.using(_stack, null);
} catch (_) {
  var _error = _;
  var _hasError = true;
} finally {
  babelHelpers.dispose(_stack, _error, _hasError);
}
