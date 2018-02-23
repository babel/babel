var x = 0;
var sets = 0;
var obj = {
  get x() {
    return x;
  },

  set x(value) {
    sets++;
    x = value;
  },
};

assert.equal(obj.x ||= 1, 1);
assert.equal(sets, 1);
assert.equal(obj.x ||= 2, 1);
assert.equal(sets, 1);

assert.equal(obj.x &&= 0, 0);
assert.equal(sets, 2);
assert.equal(obj.x &&= 3, 0);
assert.equal(sets, 2);

var gets = 0;
var deep = {
  get obj() {
    gets++;
    return obj;
  },
};

assert.equal(deep.obj.x ||= 1, 1);
assert.equal(gets, 1);
assert.equal(deep.obj.x ||= 2, 1);
assert.equal(gets, 2);

assert.equal(deep.obj.x &&= 0, 0);
assert.equal(gets, 3);
assert.equal(deep.obj.x &&= 3, 0);
assert.equal(gets, 4);
