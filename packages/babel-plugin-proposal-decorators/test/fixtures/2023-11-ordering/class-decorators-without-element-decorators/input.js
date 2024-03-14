const classDec1 = (log) => (cls, ctxClass) => {
  log.push("c2");
  ctxClass.addInitializer(() => log.push("c5"));
  ctxClass.addInitializer(() => log.push("c6"));
};
const classDec2 = (log) => (cls, ctxClass) => {
  log.push("c1");
  ctxClass.addInitializer(() => log.push("c3"));
  ctxClass.addInitializer(() => log.push("c4"));
};

{
  const log = [];

  @classDec1(log)
  @classDec2(log)
  class C {
    [log.push("k1")];
    [log.push("k2")];
    [log.push("k3")];
  }

  expect(log.join()).toBe(
    "k1,k2,k3," + // ClassElementEvaluation
      "c1,c2," + // ApplyDecoratorsToClassDefinition
      "c3,c4,c5,c6", // classExtraInitializers
  );
}

{
  const log = [];

  @classDec1(log)
  @classDec2(log)
  class C {
    static [log.push("k1")];
    async [log.push("k2")](v) {};
    [log.push("k3")];
  }

  expect(log.join()).toBe(
    "k1,k2,k3," + // ClassElementEvaluation
      "c1,c2," + // ApplyDecoratorsToClassDefinition
      "c3,c4,c5,c6", // classExtraInitializers
  );
}

{
  const log = [];

  @classDec1(log)
  @classDec2(log)
  class C {
    get [log.push("k1")]() {};
    static [log.push("k2")];
    [log.push("k3")];
  }

  expect(log.join()).toBe(
    "k1,k2,k3," + // ClassElementEvaluation
      "c1,c2," + // ApplyDecoratorsToClassDefinition
      "c3,c4,c5,c6", // classExtraInitializers
  );
}

{
  const log = [];

  @classDec1(log)
  @classDec2(log)
  class C {
    [log.push("k1")];
    accessor [log.push("k2")];
    static [log.push("k3")];
  }

  expect(log.join()).toBe(
    "k1,k2,k3," + // ClassElementEvaluation
      "c1,c2," + // ApplyDecoratorsToClassDefinition
      "c3,c4,c5,c6", // classExtraInitializers
  );
}

{
  const log = [];

  @classDec1(log)
  @classDec2(log)
  class C {
    static set [log.push("k1")](v) {};
    [log.push("k2")];
    static [log.push("k3")];
  }

  expect(log.join()).toBe(
    "k1,k2,k3," + // ClassElementEvaluation
      "c1,c2," + // ApplyDecoratorsToClassDefinition
      "c3,c4,c5,c6", // classExtraInitializers
  );
}

{
  const log = [];

  @classDec1(log)
  @classDec2(log)
  class C {
    static [log.push("k1")];
    static [log.push("k2")];
    static [log.push("k3")];
  }

  expect(log.join()).toBe(
    "k1,k2,k3," + // ClassElementEvaluation
      "c1,c2," + // ApplyDecoratorsToClassDefinition
      "c3,c4,c5,c6", // classExtraInitializers
  );
}
