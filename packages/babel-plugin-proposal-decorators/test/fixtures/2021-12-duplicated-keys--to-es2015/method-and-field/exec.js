let elements = [];

function dec(val, context) {
  elements.push({ val, context });
}

class Foo {
  @dec
  a = 123;

  @dec
  a() {
    return 1;
  }
}

expect(elements).toHaveLength(2);

expect(elements[0].context.name).toBe("a");
expect(elements[0].val()).toBe(1);

expect(elements[1].context.name).toBe("a");
expect(elements[1].val).toBe(undefined);
