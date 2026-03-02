expect(() => {
  using x = null;
  using y = undefined;
}).not.toThrow();
