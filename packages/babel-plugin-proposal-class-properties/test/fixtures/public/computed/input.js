const foo = "foo";
const bar = () => {};
const four = 4;

class MyClass {
  static [one()] = "test";
  static [2 * 4 + 7] = "247";
  static [2 * four + 7] = "247";
  static [2 * four + seven] = "247";
  [null] = "null";
  [undefined] = "undefined";
  [void 0] = "void 0";
  get ["whatever"]() {}
  set ["whatever"](value) {}
  get [computed()]() {}
  set [computed()](value) {}
  ["test" + one]() {}
  static [10]() {}
  [/regex/] = "regex";
  [foo] = "foo";
  [bar] = "bar";
  [baz] = "baz";
  [`template`] = "template";
  [`template${expression}`] = "template-with-expression";
}
