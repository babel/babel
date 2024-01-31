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
  ctxField.addInitializer(() => log.push("f7"));
  ctxField.addInitializer(() => log.push("f8"));
  return () => {
    log.push("f3");
  };
};
const fieldDec2 = (value, ctxField) => {
  log.push("f1");
  ctxField.addInitializer(() => log.push("f5"));
  ctxField.addInitializer(() => log.push("f6"));
  return () => {
    log.push("f4");
  };
};
const staticFieldDec1 = (value, ctxStaticField) => {
  log.push("F2");
  ctxStaticField.addInitializer(() => log.push("F7"));
  ctxStaticField.addInitializer(() => log.push("F8"));
  return () => {
    log.push("F3");
  };
};
const staticFieldDec2 = (value, ctxStaticField) => {
  log.push("F1");
  ctxStaticField.addInitializer(() => log.push("F5"));
  ctxStaticField.addInitializer(() => log.push("F6"));
  return () => {
    log.push("F4");
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
  ctxAccessor.addInitializer(() => log.push("a7"));
  ctxAccessor.addInitializer(() => log.push("a8"));
  return { init() {
    log.push("a3");
  } };
};
const accessorDec2 = (target, ctxAccessor) => {
  log.push("a1");
  ctxAccessor.addInitializer(() => log.push("a5"));
  ctxAccessor.addInitializer(() => log.push("a6"));
  return { init() {
    log.push("a4");
  } };
};
const staticAccessorDec1 = (target, ctxStaticAccessor) => {
  log.push("A2");
  ctxStaticAccessor.addInitializer(() => log.push("A7"));
  ctxStaticAccessor.addInitializer(() => log.push("A8"));
  return { init() {
    log.push("A3");
  } };
};
const staticAccessorDec2 = (target, ctxStaticAccessor) => {
  log.push("A1");
  ctxStaticAccessor.addInitializer(() => log.push("A5"));
  ctxStaticAccessor.addInitializer(() => log.push("A6"));
  return { init() {
    log.push("A4");
  } };
};
log.push("start");
@classDec1
@classDec2
class Foo extends (log.push("extends"), Object) {
  static {
    log.push("static:start");
  }
  constructor() {
    log.push("ctor:start");
    super();
    log.push("ctor:end");
  }
  @methodDec1
  @methodDec2
  method() {
  }
  @staticMethodDec1
  @staticMethodDec2
  static method() {
  }
  @fieldDec1
  @fieldDec2
  field;
  @staticFieldDec1
  @staticFieldDec2
  static field;
  @getterDec1
  @getterDec2
  get getter() {
    return;
  }
  @staticGetterDec1
  @staticGetterDec2
  static get getter() {
    return;
  }
  @setterDec1
  @setterDec2
  set setter(x) {
  }
  @staticSetterDec1
  @staticSetterDec2
  static set getter(x) {
  }
  @accessorDec1
  @accessorDec2
  accessor accessor;
  @staticAccessorDec1
  @staticAccessorDec2
  static accessor accessor;
  static {
    log.push("static:end");
  }
}
log.push("after");
new Foo();
log.push("end");
expect(log + "").toEqual(
  'start,extends,' +
  'M1,M2,G1,G2,S1,S2,A1,A2,' + // For each element e of staticElements if e.[[Kind]] is not field
  'm1,m2,g1,g2,s1,s2,a1,a2,' + // For each element e of instanceElements if e.[[Kind]] is not field
  'F1,F2,' + // For each element e of staticElements if e.[[Kind]] is field
  'f1,f2,' + // For each element e of instanceElements if e.[[Kind]] is field
  'c1,c2,' + // ApplyDecoratorsToClassDefinition
  'M3,M4,M5,M6,G3,G4,G5,G6,S3,S4,S5,S6,' + // staticExtraInitializers
  'static:start,' + // staticElements
  'F3,F4,' + // InitializeFieldOrAccessor
  'F5,F6,F7,F8,' + // field extraInitializers
  'A3,A4,' + // InitializeFieldOrAccessor
  'A5,A6,A7,A8,' + // accessor extraInitializers
  'static:end,' + // staticElements
  'c3,c4,c5,c6,' + // classExtraInitializers
  'after,' +
  'ctor:start,' +
  'm3,m4,m5,m6,g3,g4,g5,g6,s3,s4,s5,s6,' + // instanceExtraInitializers
  'f3,f4,' + // InitializeFieldOrAccessor
  'f5,f6,f7,f8,' + // field extraInitializers
  'a3,a4,' + // InitializeFieldOrAccessor
  'a5,a6,a7,a8,' + // field extraInitializers
  'ctor:end,' +
  'end'
);
