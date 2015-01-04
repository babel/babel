// Options: --member-variables --types --type-assertions --type-assertion-module=../TypeAssertions/resources/assert.js

import '../TypeAssertions/resources/assert.js';

class C {
  d() {
    class D {
      x: number;
    }

    return new D();
  }
}

var d = new C().d();

assert.throw(() => { d.x = 'string'}, chai.AssertionError);
