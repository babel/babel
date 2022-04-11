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

expect(a_getterContext.access.get.call(foo)).toBe(2);
expect(foo.getA()).toBe(2);
a_setterContext.access.set.call(foo, 123);
expect(a_getterContext.access.get.call(foo)).toBe(125);
expect(foo.getA()).toBe(125);
foo.setA(456);
expect(a_getterContext.access.get.call(foo)).toBe(458);
expect(foo.getA()).toBe(458);

expect(a_getterContext.name).toBe('#a');
expect(a_getterContext.kind).toBe('getter');
expect(a_getterContext.isStatic).toBe(false);
expect(a_getterContext.isPrivate).toBe(true);
expect(typeof a_getterContext.addInitializer).toBe('function');
expect(typeof a_getterContext.setMetadata).toBe('function');
expect(typeof a_getterContext.getMetadata).toBe('function');

expect(a_setterContext.name).toBe('#a');
expect(a_setterContext.kind).toBe('setter');
expect(a_setterContext.isStatic).toBe(false);
expect(a_setterContext.isPrivate).toBe(true);
expect(typeof a_setterContext.addInitializer).toBe('function');
expect(typeof a_setterContext.setMetadata).toBe('function');
expect(typeof a_setterContext.getMetadata).toBe('function');
