function dec(value, context) {
  context.addInitializer(function() {
    this[context.name + '_' + context.kind + 'Context'] = context;
  });

  if (context.kind === 'getter') {
    return function () {
      return value.call(this) + 1;
    }
  } else {
    return function (v) {
      return value.call(this, v + 1);
    }
  }
}

class Foo {
  value = 1;

  @dec
  get #a() {
    return this.value;
  }

  @dec
  set #a(v) {
    this.value = v;
  }

  getA() {
    return this.#a;
  }

  setA(v) {
    this.#a = v;
  }
}

let foo = new Foo();

const a_getterContext = foo['#a_getterContext'];
const a_setterContext = foo['#a_setterContext'];

expect(a_getterContext.access.has(foo)).toBe(true);
expect(a_getterContext.access.has({})).toBe(false);
expect(a_getterContext.access.has(Object.create(foo))).toBe(false);
expect(a_setterContext.access.has(foo)).toBe(true);
expect(a_setterContext.access.has({})).toBe(false);
expect(a_setterContext.access.has(Object.create(foo))).toBe(false);
expect(a_getterContext.access.has).not.toBe(a_setterContext.access.has);

expect(a_getterContext.access.get(foo)).toBe(2);
expect(() => a_getterContext.access.get({})).toThrow(TypeError);
expect(foo.getA()).toBe(2);
a_setterContext.access.set(foo, 123);
expect(a_getterContext.access.get(foo)).toBe(125);
expect(() => a_setterContext.access.set({}, 456)).toThrow(TypeError);
expect(a_getterContext.access.get(foo)).toBe(125);
expect(foo.getA()).toBe(125);
foo.setA(456);
expect(a_getterContext.access.get(foo)).toBe(458);
expect(foo.getA()).toBe(458);

expect(a_getterContext.name).toBe('#a');
expect(a_getterContext.kind).toBe('getter');
expect(a_getterContext.static).toBe(false);
expect(a_getterContext.private).toBe(true);
expect(typeof a_getterContext.addInitializer).toBe('function');

expect(a_setterContext.name).toBe('#a');
expect(a_setterContext.kind).toBe('setter');
expect(a_setterContext.static).toBe(false);
expect(a_setterContext.private).toBe(true);
expect(typeof a_setterContext.addInitializer).toBe('function');
