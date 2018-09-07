var el;

@(_ => el = _)
class A {
  method() {
    return 1;
  }

  static method() {
    return 2;
  }
}

expect(el.elements).toHaveLength(2);

expect(A.prototype.method()).toBe(1);
expect(A.method()).toBe(2);
