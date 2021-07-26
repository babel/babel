let _one, _ref, _undefined, _computed, _computed2, _ref2, _ref3, _baz, _ref4;

const foo = "foo";

const bar = () => {};

const four = 4;
_one = one();
_ref = 2 * four + seven;
_undefined = undefined;
_computed = computed();
_computed2 = computed();
_ref2 = "test" + one;
_ref3 = /regex/;
_baz = baz;
_ref4 = `template${expression}`;

class MyClass {
  constructor() {
    babelHelpers.defineProperty(this, null, "null");
    babelHelpers.defineProperty(this, _undefined, "undefined");
    babelHelpers.defineProperty(this, void 0, "void 0");
    babelHelpers.defineProperty(this, _ref3, "regex");
    babelHelpers.defineProperty(this, foo, "foo");
    babelHelpers.defineProperty(this, bar, "bar");
    babelHelpers.defineProperty(this, _baz, "baz");
    babelHelpers.defineProperty(this, `template`, "template");
    babelHelpers.defineProperty(this, _ref4, "template-with-expression");
  }

  get ["whatever"]() {}

  set ["whatever"](value) {}

  get [_computed]() {}

  set [_computed2](value) {}

  [_ref2]() {}

  static [10]() {}

}

babelHelpers.defineProperty(MyClass, _one, "test");
babelHelpers.defineProperty(MyClass, 2 * 4 + 7, "247");
babelHelpers.defineProperty(MyClass, 2 * four + 7, "247");
babelHelpers.defineProperty(MyClass, _ref, "247");
