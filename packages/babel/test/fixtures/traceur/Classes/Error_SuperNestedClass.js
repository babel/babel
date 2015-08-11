// Error: :12:5: 'this' is not allowed before super()

class Animal {}

class Roo extends Animal {
  constructor() {
    class Koala extends Animal {
      constructor() {
        super();
      }
    }
    this.a = new Koala;
    super();
  }
}
