// Error: :8:14: super is only allowed in methods
// Error: :14:16: super is only allowed in methods
// Error: :19:19: super is only allowed in methods

class C {
  superM() {
    return (function() {
      return super.m();
    })();
  }
  superX2() {
    return (function() {
      return (function() {
        return super.x;
      })();
    })();
  }
  constructor() {
    (function() { super(); })();
  }
}

