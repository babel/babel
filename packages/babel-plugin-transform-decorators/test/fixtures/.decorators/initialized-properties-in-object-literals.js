let person = {
  @reader _first: "Mark",
  @reader _last: "Miller"
};

assert.equal(person.first, "Mark");
assert.equal(person.last, "Miller");
