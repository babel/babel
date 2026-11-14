var a = [1, 2];
expect([...a, a.push(3)]).toEqual([1, 2, 3]);

var b = [1, 2];
expect([...b, b.pop()]).toEqual([1, 2, 2]);

var c = [1, 2];
const collect = (...args) => args;
expect(collect(...c, c.push(3))).toEqual([1, 2, 3]);

var d = [1, 2];
function Box(...args) {
  this.args = args;
}
expect(new Box(...d, d.push(3)).args).toEqual([1, 2, 3]);

var e = [1, 2];
const iter = {
  *[Symbol.iterator]() {
    e.push(99);
    yield 3;
  },
};
expect([...e, ...iter]).toEqual([1, 2, 3]);

var f = [1, 2];
var g = [10, 20];
expect([...f, f.push(3), ...g]).toEqual([1, 2, 3, 10, 20]);

var h = [1, 2];
expect([h.push(0), ...h]).toEqual([3, 1, 2, 0]);
