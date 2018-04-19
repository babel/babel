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
expect(mazer.name).toBe('Mazer Rackham');
mazer.name = 'Ender Wiggin';
expect(mazer.firstName).toBe('Ender');
expect(mazer.lastName).toBe('Wiggin');

var forLoopProperties = [];
for (var key in mazer) {
  forLoopProperties.push(key);
}
expect(forLoopProperties).not.toEqual(expect.stringContaining('name'));
