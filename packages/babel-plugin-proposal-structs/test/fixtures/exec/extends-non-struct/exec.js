const log = [];

class C {}
for (const parent of [C, function () {}, undefined, 1, {}]) {
  expect(() => {
    struct S extends parent {
      [log.push("key")]() {}
    }
  }).toThrow(TypeError);
}
expect(log).toEqual([]);

// Proxies are rejected without running their traps
const traps = [];
const handler = new Proxy(
  {},
  {
    get(_, name) {
      traps.push(name);
      return undefined;
    },
  },
);
for (const target of [function () {}, C]) {
  expect(() => {
    struct S extends new Proxy(target, handler) {}
  }).toThrow(TypeError);
}
expect(traps).toEqual([]);
// Defining the class reads the "prototype" of the proxy
class ProxyParent extends new Proxy(function () {}, handler) {}
traps.length = 0;
expect(() => {
  struct S extends ProxyParent {}
}).toThrow(TypeError);
expect(traps).toEqual([]);
