class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Roo extends Animal {
  constructor() {
    class Koala extends (super('R'), Animal) {
      constructor() {
        super('K');
      }
    }
    this.a = new Koala;
  }
}


var r = new Roo();
assert.equal('R', r.name);
assert.equal('K', r.a.name);
