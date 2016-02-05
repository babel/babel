class Test {
  *iter(arg = this) {
    yield arg;
  }
}

let test = new Test;
assert.equal(test.iter().next().value, test);
