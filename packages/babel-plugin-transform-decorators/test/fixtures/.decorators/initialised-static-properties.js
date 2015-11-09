class Person {
  @reader static _first = "Brendan";
  @reader static _last = "Eich";
}

let brendan = Person;
assert.equal(brendan.first, "Brendan");
assert.equal(brendan.last, "Eich");
