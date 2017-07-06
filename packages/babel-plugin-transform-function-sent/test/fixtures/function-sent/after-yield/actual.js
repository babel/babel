(function* () {
  const a = yield;
  const b = function.sent;
  return [ a, b ];
}());
