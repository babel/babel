var t = function (..._ref) {
  let [e = "foo", f = 5] = [..._ref];

  return e + " bar " + f;
};

var a = function (e, ..._ref2) {
  let [, f = 5] = [, ..._ref2];

  return e + " bar " + f;
};