class SuperBase {
  m() { return 40; }
  get x () { return this.baseX; }
  set x (value) { this.baseX = value; }
  constructor() {
    this.baseC = 2;
    this.baseX = 4;
  }
}

class SuperDerived extends SuperBase {
  m() { return 41; }
  superM() { return super.m(); }
  superX() { return super.x; }
  constructor() {
    super();
    this.x = 10;
    this.derC = 3;
  }
}

// ----------------------------------------------------------------------------

var obj = new SuperDerived();
expect(obj.m()).toBe(41);
expect(obj.superM()).toBe(40);
expect(obj.baseX).toBe(10);
expect(obj.x).toBe(10);
expect(obj.superX()).toBe(10);
expect(obj.baseC).toBe(2);
expect(obj.derC).toBe(3);
