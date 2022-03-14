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

expect(a_getterContext.access.get.call(Foo)).toBe(2);
expect(Foo.getA()).toBe(2);
a_setterContext.access.set.call(Foo, 123);
expect(a_getterContext.access.get.call(Foo)).toBe(125);
expect(Foo.getA()).toBe(125);
Foo.setA(456);
expect(a_getterContext.access.get.call(Foo)).toBe(458);
expect(Foo.getA()).toBe(458);

expect(a_getterContext.name).toBe('#a');
expect(a_getterContext.kind).toBe('getter');
expect(a_getterContext.isStatic).toBe(true);
expect(a_getterContext.isPrivate).toBe(true);
expect(typeof a_getterContext.addInitializer).toBe('function');
expect(typeof a_getterContext.setMetadata).toBe('function');
expect(typeof a_getterContext.getMetadata).toBe('function');

expect(a_setterContext.name).toBe('#a');
expect(a_setterContext.kind).toBe('setter');
expect(a_setterContext.isStatic).toBe(true);
expect(a_setterContext.isPrivate).toBe(true);
expect(typeof a_setterContext.addInitializer).toBe('function');
expect(typeof a_setterContext.setMetadata).toBe('function');
expect(typeof a_setterContext.getMetadata).toBe('function');
