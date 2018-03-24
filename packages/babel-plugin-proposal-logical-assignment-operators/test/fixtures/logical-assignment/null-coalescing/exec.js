var x = undefined;
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

assert.equal(obj.x ??= 1, 1);
assert.equal(sets, 1);
assert.equal(obj.x ??= 2, 1);
assert.equal(sets, 1);

var gets = 0;
var deep = {
  get obj() {
    gets++;
    return obj;
  },
};

obj.x = undefined;
assert.equal(deep.obj.x ??= 1, 1);
assert.equal(gets, 1);
assert.equal(deep.obj.x ??= 2, 1);
assert.equal(gets, 2);

var key = 0;
obj.x = undefined;
assert.equal(obj[++key] ??= 1, 1);
assert.equal(key, 1);
key = 0;
assert.equal(obj[++key] ??= 2, 1);
assert.equal(key, 1);

obj.x = undefined;
key = 0;
assert.equal(deep.obj[++key] ??= 1, 1);
assert.equal(gets, 3);
assert.equal(key, 1);
key = 0;
assert.equal(deep.obj[++key] ??= 2, 1);
assert.equal(gets, 4);
assert.equal(key, 1);
