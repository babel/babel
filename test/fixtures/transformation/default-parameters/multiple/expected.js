"use strict";

var t = function (t, f) {
  if (f === undefined) f = 5;
  if (t === undefined) t = "foo";
  return t + " bar " + f;
};

var a = function (t, f) {
  if (f === undefined) f = 5;
  return t + " bar " + f;
};