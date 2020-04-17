var t = function (e, f) {
  if (e === void 0) {
    e = "foo";
  }

  if (f === void 0) {
    f = 5;
  }

  return e + " bar " + f;
};

var a = function (e, f) {
  if (f === void 0) {
    f = 5;
  }

  return e + " bar " + f;
};
