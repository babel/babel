// This requires manually constructed classes.

function fieldLookupA() { }
fieldLookupA.prototype = {
  foo : "A.value",
  get bar() {
    return "A.get.bar";
  },
  set bar(value) { },
  boo : "A.boo.value",
  baz : undefined
}

function fieldLookupB() { }
fieldLookupB.prototype = {
  __proto__ : fieldLookupA.prototype,
  get foo() {
    return "B.get.foo";
  },
  set foo(value) { },
  bar: "B.value",
  boo: undefined,
  baz: "B.baz.value",
}

class FieldLookupC extends fieldLookupB {
  x() {
    return super.foo;
  }
  y() {
    return super.bar;
  }
  z() {
    return super.boo;
  }
  w() {
    return super.baz;
  }
}

// ----------------------------------------------------------------------------

var c = new FieldLookupC();
assert.equal("B.get.foo", c.x());
assert.equal("B.value", c.y());
assert.isUndefined(c.z());
assert.equal("B.baz.value", c.w());
