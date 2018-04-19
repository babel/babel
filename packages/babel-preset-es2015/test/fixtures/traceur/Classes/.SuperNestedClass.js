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
expect(r.name).toBe('R');
expect(r.a.name).toBe('K');
