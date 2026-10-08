const o = {
  v: 1,
  f(...args) {
    return [this.v, ...args];
  },
};
const fns = [];
for (var i = 0; i < 2; i++) {
  fns.push(o.f~(?, i, ...));
}
expect(fns[0]("a", "b")).toEqual([1, "a", 0, "b"]);
expect(fns[1]("a")).toEqual([1, "a", 1]);
expect(fns[0].length).toBe(1);

const pair = new Array~(?, ...);
expect(pair(1, 2)).toEqual([1, 2]);
