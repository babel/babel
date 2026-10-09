var _Foo;
let _aDecs, _init_a, _init_extra_a, _ref;
_ref = (_aDecs = dec(function () {}), "a");
class Foo {
  constructor() {
    babelHelpers.defineProperty(this, _ref, _init_a(this));
    _init_extra_a(this);
  }
}
_Foo = Foo;
[_init_a, _init_extra_a] = babelHelpers.applyDecs2311(_Foo, [], [[_aDecs, 0, "a"]]).e;
