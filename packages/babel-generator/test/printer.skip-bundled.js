import * as t from "@babel/types";

import * as generators from "../lib/generators/index.js";

describe("Printer", () => {
  it("completeness", function () {
    Object.keys(t.VISITOR_KEYS).forEach(function (type) {
      expect(generators[type]).toBeTruthy();
    });

    Object.keys(generators).forEach(function (type) {
      if (!/[A-Z]/.test(type[0])) return;

      expect(t.VISITOR_KEYS).toHaveProperty(type);
    });
  });
});
