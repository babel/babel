const logs = [];

function overrider(fn) {
  return function(descriptor) {
    descriptor.descriptor.value = fn;
    return {descriptor, extras: [], finishers: []};
  }
}

function dec(log) {
  return function (descriptor) {
    const finisher = function (ctor) {
      const x = new ctor(); 
      assert(x.method1);
      assert(x.method2);
      assert.equal(x.method1(), "method1");
      // making sure that ctor passed to the finisher has all the decorators applied
      assert.equal(x.method2(), "method2 overridden");
      logs.push("finisher called " + log);
    }

    return {descriptor, extras: [], finishers: [finisher]}
  }
}

function classDec(constructor, heritage, elements) {
  return {constructor, elements, finishers: [() => logs.push("finisher called classDec")]};
}

@classDec class Foo {
  @dec(1) method1() {return "method1"}
  @dec(2) @overrider(() => "method2 overridden") method2() {return "method2"};
}

assert.deepEqual(logs, ["finisher called 1", "finisher called 2", "finisher called classDec"]);
