var a;
var b;
var c;
var d;
var x;
var y;
Object.assign({
  x
}, y, {
  a
}, b, {
  c
});
Object.assign({}, Object.prototype);
Object.assign({}, {
  foo: 'bar'
});
Object.assign({}, {
  foo: 'bar'
}, {
  bar: 'baz'
});
Object.assign({}, {
  get foo() {
    return 'foo';
  }
});
