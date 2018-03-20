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

var key = 0;
assert.equal(obj[++key] ||= 1, 1);
assert.equal(key, 1);
key = 0;
assert.equal(obj[++key] ||= 2, 1);
assert.equal(key, 1);

key = 0;
assert.equal(obj[++key] &&= 0, 0);
assert.equal(key, 1);
key = 0;
assert.equal(obj[++key] &&= 3, 0);
assert.equal(key, 1);

key = 0;
assert.equal(deep.obj[++key] ||= 1, 1);
assert.equal(gets, 5);
assert.equal(key, 1);
key = 0;
assert.equal(deep.obj[++key] ||= 2, 1);
assert.equal(gets, 6);
assert.equal(key, 1);

key = 0;
assert.equal(deep.obj[++key] &&= 0, 0);
assert.equal(gets, 7);
assert.equal(key, 1);
key = 0;
assert.equal(deep.obj[++key] &&= 3, 0);
assert.equal(gets, 8);
assert.equal(key, 1);
