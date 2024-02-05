let elements = [];

function dec(val, context) {
  elements.push(val);
}

class Foo {
  @dec
  a() {
    return 1;
  }

  @dec
  a() {
    return 2;
  }
}

expect(elements[0]()).toEqual(2)
expect(elements[1]()).toEqual(2)
