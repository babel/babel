let person = {
  @reader _first,
  @reader _last
};

assert.equal(person.first, "undefined");

Object.assign(person, { _first: "Brian", _last: "Terlson" });

assert.equal(person.first, "Brian");
assert.equal(person.last, "Terlson");
