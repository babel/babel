// Inlined helpers rename the top-level bindings conflicting with the globals
// they use
const self = { v: 1 };
struct Reflect {
  x = self.v;
  m() {
    return this.x;
  }
}
expect(new Reflect().m()).toBe(1);
