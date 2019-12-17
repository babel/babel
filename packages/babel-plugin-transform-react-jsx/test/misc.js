import * as babel from "@babel/core";
import pluginTransformJSX from "../lib/index";

describe("line terminators", () => {
  (process.env.BABEL_8_BREAKING ? it : it.skip)(
    "are replaced with a space",
    () => {
      const input = `<div>a\nb\rc\r\nd\u2028e\u2029f</div>`;

      const out = babel.transformSync(input, {
        configFile: false,
        plugins: [pluginTransformJSX],
      }).code;

      expect(out).toMatchInlineSnapshot(`
        "import { jsx as _jsx } from \\"react/jsx-runtime\\";

        /*#__PURE__*/
        _jsx(\\"div\\", {
          children: \\"a b c d e f\\"
        });"
      `);
    },
  );
});
