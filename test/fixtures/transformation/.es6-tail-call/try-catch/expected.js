"use strict";

(function f(n) {
  if (n <= 0) {
    return "foo";
  }
  try {
    return f(n - 1);
  } catch (e) {}
})(1000000) === "foo";

(function f(n) {
  if (n <= 0) {
    return "foo";
  }
  try {
    throw new Error();
  } catch (e) {
    return to5Runtime.tailCall(f, [n - 1]);
  }
})(1000000) === "foo";

(function f(n) {
  if (n <= 0) {
    return "foo";
  }
  try {
    throw new Error();
  } catch (e) {
    return f(n - 1);
  } finally {}
})(1000000) === "foo";

(function f(n) {
  if (n <= 0) {
    return "foo";
  }
  try {} finally {
    return to5Runtime.tailCall(f, [n - 1]);
  }
})(1000000) === "foo";
