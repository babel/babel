function dec1(fn, context) {
  context.addInitializer((instance) => {
    expect(instance.value).toBe(undefined);
  });

  return fn;
}

class Foo {
  value = 1;

  @dec1
  foo() {}
}

function dec2(fn, context) {
  context.addInitializer((instance) => {
    expect(instance.value).toBe(1);
  });

  return fn;
}


class Bar extends Foo {
  constructor() {
    super();

    this.value = 2;
  }

  @dec2
  bar() {}
}
