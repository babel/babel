import { parse } from "@babel/parser";

import _traverse, { visitors } from "../lib/index.js";
const traverse = _traverse.default || _traverse;

describe("visitors", () => {
  describe("merge", () => {
    (process.env.BABEL_8_BREAKING ? it : it.skip)(
      "should set `_verified` and `_exploded` to `true` if merging catch-all visitors",
      () => {
        const visitor = visitors.merge([{ enter() {} }, { enter() {} }]);
        expect(visitor._verified).toBe(true);
        expect(visitor._exploded).toBe(true);
      },
    );

    it("should work when merging node type visitors", () => {
      const ast = parse("1");
      const visitor = visitors.merge([
        { ArrayExpression() {} },
        { ArrayExpression() {} },
      ]);
      traverse(ast, visitor);
      expect(visitor).toMatchInlineSnapshot(`
        Object {
          "ArrayExpression": Object {
            "enter": Array [
              [Function],
              [Function],
            ],
          },
          "_exploded": true,
          "_verified": true,
        }
      `);
    });

    it("enter", () => {
      const ast = parse("1");
      const visitor = visitors.merge([{ enter() {} }, { enter() {} }]);
      traverse(ast, visitor);
      expect(visitor).toMatchInlineSnapshot(`
        Object {
          "_exploded": true,
          "_verified": true,
          "enter": Array [
            [Function],
            [Function],
          ],
        }
      `);
    });

    it("enter with states", () => {
      const ast = parse("1");
      const visitor = visitors.merge(
        [{ enter() {} }, { enter() {} }],
        [{}, {}],
      );
      traverse(ast, visitor);
      expect(visitor).toMatchInlineSnapshot(`
        Object {
          "_exploded": true,
          "_verified": true,
          "enter": Array [
            [Function],
            [Function],
          ],
        }
      `);
    });

    it("enter with wrapper", () => {
      const ast = parse("1");
      const visitor = visitors.merge(
        [{ enter() {} }, { enter() {} }],
        [{}, {}],
        (stateKey, key, fn) => fn,
      );
      traverse(ast, visitor);
      expect(visitor).toMatchInlineSnapshot(`
        Object {
          "_exploded": true,
          "_verified": true,
          "enter": Array [
            [Function],
            [Function],
          ],
        }
      `);
    });
  });
});
