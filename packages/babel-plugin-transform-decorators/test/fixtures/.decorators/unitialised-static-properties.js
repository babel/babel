class Person {
  @reader static _first;
  @reader static _last;
}

let jonathan = Person;

assert.equal(jonathan.first, undefined);

Object.assign(jonathan, { _first: "Jonathan", _last: "Turner" });

assert.equal(jonathan.first, "Jonathan");
assert.equal(jonathan.last, "Turner");
