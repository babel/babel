var obj = {};
obj.x ?= 2;
assert.equal(obj.x, 2);

obj = {};
assert.equal(obj.x ?= 2, 2);

obj = { x: 1 };
obj.x ?= 2;
assert.equal(obj.x, 1);

obj = { x: 1 };
assert.equal(obj.x ?= 2, 1);

obj = { x: undefined }
obj.x ?= 2;
assert.equal(obj.x, undefined);

obj = { x: undefined }
assert.equal(obj.x ?= 2, undefined);

var calls = 0;
var q = { q: 3 };
var o = {
  get p() {
    calls++;
    return q;
  }
};

o.p.q ?= 2;
assert.equal(1, calls);
o.p.f ?= 2;
assert.equal(2, calls);
assert.equal(3, o.p.q);
assert.equal(2, o.p.f);
