var obj = function (obj) {
  obj["x" + this.foo] = "heh";
  return obj;
}.call(this, {});
