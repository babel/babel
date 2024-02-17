var _initStatic, _initClass, _accessorDecs, _init_accessor, _init_extra_accessor, _getterDecs, _setterDecs, _methodDecs, _propertyDecs, _init_property, _init_extra_property, _A, _temp;
let original, replaced, accessorThis, getterThis, setterThis, methodThis, propertyThis, classThis;
function dec(Klass, context) {
  original = Klass;
  replaced = class extends Klass {};
  context.addInitializer(function () {
    classThis = this;
  });
  return replaced;
}
function captureInitializerThis(callback) {
  return function (_, context) {
    context.addInitializer(function () {
      callback(this);
    });
  };
}
_accessorDecs = captureInitializerThis(v => accessorThis = v);
_getterDecs = captureInitializerThis(v => getterThis = v);
_setterDecs = captureInitializerThis(v => setterThis = v);
_methodDecs = captureInitializerThis(v => methodThis = v);
_propertyDecs = captureInitializerThis(v => propertyThis = v);
let _Foo;
new (_A = /*#__PURE__*/new WeakMap(), (_temp = class extends babelHelpers.identity {
  constructor() {
    (super(_Foo), babelHelpers.classPrivateFieldInitSpec(this, _A, _init_accessor()), babelHelpers.defineProperty(this, "property", (_init_extra_accessor(), _init_property()))), (() => {
      _init_extra_property();
    })(), _initClass();
  }
}, (_Foo2 => {
  class Foo {
    static get accessor() {
      return babelHelpers.classPrivateFieldGet2(Foo, _A);
    }
    static set accessor(v) {
      babelHelpers.classPrivateFieldSet2(Foo, _A, v);
    }
    static get getter() {}
    static set setter(_) {}
    static method() {}
  }
  _Foo2 = Foo;
  (() => {
    ({
      e: [_init_accessor, _init_extra_accessor, _init_property, _init_extra_property, _initStatic],
      c: [_Foo, _initClass]
    } = babelHelpers.applyDecs2311(_Foo2, [[_accessorDecs, 9, "accessor"], [_getterDecs, 11, "getter"], [_setterDecs, 12, "setter"], [_methodDecs, 10, "method"], [_propertyDecs, 8, "property"]], [dec]));
    _initStatic(_Foo2);
  })();
})(), _temp))();
