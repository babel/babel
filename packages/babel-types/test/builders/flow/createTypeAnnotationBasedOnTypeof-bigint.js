import { createTypeAnnotationBasedOnTypeof } from "../../..";

describe("builders", function () {
  describe("flow", function () {
    (parseFloat(process.versions.node) >= 12 ? describe : describe.skip)(
      "createTypeAnnotationBasedOnTypeof on bigint",
      function () {
        const values = {
          bigint: typeof 0n,
        };

        for (const name in values) {
          const value = values[name];
          it(name, function () {
            const result = createTypeAnnotationBasedOnTypeof(value);
            expect(result).toMatchSnapshot();
          });
        }
      },
    );
  });
});
