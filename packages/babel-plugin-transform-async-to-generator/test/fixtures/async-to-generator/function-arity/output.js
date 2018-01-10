function one(_x) {
  return _one.apply(this, arguments);
}

function _one() {
  _one = babelHelpers.asyncToGenerator(function* (a, b = 1) {});
  return _one.apply(this, arguments);
}

function two(_x2, _x3) {
  return _two.apply(this, arguments);
}

function _two() {
  _two = babelHelpers.asyncToGenerator(function* (a, b, ...c) {});
  return _two.apply(this, arguments);
}

function three(_x4) {
  return _three.apply(this, arguments);
}

function _three() {
  _three = babelHelpers.asyncToGenerator(function* (a, b = 1, c, d = 3) {});
  return _three.apply(this, arguments);
}

function four(_x5) {
  return _four.apply(this, arguments);
}

function _four() {
  _four = babelHelpers.asyncToGenerator(function* (a, b = 1, c, ...d) {});
  return _four.apply(this, arguments);
}

function five(_x6, _x7) {
  return _five.apply(this, arguments);
}

function _five() {
  _five = babelHelpers.asyncToGenerator(function* (a, {
    b
  }) {});
  return _five.apply(this, arguments);
}

function six(_x8) {
  return _six.apply(this, arguments);
}

function _six() {
  _six = babelHelpers.asyncToGenerator(function* (a, {
    b
  } = {}) {});
  return _six.apply(this, arguments);
}
