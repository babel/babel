class SuperClass {
  doStuff() {
    return "superclass";
  }
}

class MyClass extends SuperClass {
  superDotAccess() {
    const arrow = () => {
      return super.doStuff();
    };
    return arrow() + ", but in MyClass";
  }

  superBracketAccess() {
    const arrow = () => {
      const fnName = "doStuff";
      return super[fnName]();
    };
    return arrow() + ", but in MyClass";
  }
}
