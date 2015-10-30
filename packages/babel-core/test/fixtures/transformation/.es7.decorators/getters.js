class Person {
  @reader _first;
  @reader last;

  constructor(first, last) {
    this._first = first;
    this._last = last;
  }

  @reader get _fullName() {
    return `${this._first} ${this._last}`;
  }
}

let jason = new Person("Jason", "Orendorff");

assert.equal(jason.first, "Jason");
assert.equal(jason.last, "Orendorff");
assert.equal(jason.fullName, "Jason Orendorff");

jason.update("JSON", "Orendorff")
assert.equal(jason.first, "JSON");
assert.equal(jason.fullName, "JSON Orendorff");
