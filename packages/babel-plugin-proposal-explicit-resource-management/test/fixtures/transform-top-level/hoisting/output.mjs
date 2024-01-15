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
  var _usingCtx = babelHelpers.usingCtx();
  doSomething();
  var {
    b
  } = {};
  var c = 2;
  var A = class {};
  var B = class {};
  var x = _usingCtx.u(null);
} catch (_) {
  _usingCtx.e = _;
} finally {
  _usingCtx.d();
}
