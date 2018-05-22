function dec(target, name, descriptor) {
  expect(target).toBeTruthy();
  expect(name).toBe("str");
  expect(typeof descriptor).toBe("object");
}

class Example {
   @dec
   static "str"() {};
}
