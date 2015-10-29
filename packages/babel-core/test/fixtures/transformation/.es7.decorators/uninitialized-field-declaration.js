class Person {
  @reader _first;
  @reader _last;

  constructor(first="Waldemar", last="Horwat") {
    this._first = first;
    this._last = last;
  }
}

let waldemar = new Person();
assert.equal(waldemar.first, "Waldemar");
assert.equal(waldemar.last, "Horwat");

let jeff = new Person("Jeff", "Morrison");
assert.equal(jeff.first, "Jeff");
assert.equal(jeff.last, "Morrison");
