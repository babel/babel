class Base {
  x = 2;
}

class A extends Base {
  x;
}

expect(new A().x).toBe(2);
