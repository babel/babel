var _ref, _Class, _B, _Foo3, _A;
let _initProto, _initStatic, _initClass, _init_field, _init_field2, _init_accessor, _init_accessor2, _Foo2;
const log = [];
const classDec1 = (cls, ctxClass) => {
  log.push("c2");
  ctxClass.addInitializer(() => log.push("c5"));
  ctxClass.addInitializer(() => log.push("c6"));
};
const classDec2 = (cls, ctxClass) => {
  log.push("c1");
  ctxClass.addInitializer(() => log.push("c3"));
  ctxClass.addInitializer(() => log.push("c4"));
};
const methodDec1 = (fn, ctxMethod) => {
  log.push("m2");
  ctxMethod.addInitializer(() => log.push("m5"));
  ctxMethod.addInitializer(() => log.push("m6"));
};
const methodDec2 = (fn, ctxMethod) => {
  log.push("m1");
  ctxMethod.addInitializer(() => log.push("m3"));
  ctxMethod.addInitializer(() => log.push("m4"));
};
const staticMethodDec1 = (fn, ctxStaticMethod) => {
  log.push("M2");
  ctxStaticMethod.addInitializer(() => log.push("M5"));
  ctxStaticMethod.addInitializer(() => log.push("M6"));
};
const staticMethodDec2 = (fn, ctxStaticMethod) => {
  log.push("M1");
  ctxStaticMethod.addInitializer(() => log.push("M3"));
  ctxStaticMethod.addInitializer(() => log.push("M4"));
};
const fieldDec1 = (value, ctxField) => {
  log.push("f2");
  ctxField.addInitializer(() => log.push("f5"));
  ctxField.addInitializer(() => log.push("f6"));
  return () => {
    log.push("f7");
  };
};
const fieldDec2 = (value, ctxField) => {
  log.push("f1");
  ctxField.addInitializer(() => log.push("f3"));
  ctxField.addInitializer(() => log.push("f4"));
  return () => {
    log.push("f8");
  };
};
const staticFieldDec1 = (value, ctxStaticField) => {
  log.push("F2");
  ctxStaticField.addInitializer(() => log.push("F5"));
  ctxStaticField.addInitializer(() => log.push("F6"));
  return () => {
    log.push("F7");
  };
};
const staticFieldDec2 = (value, ctxStaticField) => {
  log.push("F1");
  ctxStaticField.addInitializer(() => log.push("F3"));
  ctxStaticField.addInitializer(() => log.push("F4"));
  return () => {
    log.push("F8");
  };
};
const getterDec1 = (fn, ctxGetter) => {
  log.push("g2");
  ctxGetter.addInitializer(() => log.push("g5"));
  ctxGetter.addInitializer(() => log.push("g6"));
};
const getterDec2 = (fn, ctxGetter) => {
  log.push("g1");
  ctxGetter.addInitializer(() => log.push("g3"));
  ctxGetter.addInitializer(() => log.push("g4"));
};
const staticGetterDec1 = (fn, ctxStaticGetter) => {
  log.push("G2");
  ctxStaticGetter.addInitializer(() => log.push("G5"));
  ctxStaticGetter.addInitializer(() => log.push("G6"));
};
const staticGetterDec2 = (fn, ctxStaticGetter) => {
  log.push("G1");
  ctxStaticGetter.addInitializer(() => log.push("G3"));
  ctxStaticGetter.addInitializer(() => log.push("G4"));
};
const setterDec1 = (fn, ctxSetter) => {
  log.push("s2");
  ctxSetter.addInitializer(() => log.push("s5"));
  ctxSetter.addInitializer(() => log.push("s6"));
};
const setterDec2 = (fn, ctxSetter) => {
  log.push("s1");
  ctxSetter.addInitializer(() => log.push("s3"));
  ctxSetter.addInitializer(() => log.push("s4"));
};
const staticSetterDec1 = (fn, ctxStaticSetter) => {
  log.push("S2");
  ctxStaticSetter.addInitializer(() => log.push("S5"));
  ctxStaticSetter.addInitializer(() => log.push("S6"));
};
const staticSetterDec2 = (fn, ctxStaticSetter) => {
  log.push("S1");
  ctxStaticSetter.addInitializer(() => log.push("S3"));
  ctxStaticSetter.addInitializer(() => log.push("S4"));
};
const accessorDec1 = (target, ctxAccessor) => {
  log.push("a2");
  ctxAccessor.addInitializer(() => log.push("a5"));
  ctxAccessor.addInitializer(() => log.push("a6"));
  return {
    init() {
      log.push("a7");
    }
  };
};
const accessorDec2 = (target, ctxAccessor) => {
  log.push("a1");
  ctxAccessor.addInitializer(() => log.push("a3"));
  ctxAccessor.addInitializer(() => log.push("a4"));
  return {
    init() {
      log.push("a8");
    }
  };
};
const staticAccessorDec1 = (target, ctxStaticAccessor) => {
  log.push("A2");
  ctxStaticAccessor.addInitializer(() => log.push("A5"));
  ctxStaticAccessor.addInitializer(() => log.push("A6"));
  return {
    init() {
      log.push("A7");
    }
  };
};
const staticAccessorDec2 = (target, ctxStaticAccessor) => {
  log.push("A1");
  ctxStaticAccessor.addInitializer(() => log.push("A3"));
  ctxStaticAccessor.addInitializer(() => log.push("A4"));
  return {
    init() {
      log.push("A8");
    }
  };
};
log.push("start");
let _Foo;
new (_B = /*#__PURE__*/new WeakMap(), _Foo2 = (_A = /*#__PURE__*/new WeakMap(), _Foo3 = class Foo extends (_ref = (log.push("extends"), Object)) {
  constructor() {
    log.push("ctor:start");
    super();
    babelHelpers.defineProperty(this, "field", (_initProto(this), _init_field(this)));
    babelHelpers.classPrivateFieldInitSpec(this, _A, _init_accessor(this));
    log.push("ctor:end");
  }
  method() {}
  static method() {}
  get getter() {
    return;
  }
  static get getter() {
    return;
  }
  set setter(x) {}
  static set getter(x) {}
  get accessor() {
    return babelHelpers.classPrivateFieldGet2(_A, this);
  }
  set accessor(v) {
    babelHelpers.classPrivateFieldSet2(_A, this, v);
  }
  static get accessor() {
    return babelHelpers.classPrivateFieldGet2(_B, Foo);
  }
  static set accessor(v) {
    babelHelpers.classPrivateFieldSet2(_B, Foo, v);
  }
}, (() => {
  ({
    e: [_init_accessor2, _init_accessor, _init_field2, _init_field, _initProto, _initStatic],
    c: [_Foo, _initClass]
  } = babelHelpers.applyDecs2305(_Foo3, [[[staticMethodDec1, staticMethodDec2], 10, "method"], [[staticGetterDec1, staticGetterDec2], 11, "getter"], [[staticSetterDec1, staticSetterDec2], 12, "getter"], [[staticAccessorDec1, staticAccessorDec2], 9, "accessor"], [[methodDec1, methodDec2], 2, "method"], [[getterDec1, getterDec2], 3, "getter"], [[setterDec1, setterDec2], 4, "setter"], [[accessorDec1, accessorDec2], 1, "accessor"], [[staticFieldDec1, staticFieldDec2], 8, "field"], [[fieldDec1, fieldDec2], 0, "field"]], [classDec1, classDec2], 0, void 0, _ref));
  _initStatic(_Foo3);
})(), _Foo3), _Class = class extends babelHelpers.identity {
  constructor() {
    super(_Foo), babelHelpers.defineProperty(this, "field", ((() => {
      log.push("static:start");
    })(), _init_field2(this))), babelHelpers.classPrivateFieldInitSpec(this, _B, _init_accessor2(this)), this, (() => {
      log.push("static:end");
    })(), _initClass();
  }
}, babelHelpers.defineProperty(_Class, _Foo2, void 0), _Class)();
log.push("after");
new _Foo();
log.push("end");
expect(log + "").toEqual('start,extends,' + 'M1,M2,G1,G2,S1,S2,A1,A2,' +
// For each element e of staticElements if e.[[Kind]] is not field
'm1,m2,g1,g2,s1,s2,a1,a2,' +
// For each element e of instanceElements if e.[[Kind]] is not field
'F1,F2,' +
// For each element e of staticElements if e.[[Kind]] is field
'f1,f2,' +
// For each element e of instanceElements if e.[[Kind]] is field
'c1,c2,' +
// ApplyDecoratorsToClassDefinition
'M3,M4,M5,M6,G3,G4,G5,G6,S3,S4,S5,S6,A3,A4,A5,A6,F3,F4,F5,F6,' +
// staticExtraInitializers
'static:start,' +
// staticElements
'F7,F8,A7,A8,' +
// InitializeFieldOrAccessor
'static:end,' +
// staticElements
'c3,c4,c5,c6,' +
// classExtraInitializers
'after,' + 'ctor:start,' + 'm3,m4,m5,m6,g3,g4,g5,g6,s3,s4,s5,s6,a3,a4,a5,a6,f3,f4,f5,f6,' +
// instanceExtraInitializers
'f7,f8,a7,a8,' +
// InitializeFieldOrAccessor
'ctor:end,' + 'end');
