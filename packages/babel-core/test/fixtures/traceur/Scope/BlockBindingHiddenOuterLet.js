// Options: --block-binding

// See issue #1671. Pass if no exception
let c;

function f(c) {
  var p;
  for (p of g(() => c));
}