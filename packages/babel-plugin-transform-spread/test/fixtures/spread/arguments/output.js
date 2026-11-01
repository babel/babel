function foo() {
  return Function.prototype.apply.call(bar, void 0, arguments);
}
function bar(one, two, three) {
  return [one, two, three];
}
foo("foo", "bar");
