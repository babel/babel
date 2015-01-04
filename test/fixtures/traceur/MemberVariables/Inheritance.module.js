// Options: --member-variables --types --type-assertions --type-assertion-module=../TypeAssertions/resources/assert.js

import '../TypeAssertions/resources/assert.js';

class Parent {
  a:string;
  static staticA:string;
}

class Child extends Parent {
  b:string;
  static staticB:string;
}

var child = new Child();
child.a = 'defined in Parent';
child.b = 'defined in Child';
Child.staticA = 'static in Parent';
Child.staticB = 'static in Child';

assert.throw(() => { child.a = 0; }, chai.AssertionError);
assert.throw(() => { child.b = 0; }, chai.AssertionError);
assert.throw(() => { Child.staticA = 0; }, chai.AssertionError);
assert.throw(() => { Child.staticB = 0; }, chai.AssertionError);
