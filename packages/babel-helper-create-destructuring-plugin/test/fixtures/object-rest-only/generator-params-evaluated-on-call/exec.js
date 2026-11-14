// Parameters are initialized when a generator is called, before its body
// first runs.
const log = [];
function* g({ a, ...rest }, b) {
  log.push("body");
  yield [a, rest, b, this, arguments.length];
}
const self = {};
const it = g.call(self, { get a() { log.push("get a"); return 1; }, c: 2 }, 3, 4);
log.push("called");
expect(it.next().value).toEqual([1, { c: 2 }, 3, self, 3]);
expect(log).toEqual(["get a", "called", "body"]);
expect(g.length).toBe(2);
expect(() => g(null)).toThrow(TypeError);

const o = {
  async *m({ ...rest }) {
    yield rest;
  },
};
expect(() => o.m(undefined)).toThrow(TypeError);
expect(typeof o.m({ d: 4 }).next).toBe("function");
