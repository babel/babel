class One {
  constructor(o) { o.r = 'c1'; }
  m() { return 'm1'; }
  get g() { return 'g1'; }
  set x(v) { this.x_ = v+1; }
  get x() { return this.x_; }
}

// All OneExt class decls are identical.
//
// Just testing identical behavior in the different contexts:
// constructor, method, method with inner func, getter, setter.
class OneExtWrapper {
  constructor() {
    class OneExt extends One {
      constructor() {
        var o = {};
        super(o);
        expect(o.r).toBe('c1');
      }
      m() { return super.m(); }
      get g() { return super.g; }
      set x(v) { super.x = v; }
      get x() { return super.x; }
    }
    this.Cconstr = OneExt;
  }
  m() {
    class OneExt extends One {
      constructor() {
        var o = {};
        super(o);
        expect(o.r).toBe('c1');
      }
      m() { return super.m(); }
      get g() { return super.g; }
      set x(v) { super.x = v; }
      get x() { return super.x; }
    }
    return OneExt;
  }
  mf() {
    return (function(){
      class OneExt extends One {
        constructor() {
          var o = {};
          super(o);
          expect(o.r).toBe('c1');
        }
        m() { return super.m(); }
        get g() { return super.g; }
        set x(v) { super.x = v; }
        get x() { return super.x; }
      }
      return OneExt;
    })();
  }
  get g() {
    class OneExt extends One {
      constructor() {
        var o = {};
        super(o);
        expect(o.r).toBe('c1');
      }
      m() { return super.m(); }
      get g() { return super.g; }
      set x(v) { super.x = v; }
      get x() { return super.x; }
    }
    return OneExt;
  }
  set Cprop(v) {
    class OneExt extends One {
      constructor() {
        var o = {};
        super(o);
        expect(o.r).toBe('c1');
      }
      m() { return super.m(); }
      get g() { return super.g; }
      set x(v) { super.x = v; }
      get x() { return super.x; }
    }
    this.C = OneExt;
  }
  get Cprop() {
    return this.C;
  }
}

// ----------------------------------------------------------------------------

function checkClass(C) {
  var o = new C();
  expect(o.m()).toBe('m1');
  expect(o.g).toBe('g1');
  o.x = 'x';
  expect(o.x).toBe('x1');
}

var o = new OneExtWrapper();
o.Cprop = 'dummy value';

[o.Cconstr, o.m(), o.mf(), o.g, o.Cprop].forEach(checkClass);
