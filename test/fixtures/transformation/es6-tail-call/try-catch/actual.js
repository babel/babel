(function f(n) {
  if (n <= 0) {
    return "foo";
  }

  try {
    return f(n - 1);
  } catch (e) {}
})(1e6) === "foo";

(function f(n) {
  if (n <= 0) {
    return "foo";
  }

  try {
    throw new Error();
  } catch (e) {
    return f(n - 1);
  }
})(1e6) === "foo";

(function f(n) {
  if (n <= 0) {
    return "foo";
  }

  try {
    throw new Error();
  } catch (e) {
    return f(n - 1);
  } finally {}
})(1e6) === "foo";

(function f(n) {
  if (n <= 0) {
    return "foo";
  }

  try {} finally {
    return f(n - 1);
  }
})(1e6) === "foo";
