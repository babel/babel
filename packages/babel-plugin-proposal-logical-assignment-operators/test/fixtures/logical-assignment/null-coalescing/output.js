var _obj$x, _obj$x2, _deep$obj, _x, _deep$obj2, _x2, _ref, _obj, _ref2, _obj2, _deep$obj3, _ref3, _ref4, _deep$obj4, _ref5, _ref6;

var x = undefined;
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
assert.equal((_obj$x = obj.x) !== null && _obj$x !== void 0 ? _obj$x : obj.x = 1, 1);
assert.equal(sets, 1);
assert.equal((_obj$x2 = obj.x) !== null && _obj$x2 !== void 0 ? _obj$x2 : obj.x = 2, 1);
assert.equal(sets, 1);
var gets = 0;
var deep = {
  get obj() {
    gets++;
    return obj;
  }

};
obj.x = undefined;
assert.equal((_x = (_deep$obj = deep.obj).x) !== null && _x !== void 0 ? _x : _deep$obj.x = 1, 1);
assert.equal(gets, 1);
assert.equal((_x2 = (_deep$obj2 = deep.obj).x) !== null && _x2 !== void 0 ? _x2 : _deep$obj2.x = 2, 1);
assert.equal(gets, 2);
var key = 0;
obj.x = undefined;
assert.equal((_obj = obj[_ref = ++key]) !== null && _obj !== void 0 ? _obj : obj[_ref] = 1, 1);
assert.equal(key, 1);
key = 0;
assert.equal((_obj2 = obj[_ref2 = ++key]) !== null && _obj2 !== void 0 ? _obj2 : obj[_ref2] = 2, 1);
assert.equal(key, 1);
obj.x = undefined;
key = 0;
assert.equal((_ref4 = (_deep$obj3 = deep.obj)[_ref3 = ++key]) !== null && _ref4 !== void 0 ? _ref4 : _deep$obj3[_ref3] = 1, 1);
assert.equal(gets, 3);
assert.equal(key, 1);
key = 0;
assert.equal((_ref6 = (_deep$obj4 = deep.obj)[_ref5 = ++key]) !== null && _ref6 !== void 0 ? _ref6 : _deep$obj4[_ref5] = 2, 1);
assert.equal(gets, 4);
assert.equal(key, 1);
