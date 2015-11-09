class GetterA {
  get x() { return 'getter x'; }
  get y() { return 'getter y'; }
}

class GetterB extends GetterA {
  get x() { return super.x; }
}

class GetterC extends GetterB {
  get y() { return super.y; }
}

// ----------------------------------------------------------------------------

var b = new GetterB();
var c = new GetterC();

assert.equal('getter x', b.x);
assert.equal('getter y', c.y);
