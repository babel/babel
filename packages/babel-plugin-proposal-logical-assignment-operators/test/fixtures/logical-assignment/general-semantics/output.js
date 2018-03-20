var _deep$obj, _deep$obj2, _deep$obj3, _deep$obj4, _ref, _ref2, _ref3, _ref4, _deep$obj5, _ref5, _deep$obj6, _ref6, _deep$obj7, _ref7, _deep$obj8, _ref8;

var x = 0;
var sets = 0;
var obj = {
  get x() {
    return x;
  },

  set x(value) {
    sets++;
    x = value;
  }

};
assert.equal(obj.x || (obj.x = 1), 1);
assert.equal(sets, 1);
assert.equal(obj.x || (obj.x = 2), 1);
assert.equal(sets, 1);
assert.equal(obj.x && (obj.x = 0), 0);
assert.equal(sets, 2);
assert.equal(obj.x && (obj.x = 3), 0);
assert.equal(sets, 2);
var gets = 0;
var deep = {
  get obj() {
    gets++;
    return obj;
  }

};
assert.equal((_deep$obj = deep.obj).x || (_deep$obj.x = 1), 1);
assert.equal(gets, 1);
assert.equal((_deep$obj2 = deep.obj).x || (_deep$obj2.x = 2), 1);
assert.equal(gets, 2);
assert.equal((_deep$obj3 = deep.obj).x && (_deep$obj3.x = 0), 0);
assert.equal(gets, 3);
assert.equal((_deep$obj4 = deep.obj).x && (_deep$obj4.x = 3), 0);
assert.equal(gets, 4);
var key = 0;
assert.equal(obj[_ref = ++key] || (obj[_ref] = 1), 1);
assert.equal(key, 1);
key = 0;
assert.equal(obj[_ref2 = ++key] || (obj[_ref2] = 2), 1);
assert.equal(key, 1);
key = 0;
assert.equal(obj[_ref3 = ++key] && (obj[_ref3] = 0), 0);
assert.equal(key, 1);
key = 0;
assert.equal(obj[_ref4 = ++key] && (obj[_ref4] = 3), 0);
assert.equal(key, 1);
key = 0;
assert.equal((_deep$obj5 = deep.obj)[_ref5 = ++key] || (_deep$obj5[_ref5] = 1), 1);
assert.equal(gets, 5);
assert.equal(key, 1);
key = 0;
assert.equal((_deep$obj6 = deep.obj)[_ref6 = ++key] || (_deep$obj6[_ref6] = 2), 1);
assert.equal(gets, 6);
assert.equal(key, 1);
key = 0;
assert.equal((_deep$obj7 = deep.obj)[_ref7 = ++key] && (_deep$obj7[_ref7] = 0), 0);
assert.equal(gets, 7);
assert.equal(key, 1);
key = 0;
assert.equal((_deep$obj8 = deep.obj)[_ref8 = ++key] && (_deep$obj8[_ref8] = 3), 0);
assert.equal(gets, 8);
assert.equal(key, 1);
