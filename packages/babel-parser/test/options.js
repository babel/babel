import { parse } from "../lib/index.js";

describe("options", () => {
  describe("sourceType unambiguous", () => {
    test.each([
      ["using x = y;", {}],
      ["await using x = y;", {}],
      ["for await (const x of xs) {}", {}],
      ["{ await using x = y; }", {}],
      ["for (await using x of xs) {}", {}],
      ["await using x = y;", { allowAwaitOutsideFunction: true }],
      ["using x = y; const m = module {};", { plugins: ["moduleBlocks"] }],
    ])("recognizes %s as a module with %j", (code, options) => {
      expect(() => parse(code, { ...options, sourceType: "script" })).toThrow(
        SyntaxError,
      );
      expect(parse(code, { ...options, sourceType: "unambiguous" })).toEqual(
        parse(code, { ...options, sourceType: "module" }),
      );
    });

    test.each([
      ["{ using x = y; }", {}],
      ["for (using x of xs) {}", {}],
      ["async function f() { await using x = y; for await (x of xs) {} }", {}],
      ["{ await using x = y; }", { allowAwaitOutsideFunction: true }],
      ["for await (x of xs) {}", { allowAwaitOutsideFunction: true }],
      ["for (await using x of xs) {}", { allowAwaitOutsideFunction: true }],
      ["const m = module { using x = y; };", { plugins: ["moduleBlocks"] }],
    ])("recognizes %s as a script with %j", (code, options) => {
      const { program } = parse(code, {
        ...options,
        sourceType: "unambiguous",
      });
      expect(program.sourceType).toBe("script");
    });
  });

  describe("strictMode", () => {
    const CODE = "function f(x, x) {}";

    function expectToSucceed(opts) {
      expect(parse(CODE, opts).program.body[0]).toMatchObject({
        type: "FunctionDeclaration",
        id: { type: "Identifier", name: "f" },
        generator: false,
        async: false,
        params: [
          { type: "Identifier", name: "x" },
          { type: "Identifier", name: "x" },
        ],
        body: {
          type: "BlockStatement",
          body: [],
          directives: [],
        },
      });
    }

    function expectToFail(opts) {
      expect(() => parse(CODE, opts)).toThrow(
        new SyntaxError("Argument name clash. (1:14)"),
      );
    }

    describe("sourceType module", () => {
      it("default parses as strict mode", () => {
        expectToFail({ sourceType: "module" });
      });

      it("false parses as sloppy mode", () => {
        expectToSucceed({ sourceType: "module", strictMode: false });
      });

      it("true parses as strict mode", () => {
        expectToFail({ sourceType: "module", strictMode: true });
      });
    });

    describe("sourceType script", () => {
      it("default parses as sloppy mode", () => {
        expectToSucceed({ sourceType: "script" });
      });

      it("false parses as sloppy mode", () => {
        expectToSucceed({ sourceType: "script", strictMode: false });
      });

      it("true parses as strict mode", () => {
        expectToFail({ sourceType: "script", strictMode: true });
      });
    });

    describe("locations", () => {
      it("false", () => {
        expect(parse(CODE, { locations: false })).toMatchInlineSnapshot(`
          Node {
            "comments": [],
            "end": 19,
            "errors": [],
            "program": Node {
              "body": [
                Node {
                  "async": false,
                  "body": Node {
                    "body": [],
                    "directives": [],
                    "end": 19,
                    "start": 17,
                    "type": "BlockStatement",
                  },
                  "end": 19,
                  "generator": false,
                  "id": Node {
                    "end": 10,
                    "name": "f",
                    "start": 9,
                    "type": "Identifier",
                  },
                  "params": [
                    Node {
                      "end": 12,
                      "name": "x",
                      "start": 11,
                      "type": "Identifier",
                    },
                    Node {
                      "end": 15,
                      "name": "x",
                      "start": 14,
                      "type": "Identifier",
                    },
                  ],
                  "start": 0,
                  "type": "FunctionDeclaration",
                },
              ],
              "directives": [],
              "end": 19,
              "interpreter": null,
              "sourceType": "script",
              "start": 0,
              "type": "Program",
            },
            "start": 0,
            "type": "File",
          }
        `);
      });
    });
  });
});
