function enumerable(bool) {
  return function(descriptor) {
    descriptor.descriptor.enumerable = bool;
    return {descriptor, finishers: [], extras: []};
  }
}

class Foo {
  @enumerable(false) falsy() {}
  @enumerable(true) @enumerable(false) truthy() {}
  falsyByDefault() {}
}

//existence 
assert(Foo.prototype.falsy);
assert(Foo.prototype.truthy);

//enumerability
assert.equal(Foo.prototype.propertyIsEnumerable("falsyByDefault"), false);
assert.equal(Foo.prototype.propertyIsEnumerable("falsy"), false);
assert.equal(Foo.prototype.propertyIsEnumerable("truthy"), true);
assert.deepEqual(Object.keys(Foo.prototype), ["truthy"]);
