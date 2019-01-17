var el;

@(_ => el = _)
class A {
  method() {
    return 1;
  }

  method() {
    return 2;
  }
}

expect(el.elements).toHaveLength(1);

expect(A.prototype.method()).toBe(2);
