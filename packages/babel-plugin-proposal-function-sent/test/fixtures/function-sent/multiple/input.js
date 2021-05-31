(function* () {
  const a = function.sent;
  const b = function.sent;
  yield 4;
  const c = function.sent;
  const d = yield;
  const e = function.sent;

  return [ a, b, c, d, e ];
}());
