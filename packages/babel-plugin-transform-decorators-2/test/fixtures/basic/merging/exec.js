let calls = [];

function getter(name) {
  return function (descriptor) {
    const extra = {
      kind: "property",
      key: name,
      isStatic: false,
      descriptor: {
        enumerable: true,
        configurable: true,
        get: function () {
          calls.push("getter called for " + name);
        }
      }
    }
    
    return {descriptor, extras: [extra], finishers: []}
  }
}

function setter(name) {
  return function (descriptor) {
    const extra = {
      kind: "property",
      key: name,
      isStatic: false,
      descriptor: {
        enumerable: true,
        configurable: true,
        set: function (value) {
          calls.push("setter called for " + name);
        }
      }
    }

    return {descriptor, extras: [extra], finishers: []}
  }
}

class Foo {
  @setter("sets") @getter("gets") @getter("both") @setter("both") bar () {return "hello"}
}

let x = new Foo();
assert.equal(x.bar(), "hello");

x.both;
x.both = 3;
x.sets;
x.sets = 5;
x.gets;
x.gets = 7;

// getters and setters are merged
assert.deepEqual(calls, ["getter called for both", "setter called for both", "setter called for sets", "getter called for gets"]);

