assert.equal(do {
  var obj = { foo: "bar", bar: "foo" };
  for (var key in obj) {
    obj[key];
  }
}, "foo");
