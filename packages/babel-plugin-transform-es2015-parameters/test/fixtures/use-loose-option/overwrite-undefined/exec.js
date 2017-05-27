function t(undefined = 17, a = 3) {
  return a;
}

assert.equal(t(), 3);
