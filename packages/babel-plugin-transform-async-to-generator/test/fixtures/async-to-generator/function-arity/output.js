function one() {
  return (one = babelHelpers.asyncToGenerator(function* (a, b = 1) {})).apply(this, arguments);
}
function two() {
  return (two = babelHelpers.asyncToGenerator(function* (a, b, ...c) {})).apply(this, arguments);
}
function three() {
  return (three = babelHelpers.asyncToGenerator(function* (a, b = 1, c, d = 3) {})).apply(this, arguments);
}
function four() {
  return (four = babelHelpers.asyncToGenerator(function* (a, b = 1, c, ...d) {})).apply(this, arguments);
}
function five() {
  return (five = babelHelpers.asyncToGenerator(function* (a, {
    b
  }) {})).apply(this, arguments);
}
function six() {
  return (six = babelHelpers.asyncToGenerator(function* (a, {
    b
  } = {}) {})).apply(this, arguments);
}
