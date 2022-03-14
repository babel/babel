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
  static get a() {
    return this.value;
  }

  @dec
  static set a(v) {
    this.value = v;
  }

  @dec
  static get ['b']() {
    return this.value;
  }

  @dec
  static set ['b'](v) {
    this.value = v;
  }
}

const a_getterContext = Foo['a_getterContext'];
const a_setterContext = Foo['a_setterContext'];

const b_getterContext = Foo['b_getterContext'];
const b_setterContext = Foo['b_setterContext'];

expect(Foo.a).toBe(2);
expect(Foo.b).toBe(2);
Foo.a = 123;
expect(Foo.a).toBe(125);
expect(Foo.b).toBe(125);
Foo.b = 456;
expect(Foo.a).toBe(458);
expect(Foo.b).toBe(458);

expect(a_getterContext.name).toBe('a');
expect(a_getterContext.kind).toBe('getter');
expect(a_getterContext.isStatic).toBe(true);
expect(a_getterContext.isPrivate).toBe(false);
expect(typeof a_getterContext.addInitializer).toBe('function');
expect(typeof a_getterContext.setMetadata).toBe('function');
expect(typeof a_getterContext.getMetadata).toBe('function');

expect(a_setterContext.name).toBe('a');
expect(a_setterContext.kind).toBe('setter');
expect(a_setterContext.isStatic).toBe(true);
expect(a_setterContext.isPrivate).toBe(false);
expect(typeof a_setterContext.addInitializer).toBe('function');
expect(typeof a_setterContext.setMetadata).toBe('function');
expect(typeof a_setterContext.getMetadata).toBe('function');

expect(b_getterContext.name).toBe('b');
expect(b_getterContext.kind).toBe('getter');
expect(b_getterContext.isStatic).toBe(true);
expect(b_getterContext.isPrivate).toBe(false);
expect(typeof b_getterContext.addInitializer).toBe('function');
expect(typeof b_getterContext.setMetadata).toBe('function');
expect(typeof b_getterContext.getMetadata).toBe('function');

expect(b_setterContext.name).toBe('b');
expect(b_setterContext.kind).toBe('setter');
expect(b_setterContext.isStatic).toBe(true);
expect(b_setterContext.isPrivate).toBe(false);
expect(typeof b_setterContext.addInitializer).toBe('function');
expect(typeof b_setterContext.setMetadata).toBe('function');
expect(typeof b_setterContext.getMetadata).toBe('function');

