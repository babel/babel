{
  const log = [];
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
  log.push("start");
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
    method() {}

    field = log.push("f");

    @getterDec1
    @getterDec2
    get getter() {
      return;
    }
    @setterDec1
    @setterDec2
    set setter(x) {}
    static {
      log.push("static:end");
    }
  }
  log.push("after");
  new Foo();
  log.push("end");
  expect(log + "").toEqual(
    "start,extends," +
      "m1,m2,g1,g2,s1,s2," + // For each element e of instanceElements if e.[[Kind]] is not field
      "static:start," + // staticElements
      "static:end," + // staticElements
      "after," +
      "ctor:start," +
      "m3,m4,m5,m6,g3,g4,g5,g6,s3,s4,s5,s6," + // instanceExtraInitializers
      "f," + // InitializeFieldOrAccessor
      "ctor:end," +
      "end",
  );
}

{
  const log = [];
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
  log.push("start");
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
    method() {}

    accessor field = log.push("a");

    @getterDec1
    @getterDec2
    get getter() {
      return;
    }
    @setterDec1
    @setterDec2
    set setter(x) {}
    static {
      log.push("static:end");
    }
  }
  log.push("after");
  new Foo();
  log.push("end");
  expect(log + "").toEqual(
    "start,extends," +
      "m1,m2,g1,g2,s1,s2," + // For each element e of instanceElements if e.[[Kind]] is not field
      "static:start," + // staticElements
      "static:end," + // staticElements
      "after," +
      "ctor:start," +
      "m3,m4,m5,m6,g3,g4,g5,g6,s3,s4,s5,s6," + // instanceExtraInitializers
      "a," + // InitializeFieldOrAccessor
      "ctor:end," +
      "end",
  );
}
