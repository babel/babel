// optimisation

function foo(..._ref) {
  let [...bar] = [..._ref];

  foo(...bar);
}

// deoptimisation

function foo(a, ..._ref2) {
  let [...b] = [..._ref2];

  foo(...b);
}

function foo(..._ref3) {
  let [...b] = [..._ref3];

  foo(1, ...b);
}

function foo(..._ref4) {
  let [...args] = [..._ref4];

  args.pop();
  foo(...args);
}