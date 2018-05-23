class Foo {
  static num;
}

expect("num" in Foo).toBe(true);
expect(Foo.num).toBeUndefined();
