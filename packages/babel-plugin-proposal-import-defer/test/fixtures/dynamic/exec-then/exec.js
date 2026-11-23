const sideChannel = require("./side-channel.cjs");

return import.defer("./dep.cjs").then(ns => {
  expect(sideChannel.executed).toBe(false);
  expect(ns).not.toBe("then called");

  expect(ns.then).toBeUndefined();
  expect("then" in ns).toBe(false);
  expect(sideChannel.executed).toBe(false);
});
