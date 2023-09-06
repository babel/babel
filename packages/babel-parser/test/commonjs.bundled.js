import { itNoESM, itESM, commonJS } from "$repo-utils";

describe("commonjs bundle", () => {
  itESM("dummy", () => {});

  itNoESM("has an __esModule export", () => {
    const { require } = commonJS(import.meta.url);

    // This will require the bundle when running the tests when publishing
    expect(require("../lib/index.js").__esModule).toBe(true);
  });
});
