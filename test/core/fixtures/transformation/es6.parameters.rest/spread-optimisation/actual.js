// optimisation

function foo(...bar) {
  foo(...bar);
}

// deoptimisation

function foo(a, ...b) {
  foo(...b);
}

function foo(...b) {
  foo(1, ...b);
}
