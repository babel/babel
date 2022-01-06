var _initClass, _initClass2;

let _Foo;

class Foo {}

(() => {
  [_Foo, _initClass] = babelHelpers.applyDecs(Foo, [], [dec]);
})();

babelHelpers.defineProperty(Foo, "field", 123);

(() => {
  _initClass();
})();

let _Bar;

class Bar extends _Foo {}

(() => {
  [_Bar, _initClass2] = babelHelpers.applyDecs(Bar, [], [dec]);
})();

(() => {
  Bar.otherField = 456;
})();

babelHelpers.defineProperty(Bar, "field", 123);

(() => {
  _initClass2();
})();
