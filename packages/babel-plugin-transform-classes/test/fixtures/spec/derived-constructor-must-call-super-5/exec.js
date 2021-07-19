class Bar {}

class Foo extends Bar {
    constructor() {
      super();
      return 3;
    }
  }
  
expect(() => new Foo()).toThrow("Invalid attempt to return primitive value");
