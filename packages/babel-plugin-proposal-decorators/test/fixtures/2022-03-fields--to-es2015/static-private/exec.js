function dec(_v, context) {
  return function (v) {
    this[context.name + 'Context'] = context;
    return (v || 1) + 1;
  }
}

class Foo {
  @dec
  static #a;

  @dec
  static #b = 123;
}

const aContext = Foo['#aContext'];
const bContext = Foo['#bContext'];

expect(aContext.access.get.call(Foo)).toBe(2);
aContext.access.set.call(Foo, 123);
expect(aContext.access.get.call(Foo)).toBe(123);
expect(aContext.name).toBe('#a');
expect(aContext.kind).toBe('field');
expect(aContext.static).toBe(true);
expect(aContext.private).toBe(true);
expect(typeof aContext.addInitializer).toBe('undefined');

expect(bContext.access.get.call(Foo)).toBe(124);
bContext.access.set.call(Foo, 123);
expect(bContext.access.get.call(Foo)).toBe(123);
expect(bContext.name).toBe('#b');
expect(bContext.kind).toBe('field');
expect(bContext.static).toBe(true);
expect(bContext.private).toBe(true);
expect(typeof aContext.addInitializer).toBe('undefined');
