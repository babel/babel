function f(ns = import("x", { exports: ["a"] })) {}
const g = (ns = import("x", { exports: ["a"] })) => {};
function h(ns = import("x", { exports })) {}
function outer() {
  function f(ns = import("x", { exports: ["a"] })) {
    return ns;
  }
}
