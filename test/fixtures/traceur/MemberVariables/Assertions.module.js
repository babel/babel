// Options: --member-variables --types --type-assertions --type-assertion-module=../TypeAssertions/resources/assert.js

import '../TypeAssertions/resources/assert.js';

class Test {
  a:string;
  static b:string;
  uninitialized: string;
  c;
}

var test = new Test();

test.c = 'str';
assert.equal(test.c, 'str');

test.a  = 'a';
assert.equal(test.a, 'a');

Test.b = 'b';
assert.equal(Test.b, 'b');

assert.throw(() => { test.uninitialized; }, chai.AssertionError);
assert.throw(() => { test.a = 0; }, chai.AssertionError);
assert.throw(() => { Test.b = 0; }, chai.AssertionError);
