function dec({ get, set }, context) {
  context.addInitializer(function() {
    this[context.name + 'Context'] = context;
  });

  expect(get.name).toEqual("get " + context.name);
  expect(set.name).toEqual("set " + context.name);
  return {
    get() {
      return get.call(this) + 1;
    },

    set(v) {
      set.call(this, v + 1);
    },

    init(v) {
      return v ? v : 1;
    }
  }
}

class Foo {
  @dec
  accessor #a;

  @dec
  accessor #b = 123;
}

let foo = new Foo();

const aContext = foo['#aContext'];
const bContext = foo['#bContext'];

expect(aContext.access.get.call(foo)).toBe(2);
aContext.access.set.call(foo, 123);
expect(aContext.access.get.call(foo)).toBe(125);
expect(aContext.name).toBe('#a');
expect(aContext.kind).toBe('accessor');
expect(aContext.static).toBe(false);
expect(aContext.private).toBe(true);
expect(typeof aContext.addInitializer).toBe('function');

expect(bContext.access.get.call(foo)).toBe(124);
bContext.access.set.call(foo, 123);
expect(bContext.access.get.call(foo)).toBe(125);
expect(bContext.name).toBe('#b');
expect(bContext.kind).toBe('accessor');
expect(bContext.static).toBe(false);
expect(bContext.private).toBe(true);
expect(typeof bContext.addInitializer).toBe('function');
