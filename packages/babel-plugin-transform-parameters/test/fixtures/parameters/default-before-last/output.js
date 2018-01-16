function foo() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "foo";
  var b = arguments.length > 1 ? arguments[1] : undefined;
}
