import * as t from "../../../lib/index.js";

describe("builders", function () {
  describe("typescript", function () {
    describe("createTSUnionType", function () {
      it("dedupes bare type references without type arguments", function () {
        const union = t.createTSUnionType([
          t.tsTypeReference(t.identifier("A")),
          t.tsTypeReference(t.identifier("A")),
        ]);
        expect(union.type).toBe("TSTypeReference");
        expect(union.typeName.name).toBe("A");
      });

      it("matches Flow parity for bare generic annotations", function () {
        const union = t.createFlowUnionType([
          t.genericTypeAnnotation(t.identifier("A")),
          t.genericTypeAnnotation(t.identifier("A")),
        ]);
        expect(union.type).toBe("GenericTypeAnnotation");
        expect(union.id.name).toBe("A");
      });
    });
  });
});
