// Imported from
// https://github.com/WebReflection/babel-plugin-transform-builtin-classes/blob/85efe1374e1c59a8323c7eddd4326f6c93d9f64f/test/test.js

class List extends Array {
  constructor(value) {
    super().push(value);
  }
  push(value) {
    super.push(value);
    return this;
  }
}

assert.ok(new List(1) instanceof List, 'new List is an instanceof List');
assert.ok(new List(2) instanceof Array, 'new List is an instanceof Array');

var l = new List(3);
assert.ok(l.length === 1 && l[0] === 3, 'constructor pushes an entry');
assert.ok(l.push(4) === l && l.length === 2 && l.join() === '3,4', 'method override works');

class SecondLevel extends List {
  method() {
    return this;
  }
}

assert.ok(new SecondLevel(1) instanceof SecondLevel, 'new SecondLevel is an instanceof SecondLevel');
assert.ok(new SecondLevel(2) instanceof List, 'new SecondLevel is an instanceof List');
assert.ok(new SecondLevel(3) instanceof Array, 'new SecondLevel is an instanceof Array');

var s = new SecondLevel(4);
assert.ok(s.length === 1 && s[0] === 4, 'constructor pushes an entry');
assert.ok(s.push(5) === s && s.length === 2 && s.join() === '4,5', 'inherited override works');
assert.ok(s.method() === s, 'new method works');
