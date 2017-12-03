
var passed = true;
var B = class extends class {
  constructor(a) { return this.id + a; }
  foo(a)         { return a + this.id; }
} {
  constructor(a) {
    this.id = 'AB';
    // "super" in the constructor calls
    // the superclass's constructor on "this".
    passed &= super(a)     === 'ABCD';
    // "super" can be also used to call
    // superclass methods on "this".
    passed &= super.foo(a) === 'CDAB';
  }
  foo(a) {
    // "super" in methods calls the
    // superclass's same-named method on "this".
    passed &= super(a) === 'YZEF';
    passed &= super(a) === super.foo(a);
  }
}
var b = new B("CD");
// "super" is bound statically, even though "this" isn't
var obj = { foo: b.foo, id:"EF" };
obj.foo("YZ");
console.log(passed == true)
