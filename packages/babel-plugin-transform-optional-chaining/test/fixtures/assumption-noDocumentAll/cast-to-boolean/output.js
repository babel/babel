class C {
  static testIf(o) {
    if (o != null && o.a.b.c.d) {
      return true;
    }
    return false;
  }
  static testConditional(o) {
    var _o$a$b;
    return o != null && (_o$a$b = o.a.b) != null && _o$a$b.c.d ? true : false;
  }
  static testLoop(o) {
    while (o != null && o.a.b.c.d) {
      for (; o != null && (_o$a$b$c = o.a.b.c) != null && _o$a$b$c.d;) {
        var _o$a$b$c;
        let i = 0;
        do {
          var _o$a$b2;
          i++;
          if (i === 2) {
            return true;
          }
        } while (o != null && (_o$a$b2 = o.a.b) != null && _o$a$b2.c.d);
      }
    }
    return false;
  }
  static testNegate(o) {
    var _o$a$b3;
    return !!(o != null && (_o$a$b3 = o.a.b) != null && _o$a$b3.c.d);
  }
  static testIfDeep(o) {
    var _o$obj;
    if ((_o$obj = o.obj) != null && (_o$obj = _o$obj.a.b) != null && _o$obj.c.d) {
      return true;
    }
    return false;
  }
  static testConditionalDeep(o) {
    var _o$obj2;
    return (_o$obj2 = o.obj) != null && (_o$obj2 = _o$obj2.a.b) != null && _o$obj2.c.d ? true : false;
  }
  static testLoopDeep(o) {
    while ((_o$obj3 = o.obj) != null && _o$obj3.a.b.c.d) {
      var _o$obj3;
      for (; (_o$obj4 = o.obj) != null && (_o$obj4 = _o$obj4.a.b.c) != null && _o$obj4.d;) {
        var _o$obj4;
        let i = 0;
        do {
          var _o$obj5;
          i++;
          if (i === 2) {
            return true;
          }
        } while ((_o$obj5 = o.obj) != null && (_o$obj5 = _o$obj5.a.b) != null && _o$obj5.c.d);
      }
    }
    return false;
  }
  static testNegateDeep(o) {
    var _o$obj6;
    return !!((_o$obj6 = o.obj) != null && (_o$obj6 = _o$obj6.a.b) != null && _o$obj6.c.d);
  }
  static testLogicalInIf(o) {
    var _o$a$b4, _o$a;
    if (o != null && (_o$a$b4 = o.a.b) != null && _o$a$b4.c.d && o != null && (_o$a = o.a) != null && _o$a.b.c.d) {
      return true;
    }
    return false;
  }
  static testLogicalInReturn(o) {
    var _o$a$b5, _o$a2;
    return (o == null || (_o$a$b5 = o.a.b) == null ? void 0 : _o$a$b5.c.d) && (o == null || (_o$a2 = o.a) == null ? void 0 : _o$a2.b.c.d);
  }
  static testNullishCoalescing(o) {
    var _o$a$b$c$non_existent, _o$a$b6, _o$a$b7, _o$a$b$c$non_existent3, _o$a$b10;
    if ((_o$a$b$c$non_existent = o == null || (_o$a$b6 = o.a.b) == null ? void 0 : _o$a$b6.c.non_existent) != null ? _o$a$b$c$non_existent : o == null || (_o$a$b7 = o.a.b) == null ? void 0 : _o$a$b7.c.d) {
      var _o$a$b$c$non_existent2, _o$a$b8, _o$a$b9;
      return (_o$a$b$c$non_existent2 = o == null || (_o$a$b8 = o.a.b) == null ? void 0 : _o$a$b8.c.non_existent) != null ? _o$a$b$c$non_existent2 : o == null || (_o$a$b9 = o.a.b) == null ? void 0 : _o$a$b9.c.d;
    }
    return (_o$a$b$c$non_existent3 = o == null || (_o$a$b10 = o.a.b) == null ? void 0 : _o$a$b10.c.non_existent) != null ? _o$a$b$c$non_existent3 : o;
  }
}
C.test();
C.testNullish();
