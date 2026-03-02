import * as t from "../../../lib/index.js";

describe("builders", function () {
  describe("flow", function () {
    describe("declareClass", function () {
      it("accept TypeParameterDeclaration as typeParameters", function () {
        const typeParameter = t.typeParameter(null, null, null);
        typeParameter.name = "T";
        const declaredClass = t.declareClass(
          t.identifier("A"),
          t.typeParameterDeclaration([typeParameter]),
          [],
          t.objectTypeAnnotation([], [], [], []),
        );
        expect(t.isDeclareClass(declaredClass)).toBe(true);
      });

      it("not accept typeParameterInstantiation as typeParameters", function () {
        expect(() =>
          t.declareClass(
            t.identifier("A"),
            t.typeParameterInstantiation([
              t.genericTypeAnnotation(t.identifier("T")),
            ]),
            [],
            t.objectTypeAnnotation([], [], [], []),
          ),
        ).toThrow(Error);
      });
    });
  });
});
