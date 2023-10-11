class C {
  static testIf(o) {
    if (o != null && babelHelpers.classStaticPrivateFieldSpecGet(o, C, _a).b.c.d) {
      return true;
    }
    return false;
  }
  static testConditional(o) {
    return (o == null ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(o, C, _a).b)?.c.d ? true : false;
  }
  static testLoop(o) {
    while (o != null && babelHelpers.classStaticPrivateFieldSpecGet(o, C, _a).b.c.d) {
      for (; (o == null ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(o, C, _a).b.c)?.d;) {
        let i = 0;
        do {
          i++;
          if (i === 2) {
            return true;
          }
        } while ((o == null ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(o, C, _a).b)?.c.d);
      }
    }
    return false;
  }
  static testNegate(o) {
    return !!(o == null ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(o, C, _a).b)?.c.d;
  }
  static testIfDeep(o) {
    var _o$obj;
    if (((_o$obj = o.obj) == null ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(_o$obj, C, _a).b)?.c.d) {
      return true;
    }
    return false;
  }
  static testConditionalDeep(o) {
    var _o$obj2;
    return ((_o$obj2 = o.obj) == null ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(_o$obj2, C, _a).b)?.c.d ? true : false;
  }
  static testLoopDeep(o) {
    while ((_o$obj3 = o.obj) != null && babelHelpers.classStaticPrivateFieldSpecGet(_o$obj3, C, _a).b.c.d) {
      var _o$obj3;
      for (; ((_o$obj4 = o.obj) == null ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(_o$obj4, C, _a).b.c)?.d;) {
        var _o$obj4;
        let i = 0;
        do {
          var _o$obj5;
          i++;
          if (i === 2) {
            return true;
          }
        } while (((_o$obj5 = o.obj) == null ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(_o$obj5, C, _a).b)?.c.d);
      }
    }
    return false;
  }
  static testNegateDeep(o) {
    var _o$obj6;
    return !!((_o$obj6 = o.obj) == null ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(_o$obj6, C, _a).b)?.c.d;
  }
  static testLogicalInIf(o) {
    if ((o == null ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(o, C, _a).b)?.c.d && (o == null ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(o, C, _a))?.b.c.d) {
      return true;
    }
    return false;
  }
  static testLogicalInReturn(o) {
    return (o == null ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(o, C, _a).b)?.c.d && (o == null ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(o, C, _a))?.b.c.d;
  }
  static testNullishCoalescing(o) {
    if ((o == null ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(o, C, _a).b)?.c.non_existent ?? (o == null ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(o, C, _a).b)?.c.d) {
      return (o == null ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(o, C, _a).b)?.c.non_existent ?? (o == null ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(o, C, _a).b)?.c.d;
    }
    return (o == null ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(o, C, _a).b)?.c.non_existent ?? o;
  }
}
var _a = {
  writable: true,
  value: {
    b: {
      c: {
        d: 2
      }
    }
  }
};
C.test();
C.testNullish();
