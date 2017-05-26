var t = function (e, f) {
  if (e === undefined) {
    e = "foo";
  }

  if (f === undefined) {
    f = 5;
  }

  return e + " bar " + f;
};

var a = function (e, f) {
  if (f === undefined) {
    f = 5;
  }

  return e + " bar " + f;
};
