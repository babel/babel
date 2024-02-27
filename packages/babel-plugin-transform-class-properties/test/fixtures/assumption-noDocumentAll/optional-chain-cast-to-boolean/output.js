class C {
  static testIf(o) {
    if (o != null && babelHelpers.assertClassBrand(C, o, _a)._.b.c.d) {
      return true;
    }
    return false;
  }
  static testConditional(o) {
    return (o == null ? void 0 : babelHelpers.assertClassBrand(C, o, _a)._.b)?.c.d ? true : false;
  }
  static testLoop(o) {
    while (o != null && babelHelpers.assertClassBrand(C, o, _a)._.b.c.d) {
      for (; (o == null ? void 0 : babelHelpers.assertClassBrand(C, o, _a)._.b.c)?.d;) {
        let i = 0;
        do {
          i++;
          if (i === 2) {
            return true;
          }
        } while ((o == null ? void 0 : babelHelpers.assertClassBrand(C, o, _a)._.b)?.c.d);
      }
    }
    return false;
  }
  static testNegate(o) {
    return !!(o == null ? void 0 : babelHelpers.assertClassBrand(C, o, _a)._.b)?.c.d;
  }
  static testIfDeep(o) {
    var _o$obj;
    if (((_o$obj = o.obj) == null ? void 0 : babelHelpers.assertClassBrand(C, _o$obj, _a)._.b)?.c.d) {
      return true;
    }
    return false;
  }
  static testConditionalDeep(o) {
    var _o$obj2;
    return ((_o$obj2 = o.obj) == null ? void 0 : babelHelpers.assertClassBrand(C, _o$obj2, _a)._.b)?.c.d ? true : false;
  }
  static testLoopDeep(o) {
    while ((_o$obj3 = o.obj) != null && babelHelpers.assertClassBrand(C, _o$obj3, _a)._.b.c.d) {
      var _o$obj3;
      for (; ((_o$obj4 = o.obj) == null ? void 0 : babelHelpers.assertClassBrand(C, _o$obj4, _a)._.b.c)?.d;) {
        var _o$obj4;
        let i = 0;
        do {
          var _o$obj5;
          i++;
          if (i === 2) {
            return true;
          }
        } while (((_o$obj5 = o.obj) == null ? void 0 : babelHelpers.assertClassBrand(C, _o$obj5, _a)._.b)?.c.d);
      }
    }
    return false;
  }
  static testNegateDeep(o) {
    var _o$obj6;
    return !!((_o$obj6 = o.obj) == null ? void 0 : babelHelpers.assertClassBrand(C, _o$obj6, _a)._.b)?.c.d;
  }
  static testLogicalInIf(o) {
    if ((o == null ? void 0 : babelHelpers.assertClassBrand(C, o, _a)._.b)?.c.d && (o == null ? void 0 : babelHelpers.assertClassBrand(C, o, _a)._)?.b.c.d) {
      return true;
    }
    return false;
  }
  static testLogicalInReturn(o) {
    return (o == null ? void 0 : babelHelpers.assertClassBrand(C, o, _a)._.b)?.c.d && (o == null ? void 0 : babelHelpers.assertClassBrand(C, o, _a)._)?.b.c.d;
  }
  static testNullishCoalescing(o) {
    if ((o == null ? void 0 : babelHelpers.assertClassBrand(C, o, _a)._.b)?.c.non_existent ?? (o == null ? void 0 : babelHelpers.assertClassBrand(C, o, _a)._.b)?.c.d) {
      return (o == null ? void 0 : babelHelpers.assertClassBrand(C, o, _a)._.b)?.c.non_existent ?? (o == null ? void 0 : babelHelpers.assertClassBrand(C, o, _a)._.b)?.c.d;
    }
    return (o == null ? void 0 : babelHelpers.assertClassBrand(C, o, _a)._.b)?.c.non_existent ?? o;
  }
}
var _a = {
  _: {
    b: {
      c: {
        d: 2
      }
    }
  }
};
C.test();
C.testNullish();
