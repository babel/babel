var _initClass;

let _Foo;

class Foo {}

(() => {
  [_Foo, _initClass] = babelHelpers.applyDecs(Foo, [], [dec]);
})();

babelHelpers.defineProperty(Foo, "foo", new _Foo());

(() => {
  _initClass();
})();

const foo = new _Foo();
