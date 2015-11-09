class Person {
  @reader _first = "Andreas";
  @reader _last = "Rossberg";
}

let andreas = new Person();
assert.equal(andreas.first, "Andreas");
assert.equal(andreas.last, "Rossberg");
