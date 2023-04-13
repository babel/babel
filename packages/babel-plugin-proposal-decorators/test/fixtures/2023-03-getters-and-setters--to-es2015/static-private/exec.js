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
  static value = 1;

  @dec
  static get #a() {
    return this.value;
  }

  @dec
  static set #a(v) {
    this.value = v;
  }

  static getA() {
    return this.#a;
  }

  static setA(v) {
    this.#a = v;
  }
}

const a_getterContext = Foo['#a_getterContext'];
const a_setterContext = Foo['#a_setterContext'];

expect(a_getterContext.access.has(Foo)).toBe(true);
expect(a_getterContext.access.has({})).toBe(false);
expect(a_getterContext.access.has(Object.create(Foo))).toBe(false);
expect(a_setterContext.access.has(Foo)).toBe(true);
expect(a_setterContext.access.has({})).toBe(false);
expect(a_setterContext.access.has(Object.create(Foo))).toBe(false);
expect(a_getterContext.access.has).not.toBe(a_setterContext.access.has);

expect(a_getterContext.access.get(Foo)).toBe(2);
expect(() => a_getterContext.access.get({})).toThrow(TypeError);
expect(Foo.getA()).toBe(2);
a_setterContext.access.set(Foo, 123);
expect(a_getterContext.access.get(Foo)).toBe(125);
expect(() => a_setterContext.access.set({}, 456)).toThrow(TypeError);
expect(a_getterContext.access.get(Foo)).toBe(125);
expect(Foo.getA()).toBe(125);
Foo.setA(456);
expect(a_getterContext.access.get(Foo)).toBe(458);
expect(Foo.getA()).toBe(458);

expect(a_getterContext.name).toBe('#a');
expect(a_getterContext.kind).toBe('getter');
expect(a_getterContext.static).toBe(true);
expect(a_getterContext.private).toBe(true);
expect(typeof a_getterContext.addInitializer).toBe('function');

expect(a_setterContext.name).toBe('#a');
expect(a_setterContext.kind).toBe('setter');
expect(a_setterContext.static).toBe(true);
expect(a_setterContext.private).toBe(true);
expect(typeof a_setterContext.addInitializer).toBe('function');
