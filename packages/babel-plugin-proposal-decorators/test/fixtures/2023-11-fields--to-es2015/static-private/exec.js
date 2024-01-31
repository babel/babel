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

expect(aContext.access.has(Foo)).toBe(true);
expect(aContext.access.has({})).toBe(false);
expect(aContext.access.has(Object.create(Foo))).toBe(false);

expect(aContext.access.get(Foo)).toBe(2);
expect(() => aContext.access.get({})).toThrow(TypeError);
aContext.access.set(Foo, 123);
expect(aContext.access.get(Foo)).toBe(123);
expect(() => aContext.access.set({}, 456)).toThrow(TypeError);
expect(aContext.access.get(Foo)).toBe(123);
expect(aContext.name).toBe('#a');
expect(aContext.kind).toBe('field');
expect(aContext.static).toBe(true);
expect(aContext.private).toBe(true);
expect(typeof aContext.addInitializer).toBe('function');

expect(bContext.access.get(Foo)).toBe(124);
bContext.access.set(Foo, 123);
expect(bContext.access.get(Foo)).toBe(123);
expect(bContext.name).toBe('#b');
expect(bContext.kind).toBe('field');
expect(bContext.static).toBe(true);
expect(bContext.private).toBe(true);
expect(typeof aContext.addInitializer).toBe('function');
