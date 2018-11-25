// Imported from
// https://github.com/WebReflection/babel-plugin-transform-builtin-classes/blob/85efe1374e1c59a8323c7eddd4326f6c93d9f64f/test/test.js

class List extends Array {
  constructor(value) {
    super().push(value);
  }
  push(value) {
    super.push(value);
    return this;
  }
}

expect(new List(1)).toBeInstanceOf(List);
expect(new List(2)).toBeInstanceOf(Array);

var l = new List(3);
expect(l).toHaveLength(1);
expect(l[0]).toBe(3);
expect(l.push(4)).toBe(l);
expect(l).toHaveLength(2);
expect(l.join()).toBe('3,4');

class SecondLevel extends List {
  method() {
    return this;
  }
}

expect(new SecondLevel(1)).toBeInstanceOf(SecondLevel);
expect(new SecondLevel(2)).toBeInstanceOf(List);
expect(new SecondLevel(3)).toBeInstanceOf(Array);

var s = new SecondLevel(4);
expect(s).toHaveLength(1);
expect(s[0]).toBe(4);
expect(s.push(5)).toBe(s);
expect(s).toHaveLength(2);
expect(s.join()).toBe('4,5');
expect(s.method()).toBe(s);
