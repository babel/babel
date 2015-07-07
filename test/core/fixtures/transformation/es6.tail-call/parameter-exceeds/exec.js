function foo(a, b) {
  if (b) {
    return foo(b);
  } else {
    return a;
  }
}

assert.equal(foo("Michael", "Jackson"), "Jackson");
