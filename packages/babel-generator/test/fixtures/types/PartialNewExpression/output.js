new foo~(?);
new foo~(?, x);
new foo~(x, ?);
new foo~(?, x, ?);
new obj.foo~(x, ?);
new obj.foo~(?, x);
new obj.foo~(?, x, ?);
class foo extends class bar {
  static bar() {}
} {
  constructor() {
    baz(this, () => new super.bar~(?));
  }
}
new obj.foo~(?, x, ...);