function argsOf(...values) {
  return values;
}

function fn(...args) {
  return args;
}
fn.apply = () => {
  throw new Error("fn.apply should not be called");
};

expect(fn(...argsOf(1, 2))).toEqual([1, 2]);
