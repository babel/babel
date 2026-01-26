import { expect, it, describe } from "tstyche";
import { transformSync } from "../src/index.ts";

describe("core", () => {
  it("plugin api param", () => {
    transformSync("", {
      plugins: [
        function (api) {
          expect(api).type.toHaveProperty("types");
          return {} as any;
        },
      ],
    });
  });
});
