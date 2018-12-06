class Base {
  static x = 2;
}

class A extends Base {
  static x = undefined;
}

expect(A.x).toBe(undefined);
