class SuperClass {}

class MyClass extends SuperClass {
  constructor() {
    var _super = super;

    const arrow = function () {
      _super();
    };
    arrow();
  }
}
