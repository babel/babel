const sideChannel = require("./side-channel.cjs");

return import.defer("./dep.cjs").then(ns => {
  expect(sideChannel.executed).toBe(false);

  expect(ns.prop).toBe(3);
  expect(sideChannel.executed).toBe(true);
});
