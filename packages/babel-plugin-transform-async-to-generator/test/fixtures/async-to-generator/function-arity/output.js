function one(_x) {
  return (one = babelHelpers.asyncToGenerator(function* (a, b = 1) {})).apply(this, arguments);
}
function two(_x2, _x3) {
  return (two = babelHelpers.asyncToGenerator(function* (a, b, ...c) {})).apply(this, arguments);
}
function three(_x4) {
  return (three = babelHelpers.asyncToGenerator(function* (a, b = 1, c, d = 3) {})).apply(this, arguments);
}
function four(_x5) {
  return (four = babelHelpers.asyncToGenerator(function* (a, b = 1, c, ...d) {})).apply(this, arguments);
}
function five(_x6, _x7) {
  return (five = babelHelpers.asyncToGenerator(function* (a, {
    b
  }) {})).apply(this, arguments);
}
function six(_x8) {
  return (six = babelHelpers.asyncToGenerator(function* (a, {
    b
  } = {}) {})).apply(this, arguments);
}
