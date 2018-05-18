function decorate(el) {
  el.descriptor.value.decorated = true;
  return el;
}

var el;

@(_ => el = _)
class A {
  method() {
    return 1;
  }

  @decorate
  method() {
    return 2;
  }
}

expect(el.elements).toHaveLength(1);

expect(A.prototype.method.decorated).toBe(true);
expect(A.prototype.method()).toBe(2);
