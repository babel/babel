var assert = require("assert");

async function foo() {
  for (let i; i;);
}

describe("replaceWith falsy", function () {
  it("should run a loop whose test is initially falsy", async function () {
    assert.strictEqual(await foo(), undefined);
  });
});
