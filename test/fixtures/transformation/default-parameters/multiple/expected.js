"use strict";

var t = function (t, f) {
  if (t === undefined) t = "foo";
  if (f === undefined) f = 5;
  return t + " bar " + f;
};

var a = function (t, f) {
  if (f === undefined) f = 5;
  return t + " bar " + f;
};
