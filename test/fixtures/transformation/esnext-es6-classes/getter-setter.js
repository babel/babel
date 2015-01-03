class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get name() {
    return this.firstName + ' ' + this.lastName;
  }

  set name(name) {
    var parts = name.split(' ');
    this.firstName = parts[0];
    this.lastName = parts[1];
  }
}

var mazer = new Person('Mazer', 'Rackham');
assert.equal(mazer.name, 'Mazer Rackham');
mazer.name = 'Ender Wiggin';
assert.equal(mazer.firstName, 'Ender');
assert.equal(mazer.lastName, 'Wiggin');

var forLoopProperties = [];
for (var key in mazer) {
  forLoopProperties.push(key);
}
assert.ok(forLoopProperties.indexOf('name') >= 0, 'getters/setters are enumerable');
