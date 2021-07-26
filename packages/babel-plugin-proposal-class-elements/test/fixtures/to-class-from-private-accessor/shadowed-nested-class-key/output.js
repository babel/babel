var _foo = /*#__PURE__*/new WeakSet(),
    _bar = /*#__PURE__*/new WeakSet(),
    _baz = /*#__PURE__*/new WeakMap();

class A {
  constructor() {
    _foo.add(this);

    _bar.add(this);

    _baz.set(this, void 0);
  }

  test() {
    let _babelHelpers$classPr, _babelHelpers$classPr2, _babelHelpers$classPr3;

    var _foo2 = /*#__PURE__*/new WeakMap(),
        _baz2 = /*#__PURE__*/new WeakSet();

    _babelHelpers$classPr = babelHelpers.classPrivateFieldGet2(this, _foo2);
    _babelHelpers$classPr2 = babelHelpers.classPrivateAccessorGet2(this, _bar, _get_bar);
    _babelHelpers$classPr3 = babelHelpers.classPrivateAccessorGet2(this, _baz2, _get_baz);

    class B {
      constructor() {
        _baz2.add(this);

        _foo2.set(this, void 0);
      }

      [_babelHelpers$classPr]() {
        babelHelpers.classPrivateFieldSet2(this, _foo2, 1);
        babelHelpers.classPrivateAccessorSet2(this, _bar, _set_bar, 2);
        babelHelpers.classPrivateAccessorSet2(this, _baz2, _set_baz, 1.2);
      }

      [_babelHelpers$classPr2]() {
        babelHelpers.classPrivateFieldSet2(this, _foo2, 3);
        babelHelpers.classPrivateAccessorSet2(this, _bar, _set_bar, 4);
        babelHelpers.classPrivateAccessorSet2(this, _baz2, _set_baz, 3.4);
      }

      [_babelHelpers$classPr3]() {
        babelHelpers.classPrivateFieldSet2(this, _foo2, 5);
        babelHelpers.classPrivateAccessorSet2(this, _bar, _set_bar, 6);
        babelHelpers.classPrivateAccessorSet2(this, _baz2, _set_baz, 5.6);
      }

    }

    function _get_baz() {}

    function _set_baz(x) {}
  }

}

function _get_foo() {}

function _set_foo(x) {}

function _get_bar() {}

function _set_bar(x) {}
