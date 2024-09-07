import * as t from "@babel/types";
import _Printer from "../lib/printer.js";
const Printer = _Printer.default || _Printer;

describe("Printer", () => {
  it("completeness", function () {
    Object.keys(t.VISITOR_KEYS).forEach(function (type) {
      expect(Printer.prototype[type]).toBeTruthy();
    });

    Object.keys(Printer.prototype).forEach(function (type) {
      if (!/[A-Z]/.test(type[0])) return;

      if (type === "DecimalLiteral") return;

      expect(t.VISITOR_KEYS[type]).toBeTruthy();
    });
  });
});
