class SuperClass {}

class MyClass extends SuperClass {
  constructor() {
    const arrow = () => {
      super();
    }
    arrow();
  }
}
