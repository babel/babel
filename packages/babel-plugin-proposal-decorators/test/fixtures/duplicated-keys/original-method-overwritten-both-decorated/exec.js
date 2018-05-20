function decorate(el) {
  el.descriptor.value.decorated = true;
  return el;
}

expect(() => {
  class A {
    @decorate
    method() {
      return 1;
    }

    @decorate
    method() {
      return 2;
    }
  }
}).toThrow(ReferenceError);

