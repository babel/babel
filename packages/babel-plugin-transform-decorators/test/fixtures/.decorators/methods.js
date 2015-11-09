function reader(target, descriptor) {
  let { enumerable, configurable, property: { name, get }, hint } = descriptor;
  let publicName = extractPublicName(name());
  Object.defineProperty(target, publicName, {
    enumerable, configurable, get: function() { return get(this, name); }
  });
  return descriptor;
}

function extractPublicName(name) {
  // _first -> first
  return name.slice(1);
}

class Person {
  @reader _first;
  @reader _last;

  constructor(first, last) {
    this._first = first;
    this._last = last;
  }

  @reader _update(first, last) {
    this._first = first;
    this._last = last;
  }
}

let alex = new Person("Alex", "Russell");
assert.equal(alex.first, "Alex");
alex.update("Alexander", "Russell");
assert.equal(alex.first, "Alexander");
