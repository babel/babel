var foo = "test";

Object.defineProperty(exports, "foo", {
  get: function () {
    return foo;
  }
});
