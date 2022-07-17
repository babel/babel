import * as t from "../../../lib/index.js";

describe("builders", function () {
  describe("typescript", function () {
    describe("exportDefaultDeclaration", function () {
      it("accept TSDeclareFunction as argument for exportDefaultDeclaration", function () {
        // this can be used when having function overrides for function exported as default
        // export default function test();
        // export default function test() {};
        expect(() => {
          t.exportDefaultDeclaration(
            t.tsDeclareFunction(
              t.identifier("test"),
              null,
              [],
              t.tsTypeAnnotation(t.tsVoidKeyword()),
            ),
          );
        }).not.toThrow();
      });
    });
  });
});
