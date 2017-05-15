var x = function (foo, ..._ref) {
  let [, ...bar] = [, ..._ref];

  console.log(bar);
};

var y = function (foo, ..._ref2) {
  let [, ...bar] = [, ..._ref2];

  var x = function z(bar) {
    bar[1] = 5;
  };
};

var b = function (x, y, ..._ref3) {
  let [,, ...args] = [,, ..._ref3];

  console.log(args[0]);
  args.pop();
  console.log(args[1]);
};

var z = function (foo, ..._ref4) {
  let [, ...bar] = [, ..._ref4];

  var x = function () {
    bar[1] = 5;
  };
};

var a = function (foo, ..._ref5) {
  let [, ...bar] = [, ..._ref5];

  return bar.join(",");
};

var b = function (foo, ..._ref6) {
  let [, ...bar] = [, ..._ref6];

  var join = "join";
  return bar[join];
};

var b = function (..._ref7) {
  let [...bar] = [..._ref7];

  return bar.len;
};

var b = function (foo, ..._ref8) {
  let [, ...bar] = [, ..._ref8];

  return bar.length * 2;
};

var b = function (foo, baz, ..._ref9) {
  let [,, ...bar] = [,, ..._ref9];

  return bar.length;
};

function x(..._ref10) {
  let [...rest] = [..._ref10];

  rest[0] = 0;
}

function swap(..._ref11) {
  let [...rest] = [..._ref11];

  [rest[0], rest[1]] = [rest[1], rest[0]];
}

function forIn(..._ref12) {
  let [...rest] = [..._ref12];

  for (rest[0] in this) {
    foo(rest[0]);
  }
}

function inc(..._ref13) {
  let [...rest] = [..._ref13];

  ++rest[0];
}

function dec(..._ref14) {
  let [...rest] = [..._ref14];

  --rest[0];
}

function del(..._ref15) {
  let [...rest] = [..._ref15];

  delete rest[0];
}

function method(..._ref16) {
  let [...rest] = [..._ref16];

  rest[0]();
}

function newExp(..._ref17) {
  let [...rest] = [..._ref17];

  new rest[0]();
}

// In addition to swap() above because at some point someone tried checking
// grandparent path for isArrayExpression() to deopt.
function arrayDestructure(..._ref18) {
  let [...rest] = [..._ref18];

  [rest[0]] = x;
}

function forOf(..._ref19) {
  let [...rest] = [..._ref19];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      rest[0] = _step.value;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

function postfixIncrement(..._ref20) {
  let [...rest] = [..._ref20];

  rest[0]++;
}

function postfixDecrement(..._ref21) {
  let [...rest] = [..._ref21];

  rest[0]--;
}