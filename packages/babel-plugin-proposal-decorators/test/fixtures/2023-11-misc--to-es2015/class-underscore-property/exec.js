function noopFactory() { return function noop() {} }

{
  class B {
    @noopFactory()
    static _ = "B";
  }

  class C extends B {
    @noopFactory() #p;
  }

  expect(C._).toBe("B");
}

{
  class B {
    @noopFactory()
    static _ = "B";
  }

  @noopFactory()
  class C extends B {
    @noopFactory() #p;
  }

  expect(C._).toBe("B");
}

{
  class C {
    @noopFactory() #p;
  }

  expect(Reflect.ownKeys(C)).not.toContain("_");
}

{
  @noopFactory()
  class C {}

  expect(Reflect.ownKeys(C)).not.toContain("_");
}

{
  @noopFactory()
  class C {
    @noopFactory() #p;
  }

  expect(Reflect.ownKeys(C)).not.toContain("_");
}
