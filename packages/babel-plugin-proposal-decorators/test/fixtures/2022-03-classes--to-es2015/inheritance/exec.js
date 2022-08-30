let count = 0;

function dec1(Klass) {
  expect(++count).toBe(1);
  expect(Klass.name).toBe('Bar');
}

@dec1
class Bar {}

function dec2(Klass) {
  expect(++count).toBe(2);
  expect(Klass.name).toBe('Foo');
  expect(Object.getPrototypeOf(Klass)).toBe(Bar);
}

@dec2
class Foo extends Bar {}
