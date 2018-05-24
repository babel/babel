function addStaticProperty(name, value) {
  return function (cls) {
    cls[name] = value;
  };
}

@addStaticProperty("foo", 42)
class C {}

expect(C.foo).toBe(42);
