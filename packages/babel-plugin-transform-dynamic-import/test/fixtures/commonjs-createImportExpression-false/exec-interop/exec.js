return import("./mod.js").then(({ default: def, named }) => {
  expect(def()).toBe("foo");
  expect(named()).toBe("bar");
});
