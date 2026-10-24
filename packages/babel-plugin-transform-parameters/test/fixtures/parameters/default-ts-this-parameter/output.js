function f(this: Foo) {
  let a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  let b = arguments.length > 1 ? arguments[1] : undefined;
}
function g(this: Foo) {
  let [a]: number[] = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
}
