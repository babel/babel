class Base {
  x = 2;
}

class A extends Base {
  x = undefined;
}

expect(new A().x).toBe(undefined);
