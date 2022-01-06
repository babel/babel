var _initClass, _x, _m, _temp2;

let hasX, hasM;

let _Foo;

new (_temp2 = (_x = /*#__PURE__*/new WeakMap(), _m = /*#__PURE__*/new WeakSet(), class extends babelHelpers.identity {
  constructor() {
    var _temp;

    (_temp = super(_Foo), babelHelpers.classPrivateMethodInitSpec(this, _m), babelHelpers.classPrivateFieldInitSpec(this, _x, {
      writable: true,
      value: void 0
    }), babelHelpers.defineProperty(this, "x", void 0), _temp), (() => {
      hasX = o => _x.has(o);

      hasM = o => _m.has(o);
    })(), _initClass();
  }

}), (() => {
  class Foo {
    static m() {}

  }

  (() => {
    [_Foo, _initClass] = babelHelpers.applyDecs(Foo, [], [dec]);
  })();
})(), _temp2)();

function _m2() {}
