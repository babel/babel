let _ref;
_ref = (babelHelpers.classNameTDZError("Foo"), Foo) + 1;
class Foo {
  constructor() {
    babelHelpers.defineProperty(this, _ref, 2);
  }
}
;
