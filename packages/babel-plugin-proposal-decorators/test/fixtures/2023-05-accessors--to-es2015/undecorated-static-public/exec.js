class Foo {
  static accessor a;

  static accessor b = 123;

  static accessor ['c'] = 456;
}

expect(Foo.a).toBe(undefined);
Foo.a = 123;
expect(Foo.a).toBe(123);
expect(Foo.hasOwnProperty('a')).toBe(true);

expect(Foo.b).toBe(123);
Foo.b = 456
expect(Foo.b).toBe(456);
expect(Foo.hasOwnProperty('b')).toBe(true);

expect(Foo.c).toBe(456);
Foo.c = 789
expect(Foo.c).toBe(789);
expect(Foo.hasOwnProperty('c')).toBe(true);
