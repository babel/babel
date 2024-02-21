var _initStatic, _initClass, _init_accessor, _init_extra_accessor, _init_property, _init_extra_property;
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
new class extends babelHelpers.identity {
  static {
    class Foo {
      static {
        ({
          e: [_init_accessor, _init_extra_accessor, _init_property, _init_extra_property, _initStatic],
          c: [_Foo, _initClass]
        } = babelHelpers.applyDecs2311(this, [dec], [[captureInitializerThis(v => accessorThis = v), 9, "accessor"], [captureInitializerThis(v => getterThis = v), 11, "getter"], [captureInitializerThis(v => setterThis = v), 12, "setter"], [captureInitializerThis(v => methodThis = v), 10, "method"], [captureInitializerThis(v => propertyThis = v), 8, "property"]]));
        _initStatic(this);
      }
      static get accessor() {
        return Foo.#A;
      }
      static set accessor(v) {
        Foo.#A = v;
      }
      static get getter() {}
      static set setter(_) {}
      static method() {}
    }
  }
  #A = _init_accessor();
  property = (_init_extra_accessor(), _init_property());
  constructor() {
    super(_Foo), (() => {
      _init_extra_property();
    })(), _initClass();
  }
}();
