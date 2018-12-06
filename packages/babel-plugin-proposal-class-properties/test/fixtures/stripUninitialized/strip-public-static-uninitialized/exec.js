class Base {
  static x = 2;
}

class A extends Base {
  static x;
}

expect(A.x).toBe(2);
