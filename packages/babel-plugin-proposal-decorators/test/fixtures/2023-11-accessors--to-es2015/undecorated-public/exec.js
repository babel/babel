class Foo {
  accessor a;

  accessor b = 123;

  accessor ['c'] = 456;
}

let foo = new Foo();

expect(foo.a).toBe(undefined);
foo.a = 123;
expect(foo.a).toBe(123);
expect(foo.hasOwnProperty('a')).toBe(false);
expect(Foo.prototype.hasOwnProperty('a')).toBe(true);

expect(foo.b).toBe(123);
foo.b = 456
expect(foo.b).toBe(456);
expect(foo.hasOwnProperty('b')).toBe(false);
expect(Foo.prototype.hasOwnProperty('b')).toBe(true);

expect(foo.c).toBe(456);
foo.c = 789
expect(foo.c).toBe(789);
expect(foo.hasOwnProperty('c')).toBe(false);
expect(Foo.prototype.hasOwnProperty('c')).toBe(true);
