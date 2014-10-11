var obj = function (obj) {
  obj["x" + foo] = "heh";
  obj["y" + bar] = "noo";
  return obj;
}({
  foo: "foo",
  bar: "bar"
});
