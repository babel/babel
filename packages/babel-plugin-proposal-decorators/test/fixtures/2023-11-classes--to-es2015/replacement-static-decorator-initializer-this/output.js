var _Class, _A, _Foo3;
let _initStatic, _initClass, _init_accessor, _init_extra_accessor, _init_property, _init_extra_property, _Foo2;
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
let _Foo;
new (_A = /*#__PURE__*/new WeakMap(), _Foo2 = (_Foo3 = class Foo {
  static get accessor() {
    return babelHelpers.classPrivateFieldGet2(_A, Foo);
  }
  static set accessor(v) {
    babelHelpers.classPrivateFieldSet2(_A, Foo, v);
  }
  static get getter() {}
  static set setter(_) {}
  static method() {}
}, (() => {
  ({
    e: [_init_accessor, _init_extra_accessor, _init_property, _init_extra_property, _initStatic],
    c: [_Foo, _initClass]
  } = babelHelpers.applyDecs2311(_Foo3, [dec], [[captureInitializerThis(v => accessorThis = v), 9, "accessor"], [captureInitializerThis(v => getterThis = v), 11, "getter"], [captureInitializerThis(v => setterThis = v), 12, "setter"], [captureInitializerThis(v => methodThis = v), 10, "method"], [captureInitializerThis(v => propertyThis = v), 8, "property"]]));
  _initStatic(_Foo3);
})(), _Foo3), _Class = class extends babelHelpers.identity {
  constructor() {
    super(_Foo), babelHelpers.classPrivateFieldInitSpec(this, _A, _init_accessor()), babelHelpers.defineProperty(this, "property", (_init_extra_accessor(), _init_property())), (() => {
      _init_extra_property();
    })(), _initClass();
  }
}, babelHelpers.defineProperty(_Class, _Foo2, void 0), _Class)();
