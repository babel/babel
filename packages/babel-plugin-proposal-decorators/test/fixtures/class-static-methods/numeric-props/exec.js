function dec(target, name, descriptor){
  expect(target).toBeTruthy();
  expect(name).toBe(4);
  expect(typeof descriptor).toBe("object");
}

class Example {
  @dec
  static 4() {}
}
