var code = ``;

const res = transform(code, {
  plugins: [
    function (b) {
      var t = b.types;
      return {
        visitor: {
          Program: {
            enter(path) {
              path.pushContainer(
                "body",
                t.JSXElement(
                  t.JSXOpeningElement(t.JSXIdentifier("div"), [], false),
                  t.JSXClosingElement(t.JSXIdentifier("div")),
                  []
                )
              );
            }
          },
        },
      };
    },
    ["../../../..", { runtime: "automatic" }],
  ],
});

expect(res.code).toMatchInlineSnapshot(`
"import { jsxDEV as _jsxDEV } from \\"react/jsx-dev-runtime\\";

/*#__PURE__*/
_jsxDEV(\\"div\\", {}, void 0, false, void 0, this)"
`)
