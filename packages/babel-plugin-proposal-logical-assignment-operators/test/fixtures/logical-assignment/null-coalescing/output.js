var _obj$x, _obj$x2, _deep$obj, _deep$obj$x, _deep$obj2, _deep$obj2$x, _key, _obj$_key, _key2, _obj$_key2, _deep$obj3, _key3, _deep$obj3$_key, _deep$obj4, _key4, _deep$obj4$_key;
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
expect((_obj$x = obj.x) !== null && _obj$x !== void 0 ? _obj$x : obj.x = 1).toBe(1);
expect(sets, 1);
expect((_obj$x2 = obj.x) !== null && _obj$x2 !== void 0 ? _obj$x2 : obj.x = 2).toBe(1);
expect(sets, 1);
var gets = 0;
var deep = {
  get obj() {
    gets++;
    return obj;
  }
};
obj.x = undefined;
expect((_deep$obj$x = (_deep$obj = deep.obj).x) !== null && _deep$obj$x !== void 0 ? _deep$obj$x : _deep$obj.x = 1).toBe(1);
expect(gets, 1);
expect((_deep$obj2$x = (_deep$obj2 = deep.obj).x) !== null && _deep$obj2$x !== void 0 ? _deep$obj2$x : _deep$obj2.x = 2).toBe(1);
expect(gets, 2);
var key = 0;
obj.x = undefined;
expect((_obj$_key = obj[_key = ++key]) !== null && _obj$_key !== void 0 ? _obj$_key : obj[_key] = 1).toBe(1);
expect(key, 1);
key = 0;
expect((_obj$_key2 = obj[_key2 = ++key]) !== null && _obj$_key2 !== void 0 ? _obj$_key2 : obj[_key2] = 2).toBe(1);
expect(key, 1);
obj.x = undefined;
key = 0;
expect((_deep$obj3$_key = (_deep$obj3 = deep.obj)[_key3 = ++key]) !== null && _deep$obj3$_key !== void 0 ? _deep$obj3$_key : _deep$obj3[_key3] = 1).toBe(1);
expect(gets, 3);
expect(key, 1);
key = 0;
expect((_deep$obj4$_key = (_deep$obj4 = deep.obj)[_key4 = ++key]) !== null && _deep$obj4$_key !== void 0 ? _deep$obj4$_key : _deep$obj4[_key4] = 2).toBe(1);
expect(gets, 4);
expect(key, 1);
