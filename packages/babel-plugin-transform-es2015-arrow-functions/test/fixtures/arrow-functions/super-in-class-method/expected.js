class SuperClass {
  doStuff() {
    return "superclass";
  }
}

class MyClass extends SuperClass {
  superDotAccess() {
    var _super = super;

    const arrow = function () {
      return _super.doStuff();
    };
    return arrow() + ", but in MyClass";
  }

  superBracketAccess() {
    var _super2 = super;

    const arrow = function () {
      const fnName = "doStuff";
      return _super2[fnName]();
    };
    return arrow() + ", but in MyClass";
  }
}
