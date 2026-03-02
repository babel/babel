var _deep$obj, _deep$obj2, _deep$obj3, _deep$obj4, _key, _key2, _key3, _key4, _deep$obj5, _key5, _deep$obj6, _key6, _deep$obj7, _key7, _deep$obj8, _key8;
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
expect(obj.x || (obj.x = 1)).toBe(1);
expect(sets).toBe(1);
expect(obj.x || (obj.x = 2)).toBe(1);
expect(sets).toBe(1);
expect(obj.x && (obj.x = 0)).toBe(0);
expect(sets).toBe(2);
expect(obj.x && (obj.x = 3)).toBe(0);
expect(sets).toBe(2);
var gets = 0;
var deep = {
  get obj() {
    gets++;
    return obj;
  }
};
expect((_deep$obj = deep.obj).x || (_deep$obj.x = 1)).toBe(1);
expect(gets).toBe(1);
expect((_deep$obj2 = deep.obj).x || (_deep$obj2.x = 2)).toBe(1);
expect(gets).toBe(2);
expect((_deep$obj3 = deep.obj).x && (_deep$obj3.x = 0)).toBe(0);
expect(gets).toBe(3);
expect((_deep$obj4 = deep.obj).x && (_deep$obj4.x = 3)).toBe(0);
expect(gets).toBe(4);
var key = 0;
expect(obj[_key = ++key] || (obj[_key] = 1)).toBe(1);
expect(key).toBe(1);
key = 0;
expect(obj[_key2 = ++key] || (obj[_key2] = 2)).toBe(1);
expect(key).toBe(1);
key = 0;
expect(obj[_key3 = ++key] && (obj[_key3] = 0)).toBe(0);
expect(key).toBe(1);
key = 0;
expect(obj[_key4 = ++key] && (obj[_key4] = 3)).toBe(0);
expect(key).toBe(1);
key = 0;
expect((_deep$obj5 = deep.obj)[_key5 = ++key] || (_deep$obj5[_key5] = 1)).toBe(1);
expect(gets).toBe(5);
expect(key).toBe(1);
key = 0;
expect((_deep$obj6 = deep.obj)[_key6 = ++key] || (_deep$obj6[_key6] = 2)).toBe(1);
expect(gets).toBe(6);
expect(key).toBe(1);
key = 0;
expect((_deep$obj7 = deep.obj)[_key7 = ++key] && (_deep$obj7[_key7] = 0)).toBe(0);
expect(gets).toBe(7);
expect(key).toBe(1);
key = 0;
expect((_deep$obj8 = deep.obj)[_key8 = ++key] && (_deep$obj8[_key8] = 3)).toBe(0);
expect(gets).toBe(8);
expect(key).toBe(1);
