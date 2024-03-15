const classDec1 = log => (cls, ctxClass) => {
  log.push("c2");
  ctxClass.addInitializer(() => log.push("c5"));
  ctxClass.addInitializer(() => log.push("c6"));
};
const classDec2 = log => (cls, ctxClass) => {
  log.push("c1");
  ctxClass.addInitializer(() => log.push("c3"));
  ctxClass.addInitializer(() => log.push("c4"));
};
{
  let _initClass, _classDecs;
  const log = [];
  _classDecs = [classDec1(log), classDec2(log)];
  let _C;
  class C {
    static {
      [_C, _initClass] = babelHelpers.applyDecs2311(this, _classDecs, []).c;
    }
    [log.push("k1")];
    [log.push("k2")];
    [log.push("k3")];
    static {
      _initClass();
    }
  }
  expect(log.join()).toBe("k1,k2,k3," +
  // ClassElementEvaluation
  "c1,c2," +
  // ApplyDecoratorsToClassDefinition
  "c3,c4,c5,c6" // classExtraInitializers
  );
}
{
  let _initClass2, _classDecs2, _computedKey;
  const log = [];
  _classDecs2 = [classDec1(log), classDec2(log)];
  let _C2;
  new class extends babelHelpers.identity {
    static [class C {
      static {
        [_C2, _initClass2] = babelHelpers.applyDecs2311(this, _classDecs2, []).c;
      }
      async [(_computedKey = log.push("k1"), log.push("k2"))](v) {}
      [log.push("k3")];
    }];
    [_computedKey];
    constructor() {
      super(_C2), _initClass2();
    }
  }();
  expect(log.join()).toBe("k1,k2,k3," +
  // ClassElementEvaluation
  "c1,c2," +
  // ApplyDecoratorsToClassDefinition
  "c3,c4,c5,c6" // classExtraInitializers
  );
}
{
  let _initClass3, _classDecs3, _computedKey2;
  const log = [];
  _classDecs3 = [classDec1(log), classDec2(log)];
  let _C3;
  new class extends babelHelpers.identity {
    static [class C {
      static {
        [_C3, _initClass3] = babelHelpers.applyDecs2311(this, _classDecs3, []).c;
      }
      get [log.push("k1")]() {}
      [(_computedKey2 = log.push("k2"), log.push("k3"))];
    }];
    [_computedKey2];
    constructor() {
      super(_C3), _initClass3();
    }
  }();
  expect(log.join()).toBe("k1,k2,k3," +
  // ClassElementEvaluation
  "c1,c2," +
  // ApplyDecoratorsToClassDefinition
  "c3,c4,c5,c6" // classExtraInitializers
  );
}
{
  let _computedKey3, _initClass4, _classDecs4, _computedKey4;
  const log = [];
  _classDecs4 = [classDec1(log), classDec2(log)];
  let _C4;
  new class extends babelHelpers.identity {
    static [class C {
      static {
        [_C4, _initClass4] = babelHelpers.applyDecs2311(this, _classDecs4, []).c;
      }
      [log.push("k1")];
      #A;
      get [_computedKey3 = babelHelpers.toPropertyKey(log.push("k2"))]() {
        return this.#A;
      }
      set [(_computedKey4 = log.push("k3"), _computedKey3)](v) {
        this.#A = v;
      }
    }];
    [_computedKey4];
    constructor() {
      super(_C4), _initClass4();
    }
  }();
  expect(log.join()).toBe("k1,k2,k3," +
  // ClassElementEvaluation
  "c1,c2," +
  // ApplyDecoratorsToClassDefinition
  "c3,c4,c5,c6" // classExtraInitializers
  );
}
{
  let _initClass5, _classDecs5, _computedKey6, _computedKey7;
  const log = [];
  _classDecs5 = [classDec1(log), classDec2(log)];
  let _C5;
  new class extends babelHelpers.identity {
    static [class C {
      static {
        [_C5, _initClass5] = babelHelpers.applyDecs2311(this, _classDecs5, []).c;
      }
      static set [log.push("k1")](v) {}
      [(_computedKey7 = log.push("k2"), _computedKey6 = log.push("k3"), _computedKey7)];
    }];
    [_computedKey6];
    constructor() {
      super(_C5), _initClass5();
    }
  }();
  expect(log.join()).toBe("k1,k2,k3," +
  // ClassElementEvaluation
  "c1,c2," +
  // ApplyDecoratorsToClassDefinition
  "c3,c4,c5,c6" // classExtraInitializers
  );
}
{
  let _initClass6, _classDecs6, _computedKey8, _computedKey9, _computedKey10;
  const log = [];
  _classDecs6 = [classDec1(log), classDec2(log)];
  let _C6;
  new class extends babelHelpers.identity {
    static [class C {
      static [(_computedKey8 = log.push("k1"), _computedKey9 = log.push("k2"), _computedKey10 = log.push("k3"), "_")];
      static {
        delete this._;
        [_C6, _initClass6] = babelHelpers.applyDecs2311(this, _classDecs6, []).c;
      }
    }];
    [_computedKey8];
    [_computedKey9];
    [_computedKey10];
    constructor() {
      super(_C6), _initClass6();
    }
  }();
  expect(log.join()).toBe("k1,k2,k3," +
  // ClassElementEvaluation
  "c1,c2," +
  // ApplyDecoratorsToClassDefinition
  "c3,c4,c5,c6" // classExtraInitializers
  );
}
