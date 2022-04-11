var foo = {
  __proto__: bar
};

var foo = {
  bar: "foo",
  __proto__: bar
};

var foo = {
  __proto__: bar,
  bar: "foo"
};
