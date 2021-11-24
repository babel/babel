import { createRequire } from "module";

const require = createRequire(import.meta.url);

it("module.exports.default is correctly updated", () => {
  // eslint-disable-next-line import/extensions
  const typeofHelper = require("@babel/runtime/helpers/typeof");

  expect(typeof typeofHelper).toBe("function");
  expect(typeof typeofHelper.default).toBe("function");

  typeofHelper();

  expect(typeof typeofHelper).toBe("function");
  expect(typeof typeofHelper.default).toBe("function");
});
