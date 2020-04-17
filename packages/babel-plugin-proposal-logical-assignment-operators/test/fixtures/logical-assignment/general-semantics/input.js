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

expect(obj.x ||= 1).toBe(1);
expect(sets).toBe(1);
expect(obj.x ||= 2).toBe(1);
expect(sets).toBe(1);

expect(obj.x &&= 0).toBe(0);
expect(sets).toBe(2);
expect(obj.x &&= 3).toBe(0);
expect(sets).toBe(2);

var gets = 0;
var deep = {
  get obj() {
    gets++;
    return obj;
  },
};

expect(deep.obj.x ||= 1).toBe(1);
expect(gets).toBe(1);
expect(deep.obj.x ||= 2).toBe(1);
expect(gets).toBe(2);

expect(deep.obj.x &&= 0).toBe(0);
expect(gets).toBe(3);
expect(deep.obj.x &&= 3).toBe(0);
expect(gets).toBe(4);

var key = 0;
expect(obj[++key] ||= 1).toBe(1);
expect(key).toBe(1);
key = 0;
expect(obj[++key] ||= 2).toBe(1);
expect(key).toBe(1);

key = 0;
expect(obj[++key] &&= 0).toBe(0);
expect(key).toBe(1);
key = 0;
expect(obj[++key] &&= 3).toBe(0);
expect(key).toBe(1);

key = 0;
expect(deep.obj[++key] ||= 1).toBe(1);
expect(gets).toBe(5);
expect(key).toBe(1);
key = 0;
expect(deep.obj[++key] ||= 2).toBe(1);
expect(gets).toBe(6);
expect(key).toBe(1);

key = 0;
expect(deep.obj[++key] &&= 0).toBe(0);
expect(gets).toBe(7);
expect(key).toBe(1);
key = 0;
expect(deep.obj[++key] &&= 3).toBe(0);
expect(gets).toBe(8);
expect(key).toBe(1);
