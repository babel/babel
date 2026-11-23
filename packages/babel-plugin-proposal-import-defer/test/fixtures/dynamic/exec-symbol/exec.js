const sideChannel = require("./side-channel.cjs");

return import.defer("./dep.cjs").then(ns => {
  expect(ns[Symbol.iterator]).toBeUndefined();
  expect(Symbol.iterator in ns).toBe(false);
  expect(Object.getOwnPropertyDescriptor(ns, Symbol.iterator)).toBeUndefined();
  expect(sideChannel.executed).toBe(false);

  expect(ns.prop).toBe(3);
  expect(sideChannel.executed).toBe(true);
});
