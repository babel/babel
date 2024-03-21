function noopFactory() { return function noop(x) { return x } }

{
  class C {
    [("a1", "a2") as any]() {};
    @noopFactory(0) #p;
  }
  expect(new C()).toHaveProperty("a2");
}

{
  class C {
    [("a1", ("b1", "b2")) as any]() {};
    @noopFactory(1) #p;
  }
  expect(new C()).toHaveProperty("b2");
}
