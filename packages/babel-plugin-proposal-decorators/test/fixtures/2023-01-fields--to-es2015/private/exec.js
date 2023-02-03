function dec(_v, context) {
  return function (v) {
    this[context.name + 'Context'] = context;
    return (v || 1) + 1;
  }
}

class Foo {
  @dec
  #a;

  @dec
  #b = 123;
}

let foo = new Foo();

const aContext = foo['#aContext'];
const bContext = foo['#bContext'];

expect(aContext.access.has(foo)).toBe(true);
expect(aContext.access.has({})).toBe(false);
expect(aContext.access.has(Object.create(foo))).toBe(false);

expect(aContext.access.get(foo)).toBe(2);
expect(() => aContext.access.get({})).toThrow(TypeError);
aContext.access.set(foo, 123);
expect(aContext.access.get(foo)).toBe(123);
expect(() => aContext.access.set({}, 456)).toThrow(TypeError);
expect(aContext.access.get(foo)).toBe(123);
expect(aContext.name).toBe('#a');
expect(aContext.kind).toBe('field');
expect(aContext.static).toBe(false);
expect(aContext.private).toBe(true);
expect(typeof aContext.addInitializer).toBe('undefined');

expect(bContext.access.get(foo)).toBe(124);
bContext.access.set(foo, 123);
expect(bContext.access.get(foo)).toBe(123);
expect(bContext.name).toBe('#b');
expect(bContext.kind).toBe('field');
expect(bContext.static).toBe(false);
expect(bContext.private).toBe(true);
expect(typeof aContext.addInitializer).toBe('undefined');
