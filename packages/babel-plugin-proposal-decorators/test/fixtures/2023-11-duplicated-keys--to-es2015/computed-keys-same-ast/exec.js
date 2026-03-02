var i = 0;

function getKey() {
  return (i++).toString();
}

let elements = [];

function dec(fn, context) {
  elements.push({ fn, context });
}

class Foo {
  @dec
  [getKey()]() {
    return 1;
  }

  @dec
  [getKey()]() {
    return 2;
  }
}

expect(elements).toHaveLength(2);

expect(elements[0].context.name).toBe("0");
expect(elements[0].fn()).toBe(1);

expect(elements[1].context.name).toBe("1");
expect(elements[1].fn()).toBe(2);

expect(i).toBe(2);
