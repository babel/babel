function foo(a, b) {
  if (b) {
    return foo(b);
  } else {
    return a;
  }
}

function foo(a, b) {
  if (b) {
    return foo("a", "b", "c");
  } else {
    return a;
  }
}
