function dec1(Foo, { addInitializer }) {
  expect(Foo.field).toBe(undefined);
  addInitializer(() => {
    Foo.initField = 123;
  });
}

@dec1
class Foo {
  static {
    expect(this.initField).toBe(undefined);
  }

  static field = 123;
}

expect(Foo.initField).toBe(123);
expect(Foo.field).toBe(123);

function dec2(Bar, { addInitializer }) {
  expect(Bar.field).toBe(123);
  expect(Bar.otherField).toBe(undefined);
  expect(Bar.initField).toBe(123);
  addInitializer(() => {
    Bar.initField = 456;
  });
}

@dec2
class Bar extends Foo {
  static {
    expect(this.initField).toBe(123);
    this.otherField = 456;
  }

  static field = 456;
}

expect(Bar.initField).toBe(456);
expect(Bar.field).toBe(456);
expect(Bar.otherField).toBe(456);
