var foo = "foo";
var bar = "bar";
var obj = function (_ref) {
  _ref["foo" + bar] = "heh";
  _ref["bar" + foo] = "noo";
  return _ref;
}({
  foo: "foo",
  bar: "bar"
});
