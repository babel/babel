// The parameters of generators are initialized when they are called
const log = [];
function* f(a, ...[b, { [(log.push("key"), "c")]: c }]) {
  log.push("body");
  yield [a, b, c];
}
const it = f(1, 2, { c: 3 });
log.push("called");
expect(it.next().value).toEqual([1, 2, 3]);
expect(log).toEqual(["key", "called", "body"]);

function* g(...[{ x }]) {}
expect(() => g()).toThrow(TypeError);

async function* h(...[{ x }]) {}
expect(() => h()).toThrow(TypeError);
