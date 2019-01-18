function decorate(el) {
  el.method = f;
}

function f() {}

var Foo;

expect(() => {
  Foo = @(() => void 0) class Foo {
    @decorate
    bar() {}
  }
}).not.toThrow();

expect(Foo.prototype.bar).toBe(f);
