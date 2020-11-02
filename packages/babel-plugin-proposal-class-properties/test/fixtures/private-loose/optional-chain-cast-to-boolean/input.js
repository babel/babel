class C {
  static #a = {
    b: {
      c: {
        d: 2,
      },
    },
  };
  static testIf(o) {
    if (o?.#a.b.c.d) {
      return true;
    }
    return false;
  }
  static testConditional(o) {
    return o?.#a.b?.c.d ? true : false;
  }
  static testLoop(o) {
    while (o?.#a.b.c.d) {
      for (; o?.#a.b.c?.d; ) {
        let i = 0;
        do {
          i++;
          if (i === 2) {
            return true;
          }
        } while (o?.#a.b?.c.d);
      }
    }
    return false;
  }
  static testNegate(o) {
    return !!o?.#a.b?.c.d;
  }
  static testIfDeep(o) {
    if (o.obj?.#a.b?.c.d) {
      return true;
    }
    return false;
  }
  static testConditionalDeep(o) {
    return o.obj?.#a.b?.c.d ? true : false;
  }
  static testLoopDeep(o) {
    while (o.obj?.#a.b.c.d) {
      for (; o.obj?.#a.b.c?.d; ) {
        let i = 0;
        do {
          i++;
          if (i === 2) {
            return true;
          }
        } while (o.obj?.#a.b?.c.d);
      }
    }
    return false;
  }
  static testNegateDeep(o) {
    return !!o.obj?.#a.b?.c.d;
  }

  static testLogicalInIf(o) {
    if (o?.#a.b?.c.d && o?.#a?.b.c.d) {
      return true;
    }
    return false;
  }

  static testLogicalInReturn(o) {
    return o?.#a.b?.c.d && o?.#a?.b.c.d;
  }
}

C.test();
C.testNullish();
