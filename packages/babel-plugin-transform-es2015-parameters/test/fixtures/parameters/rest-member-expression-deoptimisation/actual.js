var x = function (foo, ...bar) {
  console.log(bar);
};

var y = function (foo, ...bar) {
  var x = function z(bar) {
    bar[1] = 5;
  };
};

var b = function (x, y, ...args) {
  console.log(args[0]);
  args.pop();
  console.log(args[1]);
};

var z = function (foo, ...bar) {
  var x = function () {
    bar[1] = 5;
  };
};

var a = function (foo, ...bar) {
  return bar.join(",");
};

var b = function (foo, ...bar) {
  var join = "join";
  return bar[join];
};

var b = function (...bar) {
  return bar.len;
};

var b = function (foo, ...bar) {
  return bar.length * 2;
};

var b = function (foo, baz, ...bar) {
  return bar.length;
};

function x (...rest) {
  rest[0] = 0;
}

function swap (...rest) {
  [rest[0], rest[1]] = [rest[1], rest[0]];
}

function forIn (...rest) {
  for (rest[0] in this) {
    foo(rest[0]);
  }
}

function inc (...rest) {
  ++rest[0];
}

function dec (...rest) {
  --rest[0];
}

function del (...rest) {
  delete rest[0];
}

function method (...rest) {
  rest[0]();
}

function newExp (...rest) {
  new rest[0]();
}

// In addition to swap() above because at some point someone tried checking
// grandparent path for isArrayExpression() to deopt.
function arrayDestructure (...rest) {
  [rest[0]] = x;
}

function forOf (...rest) {
  for (rest[0] of this);
}

function postfixIncrement (...rest) {
  rest[0]++;
}

function postfixDecrement (...rest) {
  rest[0]--;
}
