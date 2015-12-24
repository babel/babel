function test () {
  let value = "outer";

  return function () {
    let value = "inner";
    return value;
  }();
}

assert(test(), "inner");
