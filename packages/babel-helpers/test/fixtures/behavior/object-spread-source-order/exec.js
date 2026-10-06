const spread = source => HELPER_OBJECT_SPREAD({}, source);
const symbol = Symbol("first");
function trace(copy, throws) {
  const events = [];
  const source = new Proxy({ p: 1, q: 2, [symbol]: 3 }, {
    ownKeys() { events.push("keys"); return [symbol, "p", "q"]; },
    getOwnPropertyDescriptor(target, key) {
      events.push("desc:" + String(key));
      if (throws && key === "q") throw new RangeError("descriptor");
      return Object.getOwnPropertyDescriptor(target, key);
    },
    get(target, key) {
      events.push("get:" + String(key));
      if (throws && key === "p") throw new TypeError("getter");
      return target[key];
    },
  });
  let result;
  try { result = copy(source); } catch (error) { events.push(error.name); }
  return { events, keys: result && Reflect.ownKeys(result) };
}
for (const throws of [false, true]) expect(trace(spread, throws)).toEqual(trace(source => ({ ...source }), throws));

function mutations(copy) {
  const source = {};
  Object.defineProperty(source, "first", { enumerable: true, get() {
    Object.defineProperty(source, "later", { enumerable: true });
    delete source.deleted;
    source.added = 4;
    source[Symbol("added")] = 5;
    return 1;
  } });
  Object.defineProperty(source, "later", { value: 2, configurable: true });
  source.deleted = 3;
  return copy(source);
}
expect(mutations(spread)).toEqual(mutations(source => ({ ...source })));
expect(Reflect.ownKeys(mutations(spread))).toEqual(["first", "later"]);
for (const source of [null, undefined, "abc", 17, true, 1n]) expect(spread(source)).toEqual({ ...source });

// Even arguments deliberately copy property descriptors without reading getters.
let reads = 0;
const descriptors = { get value() { reads++; return 1; } };
const target = HELPER_OBJECT_SPREAD({}, {}, descriptors);
expect(reads).toBe(0);
expect(Object.getOwnPropertyDescriptor(target, "value").get).toBe(Object.getOwnPropertyDescriptor(descriptors, "value").get);

const ownKeys = Reflect.ownKeys;
try {
  Reflect.ownKeys = undefined;
  expect(mutations(spread)).toEqual(mutations(source => ({ ...source })));
} finally { Reflect.ownKeys = ownKeys; }
