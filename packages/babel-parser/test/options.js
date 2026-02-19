import { parse } from "../lib/index.js";

describe("options", () => {
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
            "comments": Array [],
            "end": 19,
            "errors": Array [],
            "program": Node {
              "body": Array [
                Node {
                  "async": false,
                  "body": Node {
                    "body": Array [],
                    "directives": Array [],
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
                  "params": Array [
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
              "directives": Array [],
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
      it("packed", () => {
        expect(parse(CODE, { locations: "packed" })).toMatchInlineSnapshot(`
          Node {
            "comments": Array [],
            "end": 19,
            "errors": Array [],
            "locData": Uint32Array [
              1,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              1,
              9,
              0,
              0,
              1,
              11,
              0,
              0,
              0,
              0,
              1,
              14,
              0,
              0,
              0,
              0,
              1,
              17,
              0,
              0,
              0,
              0,
            ],
            "program": Node {
              "body": Array [
                Node {
                  "async": false,
                  "body": Node {
                    "body": Array [],
                    "directives": Array [],
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
                  "params": Array [
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
              "directives": Array [],
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
