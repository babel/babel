const log = [];
const promise1 = import(
  (log.push("specifier 1"), "./1.js"),
  (log.push("options 1"), {}),
);
const promise2 = import("./1.js", (log.push("options 2"), {}));
expect(log).toEqual(["specifier 1", "options 1", "options 2"]);
return Promise.all([
  expect(promise1).resolves.toHaveProperty("default", 1),
  expect(promise2).resolves.toHaveProperty("default", 1),
]);
