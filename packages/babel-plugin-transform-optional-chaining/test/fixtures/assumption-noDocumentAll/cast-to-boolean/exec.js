class C {
  static testIf(o) {
    if (o?.a.b.c.d) {
      return true;
    }
    return false;
  }
  static testConditional(o) {
    return o?.a.b?.c.d ? true : false;
  }
  static testLoop(o) {
    while (o?.a.b.c.d) {
      for (; o?.a.b.c?.d; ) {
        let i = 0;
        do {
          i++;
          if (i === 2) {
            return true;
          }
        } while (o?.a.b?.c.d);
      }
    }
    return false;
  }
  static testNegate(o) {
    return !!o?.a.b?.c.d;
  }
  static testIfDeep(o) {
    if (o.obj?.a.b?.c.d) {
      return true;
    }
    return false;
  }
  static testConditionalDeep(o) {
    return o.obj?.a.b?.c.d ? true : false;
  }
  static testLoopDeep(o) {
    while (o.obj?.a.b.c.d) {
      for (; o.obj?.a.b.c?.d; ) {
        let i = 0;
        do {
          i++;
          if (i === 2) {
            return true;
          }
        } while (o.obj?.a.b?.c.d);
      }
    }
    return false;
  }
  static testNegateDeep(o) {
    return !!o.obj?.a.b?.c.d;
  }

  static testLogicalInIf(o) {
    if (o?.a.b?.c.d && o?.a?.b.c.d) {
      return true;
    }
    return false;
  }

  static testLogicalInReturn(o) {
    return o?.a.b?.c.d && o?.a?.b.c.d;
  }

  static testNullishCoalescing(o) {
    if (o?.a.b?.c.non_existent ?? o?.a.b?.c.d) {
      return o?.a.b?.c.non_existent ?? o?.a.b?.c.d;
    }
    return o?.a.b?.c.non_existent ?? o;
  }

  static test() {
    const c = {
      a: {
        b: {
          c: {
            d: 2,
          },
        },
      },
    };
    expect(C.testIf(c)).toBe(true);
    expect(C.testConditional(c)).toBe(true);
    expect(C.testLoop(c)).toBe(true);
    expect(C.testNegate(c)).toBe(true);

    expect(C.testIfDeep({ obj: c })).toBe(true);
    expect(C.testConditionalDeep({ obj: c })).toBe(true);
    expect(C.testLoopDeep({ obj: c })).toBe(true);
    expect(C.testNegateDeep({ obj: c })).toBe(true);

    expect(C.testLogicalInIf(c)).toBe(true);
    expect(C.testLogicalInReturn(c)).toBe(2);

    expect(C.testNullishCoalescing(c)).toBe(2);
  }

  static testNullish() {
    for (const n of [null, undefined]) {
      expect(C.testIf(n)).toBe(false);
      expect(C.testConditional(n)).toBe(false);
      expect(C.testLoop(n)).toBe(false);
      expect(C.testNegate(n)).toBe(false);

      expect(C.testIfDeep({ obj: n })).toBe(false);
      expect(C.testConditionalDeep({ obj: n })).toBe(false);
      expect(C.testLoopDeep({ obj: n })).toBe(false);
      expect(C.testNegateDeep({ obj: n })).toBe(false);

      expect(C.testLogicalInIf(n)).toBe(false);
      expect(C.testLogicalInReturn(n)).toBe(undefined);

      expect(C.testNullishCoalescing(n)).toBe(n);
    }
  }
}

C.test();
C.testNullish();
