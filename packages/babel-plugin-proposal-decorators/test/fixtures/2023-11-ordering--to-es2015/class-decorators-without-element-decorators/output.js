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
  var _C2;
  let _initClass, _classDecs, _log$push, _log$push2, _log$push3;
  const log = [];
  _classDecs = [classDec1(log), classDec2(log)];
  let _C;
  _log$push = log.push("k1");
  _log$push2 = log.push("k2");
  _log$push3 = log.push("k3");
  class C {
    constructor() {
      babelHelpers.defineProperty(this, _log$push, void 0);
      babelHelpers.defineProperty(this, _log$push2, void 0);
      babelHelpers.defineProperty(this, _log$push3, void 0);
    }
  }
  _C2 = C;
  [_C, _initClass] = babelHelpers.applyDecs2311(_C2, _classDecs, []).c;
  _initClass();
  expect(log.join()).toBe("k1,k2,k3," +
  // ClassElementEvaluation
  "c1,c2," +
  // ApplyDecoratorsToClassDefinition
  "c3,c4,c5,c6" // classExtraInitializers
  );
}
{
  var _Class, _C5;
  let _initClass2, _classDecs2, _computedKey, _C4, _ref, _log$push4;
  const log = [];
  _classDecs2 = [classDec1(log), classDec2(log)];
  let _C3;
  new (_C4 = (_ref = (_computedKey = log.push("k1"), log.push("k2")), _log$push4 = log.push("k3"), _C5 = class C {
    constructor() {
      babelHelpers.defineProperty(this, _log$push4, void 0);
    }
    async [_ref](v) {}
  }, [_C3, _initClass2] = babelHelpers.applyDecs2311(_C5, _classDecs2, []).c, _C5), _Class = class extends babelHelpers.identity {
    constructor() {
      super(_C3), babelHelpers.defineProperty(this, _computedKey, void 0), _initClass2();
    }
  }, babelHelpers.defineProperty(_Class, _C4, void 0), _Class)();
  expect(log.join()).toBe("k1,k2,k3," +
  // ClassElementEvaluation
  "c1,c2," +
  // ApplyDecoratorsToClassDefinition
  "c3,c4,c5,c6" // classExtraInitializers
  );
}
{
  var _Class2, _C8;
  let _initClass3, _classDecs3, _computedKey3, _C7, _log$push5, _ref2;
  const log = [];
  _classDecs3 = [classDec1(log), classDec2(log)];
  let _C6;
  new (_C7 = (_log$push5 = log.push("k1"), _ref2 = (_computedKey3 = log.push("k2"), log.push("k3")), _C8 = class C {
    constructor() {
      babelHelpers.defineProperty(this, _ref2, void 0);
    }
    get [_log$push5]() {}
  }, [_C6, _initClass3] = babelHelpers.applyDecs2311(_C8, _classDecs3, []).c, _C8), _Class2 = class extends babelHelpers.identity {
    constructor() {
      super(_C6), babelHelpers.defineProperty(this, _computedKey3, void 0), _initClass3();
    }
  }, babelHelpers.defineProperty(_Class2, _C7, void 0), _Class2)();
  expect(log.join()).toBe("k1,k2,k3," +
  // ClassElementEvaluation
  "c1,c2," +
  // ApplyDecoratorsToClassDefinition
  "c3,c4,c5,c6" // classExtraInitializers
  );
}
{
  var _Class3, _C11, _A;
  let _computedKey5, _initClass4, _classDecs4, _computedKey6, _C10, _log$push6, _ref3;
  const log = [];
  _classDecs4 = [classDec1(log), classDec2(log)];
  let _C9;
  new (_C10 = (_A = /*#__PURE__*/new WeakMap(), _log$push6 = log.push("k1"), _computedKey5 = babelHelpers.toPropertyKey(log.push("k2")), _ref3 = (_computedKey6 = log.push("k3"), _computedKey5), _C11 = class C {
    constructor() {
      babelHelpers.defineProperty(this, _log$push6, void 0);
      babelHelpers.classPrivateFieldInitSpec(this, _A, void 0);
    }
    get [_computedKey5]() {
      return babelHelpers.classPrivateFieldGet2(_A, this);
    }
    set [_ref3](v) {
      babelHelpers.classPrivateFieldSet2(_A, this, v);
    }
  }, [_C9, _initClass4] = babelHelpers.applyDecs2311(_C11, _classDecs4, []).c, _C11), _Class3 = class extends babelHelpers.identity {
    constructor() {
      super(_C9), babelHelpers.defineProperty(this, _computedKey6, void 0), _initClass4();
    }
  }, babelHelpers.defineProperty(_Class3, _C10, void 0), _Class3)();
  expect(log.join()).toBe("k1,k2,k3," +
  // ClassElementEvaluation
  "c1,c2," +
  // ApplyDecoratorsToClassDefinition
  "c3,c4,c5,c6" // classExtraInitializers
  );
}
{
  var _Class4, _C14;
  let _initClass5, _classDecs5, _computedKey10, _computedKey11, _C13, _log$push7, _ref4;
  const log = [];
  _classDecs5 = [classDec1(log), classDec2(log)];
  let _C12;
  new (_C13 = (_log$push7 = log.push("k1"), _ref4 = (_computedKey11 = log.push("k2"), _computedKey10 = log.push("k3"), _computedKey11), _C14 = class C {
    constructor() {
      babelHelpers.defineProperty(this, _ref4, void 0);
    }
    static set [_log$push7](v) {}
  }, [_C12, _initClass5] = babelHelpers.applyDecs2311(_C14, _classDecs5, []).c, _C14), _Class4 = class extends babelHelpers.identity {
    constructor() {
      super(_C12), babelHelpers.defineProperty(this, _computedKey10, void 0), _initClass5();
    }
  }, babelHelpers.defineProperty(_Class4, _C13, void 0), _Class4)();
  expect(log.join()).toBe("k1,k2,k3," +
  // ClassElementEvaluation
  "c1,c2," +
  // ApplyDecoratorsToClassDefinition
  "c3,c4,c5,c6" // classExtraInitializers
  );
}
{
  var _Class5, _C17;
  let _initClass6, _classDecs6, _computedKey13, _computedKey14, _computedKey15, _C16, _ref5;
  const log = [];
  _classDecs6 = [classDec1(log), classDec2(log)];
  let _C15;
  new (_C16 = (_ref5 = (_computedKey13 = log.push("k1"), _computedKey14 = log.push("k2"), _computedKey15 = log.push("k3"), "_"), _C17 = class C {}, babelHelpers.defineProperty(_C17, _ref5, void 0), (() => {
    delete _C17._;
    [_C15, _initClass6] = babelHelpers.applyDecs2311(_C17, _classDecs6, []).c;
  })(), _C17), _Class5 = class extends babelHelpers.identity {
    constructor() {
      super(_C15), babelHelpers.defineProperty(this, _computedKey13, void 0), babelHelpers.defineProperty(this, _computedKey14, void 0), babelHelpers.defineProperty(this, _computedKey15, void 0), _initClass6();
    }
  }, babelHelpers.defineProperty(_Class5, _C16, void 0), _Class5)();
  expect(log.join()).toBe("k1,k2,k3," +
  // ClassElementEvaluation
  "c1,c2," +
  // ApplyDecoratorsToClassDefinition
  "c3,c4,c5,c6" // classExtraInitializers
  );
}
