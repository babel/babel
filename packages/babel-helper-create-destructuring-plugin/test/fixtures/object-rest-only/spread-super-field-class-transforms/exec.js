let i = 0;
class Base {
  get x() { return 3; }
}
class C extends Base {
  #brand;
  offset = ++i;
  obj = {
    ...{},
    __proto__: { x: this.offset + super.x },
    m() { return super.x; }
  };
}
const a = new C(), b = new C();
expect([a.obj.m(), b.obj.m()]).toEqual([4, 5]);
Object.setPrototypeOf(a.obj, { x: 7 });
expect([a.obj.m(), b.obj.m()]).toEqual([7, 5]);
