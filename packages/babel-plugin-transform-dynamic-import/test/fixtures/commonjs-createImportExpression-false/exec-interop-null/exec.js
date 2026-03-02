return import("./mod.js").then(({ default: def }) => {
  expect(def).toBe(null);
});
