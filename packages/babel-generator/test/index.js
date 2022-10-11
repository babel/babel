import { parse } from "@babel/parser";
import * as t from "@babel/types";
import fs from "fs";
import path from "path";
import fixtures from "@babel/helper-fixtures";
import { TraceMap, originalPositionFor } from "@jridgewell/trace-mapping";
import { fileURLToPath } from "url";

import _generate, { CodeGenerator } from "../lib/index.js";
const generate = _generate.default || _generate;

describe("generation", function () {
  it("multiple sources", function () {
    const sources = {
      "a.js": "function hi (msg) { console.log(msg); }\n",
      "b.js": "hi('hello');\n",
    };
    const parsed = Object.keys(sources).reduce(function (_parsed, filename) {
      _parsed[filename] = parse(sources[filename], {
        sourceFilename: filename,
      });
      return _parsed;
    }, {});

    const combinedAst = {
      type: "File",
      program: {
        type: "Program",
        sourceType: "module",
        body: [].concat(
          parsed["a.js"].program.body,
          parsed["b.js"].program.body,
        ),
      },
    };

    const generated = generate(combinedAst, { sourceMaps: true }, sources);

    expect(generated.map).toMatchInlineSnapshot(`
      Object {
        "file": undefined,
        "mappings": "AAAA,SAASA,EAAE,CAAEC,GAAG,EAAE;EAAEC,OAAO,CAACC,GAAG,CAACF,GAAG,CAAC;AAAE;ACAtCD,EAAE,CAAC,OAAO,CAAC",
        "names": Array [
          "hi",
          "msg",
          "console",
          "log",
        ],
        "sourceRoot": undefined,
        "sources": Array [
          "a.js",
          "b.js",
        ],
        "sourcesContent": Array [
          "function hi (msg) { console.log(msg); }
      ",
          "hi('hello');
      ",
        ],
        "version": 3,
      }
    `);

    expect(generated.rawMappings).toMatchInlineSnapshot(`
      Array [
        Object {
          "generated": Object {
            "column": 0,
            "line": 1,
          },
          "name": undefined,
          "original": Object {
            "column": 0,
            "line": 1,
          },
          "source": "a.js",
        },
        Object {
          "generated": Object {
            "column": 9,
            "line": 1,
          },
          "name": "hi",
          "original": Object {
            "column": 9,
            "line": 1,
          },
          "source": "a.js",
        },
        Object {
          "generated": Object {
            "column": 11,
            "line": 1,
          },
          "name": undefined,
          "original": Object {
            "column": 11,
            "line": 1,
          },
          "source": "a.js",
        },
        Object {
          "generated": Object {
            "column": 12,
            "line": 1,
          },
          "name": "msg",
          "original": Object {
            "column": 13,
            "line": 1,
          },
          "source": "a.js",
        },
        Object {
          "generated": Object {
            "column": 15,
            "line": 1,
          },
          "name": undefined,
          "original": Object {
            "column": 16,
            "line": 1,
          },
          "source": "a.js",
        },
        Object {
          "generated": Object {
            "column": 17,
            "line": 1,
          },
          "name": undefined,
          "original": Object {
            "column": 18,
            "line": 1,
          },
          "source": "a.js",
        },
        Object {
          "generated": Object {
            "column": 2,
            "line": 2,
          },
          "name": "console",
          "original": Object {
            "column": 20,
            "line": 1,
          },
          "source": "a.js",
        },
        Object {
          "generated": Object {
            "column": 9,
            "line": 2,
          },
          "name": undefined,
          "original": Object {
            "column": 27,
            "line": 1,
          },
          "source": "a.js",
        },
        Object {
          "generated": Object {
            "column": 10,
            "line": 2,
          },
          "name": "log",
          "original": Object {
            "column": 28,
            "line": 1,
          },
          "source": "a.js",
        },
        Object {
          "generated": Object {
            "column": 13,
            "line": 2,
          },
          "name": undefined,
          "original": Object {
            "column": 31,
            "line": 1,
          },
          "source": "a.js",
        },
        Object {
          "generated": Object {
            "column": 14,
            "line": 2,
          },
          "name": "msg",
          "original": Object {
            "column": 32,
            "line": 1,
          },
          "source": "a.js",
        },
        Object {
          "generated": Object {
            "column": 17,
            "line": 2,
          },
          "name": undefined,
          "original": Object {
            "column": 35,
            "line": 1,
          },
          "source": "a.js",
        },
        Object {
          "generated": Object {
            "column": 18,
            "line": 2,
          },
          "name": undefined,
          "original": Object {
            "column": 36,
            "line": 1,
          },
          "source": "a.js",
        },
        Object {
          "generated": Object {
            "column": 0,
            "line": 3,
          },
          "name": undefined,
          "original": Object {
            "column": 38,
            "line": 1,
          },
          "source": "a.js",
        },
        Object {
          "generated": Object {
            "column": 0,
            "line": 4,
          },
          "name": "hi",
          "original": Object {
            "column": 0,
            "line": 1,
          },
          "source": "b.js",
        },
        Object {
          "generated": Object {
            "column": 2,
            "line": 4,
          },
          "name": undefined,
          "original": Object {
            "column": 2,
            "line": 1,
          },
          "source": "b.js",
        },
        Object {
          "generated": Object {
            "column": 3,
            "line": 4,
          },
          "name": undefined,
          "original": Object {
            "column": 3,
            "line": 1,
          },
          "source": "b.js",
        },
        Object {
          "generated": Object {
            "column": 10,
            "line": 4,
          },
          "name": undefined,
          "original": Object {
            "column": 10,
            "line": 1,
          },
          "source": "b.js",
        },
        Object {
          "generated": Object {
            "column": 11,
            "line": 4,
          },
          "name": undefined,
          "original": Object {
            "column": 11,
            "line": 1,
          },
          "source": "b.js",
        },
      ]
    `);

    expect(generated.code).toBe(
      "function hi(msg) {\n  console.log(msg);\n}\nhi('hello');",
    );
  });

  it("identifierName", function () {
    const code = "function foo() { bar; }\n";

    const ast = parse(code, { filename: "inline" }).program;
    const fn = ast.body[0];

    const id = fn.id;
    id.name += "2";
    id.loc.identifierName = "foo";

    const id2 = fn.body.body[0].expression;
    id2.name += "2";
    id2.loc.identifierName = "bar";

    const generated = generate(
      ast,
      {
        filename: "inline",
        sourceFileName: "inline",
        sourceMaps: true,
      },
      code,
    );

    expect(generated.map).toEqual(
      {
        version: 3,
        sources: ["inline"],
        names: ["foo", "bar"],
        mappings: "AAAA,SAASA,IAAG,GAAG;EAAEC,IAAG;AAAE",
        sourcesContent: ["function foo() { bar; }\n"],
      },
      "sourcemap was incorrectly generated",
    );

    expect(generated.rawMappings).toEqual(
      [
        {
          name: undefined,
          generated: { line: 1, column: 0 },
          source: "inline",
          original: { line: 1, column: 0 },
        },
        {
          name: "foo",
          generated: { line: 1, column: 9 },
          source: "inline",
          original: { line: 1, column: 9 },
        },
        {
          name: undefined,
          generated: { line: 1, column: 13 },
          source: "inline",
          original: { line: 1, column: 12 },
        },
        {
          name: undefined,
          generated: { line: 1, column: 16 },
          source: "inline",
          original: { line: 1, column: 15 },
        },
        {
          name: "bar",
          generated: { line: 2, column: 2 },
          source: "inline",
          original: { line: 1, column: 17 },
        },
        {
          name: undefined,
          generated: { line: 2, column: 6 },
          source: "inline",
          original: { line: 1, column: 20 },
        },
        {
          name: undefined,
          generated: { line: 3, column: 0 },
          source: "inline",
          original: { line: 1, column: 22 },
        },
      ],
      "raw mappings were incorrectly generated",
    );

    expect(generated.code).toBe("function foo2() {\n  bar2;\n}");
  });

  it("newline in template literal", () => {
    const code = "`before\n\nafter`;";
    const ast = parse(code, { filename: "inline" }).program;
    const generated = generate(
      ast,
      {
        filename: "inline",
        sourceFileName: "inline",
        sourceMaps: true,
      },
      code,
    );

    const consumer = new TraceMap(generated.map);
    const loc = originalPositionFor(consumer, { line: 2, column: 1 });
    expect(loc).toMatchObject({
      column: 0,
      line: 2,
    });
  });

  it("newline in string literal", () => {
    const code = "'before\\\n\\\nafter';";
    const ast = parse(code, { filename: "inline" }).program;
    const generated = generate(
      ast,
      {
        filename: "inline",
        sourceFileName: "inline",
        sourceMaps: true,
      },
      code,
    );

    const consumer = new TraceMap(generated.map);
    const loc = originalPositionFor(consumer, { line: 2, column: 1 });
    expect(loc).toMatchObject({
      column: 0,
      line: 2,
    });
  });

  it("lazy source map generation", function () {
    const code = "function hi (msg) { console.log(msg); }\n";

    const ast = parse(code, { filename: "a.js" }).program;
    const generated = generate(ast, {
      sourceFileName: "a.js",
      sourceMaps: true,
    });

    expect(Array.isArray(generated.rawMappings)).toBe(true);

    expect(
      Object.getOwnPropertyDescriptor(generated, "map"),
    ).not.toHaveProperty("value");

    expect(generated).toHaveProperty("map");
    expect(typeof generated.map).toBe("object");
  });

  it("wraps around infer inside an array type", () => {
    const type = t.tsArrayType(
      t.tsInferType(
        t.tsTypeParameter(
          null,
          null,
          !process.env.BABEL_8_BREAKING ? "T" : t.identifier("T"),
        ),
      ),
    );

    const output = generate(type).code;
    expect(output).toBe("(infer T)[]");
  });

  it("should not deduplicate comments with same start index", () => {
    const code1 = "/*#__PURE__*/ a();";
    const code2 = "/*#__PURE__*/ b();";

    const ast1 = parse(code1).program;
    const ast2 = parse(code2).program;

    const ast = t.program([...ast1.body, ...ast2.body]);

    expect(generate(ast).code).toBe("/*#__PURE__*/a();\n/*#__PURE__*/b();");
  });

  it("comments with null or undefined loc", () => {
    const code = "/*#__PURE__*/ /*#__PURE__*/";

    const ast = parse(code);

    ast.comments[0].loc = null;
    ast.comments[1].loc = undefined;

    expect(generate(ast).code).toBe("/*#__PURE__*/ /*#__PURE__*/");
  });

  it("leading comments without loc", () => {
    const ast = {
      type: "File",
      errors: [],
      program: {
        type: "Program",
        sourceType: "module",
        interpreter: null,
        body: [
          {
            type: "ImportDeclaration",
            importKind: "value",
            specifiers: [
              {
                type: "ImportSpecifier",
                imported: {
                  type: "Identifier",
                  name: "Attribute",
                },
                importKind: "value",
                local: {
                  type: "Identifier",
                  name: "Attribute",
                },
              },
              {
                type: "ImportSpecifier",
                imported: {
                  type: "Identifier",
                  name: "AttributeSDKType",
                },
                importKind: "value",
                local: {
                  type: "Identifier",
                  name: "AttributeSDKType",
                },
              },
            ],
            source: {
              type: "StringLiteral",
              extra: {
                rawValue: "../../base/v1beta1/attribute",
                raw: '"../../base/v1beta1/attribute"',
              },
              value: "../../base/v1beta1/attribute",
            },
          },
          {
            type: "ImportDeclaration",
            importKind: "value",
            specifiers: [
              {
                type: "ImportSpecifier",
                imported: {
                  type: "Identifier",
                  name: "Rpc",
                },
                importKind: "value",
                local: {
                  type: "Identifier",
                  name: "Rpc",
                },
              },
            ],
            source: {
              type: "StringLiteral",
              extra: {
                rawValue: "../../../helpers",
                raw: '"../../../helpers"',
              },
              value: "../../../helpers",
            },
          },
          {
            type: "ImportDeclaration",
            importKind: "value",
            specifiers: [
              {
                type: "ImportNamespaceSpecifier",
                local: {
                  type: "Identifier",
                  name: "_m0",
                },
              },
            ],
            source: {
              type: "StringLiteral",
              extra: {
                rawValue: "protobufjs/minimal",
                raw: '"protobufjs/minimal"',
              },
              value: "protobufjs/minimal",
            },
          },
          {
            type: "ImportDeclaration",
            importKind: "value",
            specifiers: [
              {
                type: "ImportSpecifier",
                imported: {
                  type: "Identifier",
                  name: "MsgSignProviderAttributes",
                },
                importKind: "value",
                local: {
                  type: "Identifier",
                  name: "MsgSignProviderAttributes",
                },
              },
              {
                type: "ImportSpecifier",
                imported: {
                  type: "Identifier",
                  name: "MsgSignProviderAttributesSDKType",
                },
                importKind: "value",
                local: {
                  type: "Identifier",
                  name: "MsgSignProviderAttributesSDKType",
                },
              },
              {
                type: "ImportSpecifier",
                imported: {
                  type: "Identifier",
                  name: "MsgSignProviderAttributesResponse",
                },
                importKind: "value",
                local: {
                  type: "Identifier",
                  name: "MsgSignProviderAttributesResponse",
                },
              },
              {
                type: "ImportSpecifier",
                imported: {
                  type: "Identifier",
                  name: "MsgSignProviderAttributesResponseSDKType",
                },
                importKind: "value",
                local: {
                  type: "Identifier",
                  name: "MsgSignProviderAttributesResponseSDKType",
                },
              },
              {
                type: "ImportSpecifier",
                imported: {
                  type: "Identifier",
                  name: "MsgDeleteProviderAttributes",
                },
                importKind: "value",
                local: {
                  type: "Identifier",
                  name: "MsgDeleteProviderAttributes",
                },
              },
              {
                type: "ImportSpecifier",
                imported: {
                  type: "Identifier",
                  name: "MsgDeleteProviderAttributesSDKType",
                },
                importKind: "value",
                local: {
                  type: "Identifier",
                  name: "MsgDeleteProviderAttributesSDKType",
                },
              },
              {
                type: "ImportSpecifier",
                imported: {
                  type: "Identifier",
                  name: "MsgDeleteProviderAttributesResponse",
                },
                importKind: "value",
                local: {
                  type: "Identifier",
                  name: "MsgDeleteProviderAttributesResponse",
                },
              },
              {
                type: "ImportSpecifier",
                imported: {
                  type: "Identifier",
                  name: "MsgDeleteProviderAttributesResponseSDKType",
                },
                importKind: "value",
                local: {
                  type: "Identifier",
                  name: "MsgDeleteProviderAttributesResponseSDKType",
                },
              },
            ],
            source: {
              type: "StringLiteral",
              extra: {
                rawValue: "./audit",
                raw: '"./audit"',
              },
              value: "./audit",
            },
            trailingComments: [
              {
                type: "CommentBlock",
                value: "* Msg defines the provider Msg service ",
              },
            ],
          },
          {
            type: "ExportNamedDeclaration",
            exportKind: "type",
            specifiers: [],
            source: null,
            declaration: {
              type: "TSInterfaceDeclaration",
              id: {
                type: "Identifier",
                name: "Msg",
              },
              body: {
                type: "TSInterfaceBody",
                body: [
                  {
                    type: "TSMethodSignature",
                    key: {
                      type: "Identifier",
                      name: "signProviderAttributes",
                    },
                    computed: false,
                    parameters: [
                      {
                        type: "Identifier",
                        name: "request",
                        typeAnnotation: {
                          type: "TSTypeAnnotation",
                          typeAnnotation: {
                            type: "TSTypeReference",
                            typeName: {
                              type: "Identifier",
                              name: "MsgSignProviderAttributes",
                            },
                          },
                        },
                      },
                    ],
                    typeAnnotation: {
                      type: "TSTypeAnnotation",
                      typeAnnotation: {
                        type: "TSTypeReference",
                        typeName: {
                          type: "Identifier",
                          name: "Promise",
                        },
                        typeParameters: {
                          type: "TSTypeParameterInstantiation",
                          params: [
                            {
                              type: "TSTypeReference",
                              typeName: {
                                type: "Identifier",
                                name: "MsgSignProviderAttributesResponse",
                              },
                            },
                          ],
                        },
                      },
                    },
                    kind: "method",
                    trailingComments: [
                      {
                        type: "CommentBlock",
                        value:
                          "* DeleteProviderAttributes defines a method that deletes provider attributes ",
                      },
                    ],
                    leadingComments: [
                      {
                        type: "CommentBlock",
                        value:
                          "* SignProviderAttributes defines a method that signs provider attributes ",
                      },
                    ],
                  },
                  {
                    type: "TSMethodSignature",
                    key: {
                      type: "Identifier",
                      name: "deleteProviderAttributes",
                    },
                    computed: false,
                    parameters: [
                      {
                        type: "Identifier",
                        name: "request",
                        typeAnnotation: {
                          type: "TSTypeAnnotation",
                          typeAnnotation: {
                            type: "TSTypeReference",
                            typeName: {
                              type: "Identifier",
                              name: "MsgDeleteProviderAttributes",
                            },
                          },
                        },
                      },
                    ],
                    typeAnnotation: {
                      type: "TSTypeAnnotation",
                      typeAnnotation: {
                        type: "TSTypeReference",
                        typeName: {
                          type: "Identifier",
                          name: "Promise",
                        },
                        typeParameters: {
                          type: "TSTypeParameterInstantiation",
                          params: [
                            {
                              type: "TSTypeReference",
                              typeName: {
                                type: "Identifier",
                                name: "MsgDeleteProviderAttributesResponse",
                              },
                            },
                          ],
                        },
                      },
                    },
                    kind: "method",
                    leadingComments: [
                      {
                        type: "CommentBlock",
                        value:
                          "* DeleteProviderAttributes defines a method that deletes provider attributes ",
                      },
                    ],
                  },
                ],
              },
            },
            leadingComments: [
              {
                type: "CommentBlock",
                value: "* Msg defines the provider Msg service ",
              },
            ],
          },
          {
            type: "ExportNamedDeclaration",
            exportKind: "value",
            specifiers: [],
            source: null,
            declaration: {
              type: "ClassDeclaration",
              id: {
                type: "Identifier",
                name: "MsgClientImpl",
              },
              superClass: null,
              implements: [
                {
                  type: "TSExpressionWithTypeArguments",
                  expression: {
                    type: "Identifier",
                    name: "Msg",
                  },
                },
              ],
              body: {
                type: "ClassBody",
                body: [
                  {
                    type: "ClassProperty",
                    accessibility: "private",
                    readonly: true,
                    static: false,
                    key: {
                      type: "Identifier",
                      name: "rpc",
                    },
                    computed: false,
                    typeAnnotation: {
                      type: "TSTypeAnnotation",
                      typeAnnotation: {
                        type: "TSTypeReference",
                        typeName: {
                          type: "Identifier",
                          name: "Rpc",
                        },
                      },
                    },
                    value: null,
                  },
                  {
                    type: "ClassMethod",
                    static: false,
                    key: {
                      type: "Identifier",
                      name: "constructor",
                    },
                    computed: false,
                    kind: "constructor",
                    id: null,
                    generator: false,
                    async: false,
                    params: [
                      {
                        type: "Identifier",
                        name: "rpc",
                        typeAnnotation: {
                          type: "TSTypeAnnotation",
                          typeAnnotation: {
                            type: "TSTypeReference",
                            typeName: {
                              type: "Identifier",
                              name: "Rpc",
                            },
                          },
                        },
                      },
                    ],
                    body: {
                      type: "BlockStatement",
                      body: [
                        {
                          type: "ExpressionStatement",
                          expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                              type: "MemberExpression",
                              object: {
                                type: "ThisExpression",
                              },
                              computed: false,
                              property: {
                                type: "Identifier",
                                name: "rpc",
                              },
                            },
                            right: {
                              type: "Identifier",
                              name: "rpc",
                            },
                          },
                        },
                      ],
                      directives: [],
                    },
                    trailingComments: [
                      {
                        type: "CommentBlock",
                        value:
                          " SignProviderAttributes defines a method that signs provider attributes ",
                      },
                    ],
                  },
                  {
                    type: "ClassProperty",
                    static: false,
                    key: {
                      type: "Identifier",
                      name: "signProviderAttributes",
                    },
                    computed: false,
                    value: {
                      type: "ArrowFunctionExpression",
                      returnType: {
                        type: "TSTypeAnnotation",
                        typeAnnotation: {
                          type: "TSTypeReference",
                          typeName: {
                            type: "Identifier",
                            name: "Promise",
                          },
                          typeParameters: {
                            type: "TSTypeParameterInstantiation",
                            params: [
                              {
                                type: "TSTypeReference",
                                typeName: {
                                  type: "Identifier",
                                  name: "MsgSignProviderAttributesResponse",
                                },
                              },
                            ],
                          },
                        },
                      },
                      id: null,
                      generator: false,
                      async: true,
                      params: [
                        {
                          type: "Identifier",
                          name: "request",
                          typeAnnotation: {
                            type: "TSTypeAnnotation",
                            typeAnnotation: {
                              type: "TSTypeReference",
                              typeName: {
                                type: "Identifier",
                                name: "MsgSignProviderAttributes",
                              },
                            },
                          },
                        },
                      ],
                      body: {
                        type: "BlockStatement",
                        body: [
                          {
                            type: "VariableDeclaration",
                            declarations: [
                              {
                                type: "VariableDeclarator",
                                id: {
                                  type: "Identifier",
                                  name: "data",
                                },
                                init: {
                                  type: "CallExpression",
                                  callee: {
                                    type: "MemberExpression",
                                    object: {
                                      type: "CallExpression",
                                      callee: {
                                        type: "MemberExpression",
                                        object: {
                                          type: "Identifier",
                                          name: "MsgSignProviderAttributes",
                                        },
                                        computed: false,
                                        property: {
                                          type: "Identifier",
                                          name: "encode",
                                        },
                                      },
                                      arguments: [
                                        {
                                          type: "Identifier",
                                          name: "request",
                                        },
                                      ],
                                    },
                                    computed: false,
                                    property: {
                                      type: "Identifier",
                                      name: "finish",
                                    },
                                  },
                                  arguments: [],
                                },
                              },
                            ],
                            kind: "const",
                          },
                          {
                            type: "VariableDeclaration",
                            declarations: [
                              {
                                type: "VariableDeclarator",
                                id: {
                                  type: "Identifier",
                                  name: "promise",
                                },
                                init: {
                                  type: "CallExpression",
                                  callee: {
                                    type: "MemberExpression",
                                    object: {
                                      type: "MemberExpression",
                                      object: {
                                        type: "ThisExpression",
                                      },
                                      computed: false,
                                      property: {
                                        type: "Identifier",
                                        name: "rpc",
                                      },
                                    },
                                    computed: false,
                                    property: {
                                      type: "Identifier",
                                      name: "request",
                                    },
                                  },
                                  arguments: [
                                    {
                                      type: "StringLiteral",
                                      extra: {
                                        rawValue: "akash.audit.v1beta1.Msg",
                                        raw: '"akash.audit.v1beta1.Msg"',
                                      },
                                      value: "akash.audit.v1beta1.Msg",
                                    },
                                    {
                                      type: "StringLiteral",
                                      extra: {
                                        rawValue: "SignProviderAttributes",
                                        raw: '"SignProviderAttributes"',
                                      },
                                      value: "SignProviderAttributes",
                                    },
                                    {
                                      type: "Identifier",
                                      name: "data",
                                    },
                                  ],
                                },
                              },
                            ],
                            kind: "const",
                          },
                          {
                            type: "ReturnStatement",
                            argument: {
                              type: "CallExpression",
                              callee: {
                                type: "MemberExpression",
                                object: {
                                  type: "Identifier",
                                  name: "promise",
                                },
                                computed: false,
                                property: {
                                  type: "Identifier",
                                  name: "then",
                                },
                              },
                              arguments: [
                                {
                                  type: "ArrowFunctionExpression",
                                  id: null,
                                  generator: false,
                                  async: false,
                                  params: [
                                    {
                                      type: "Identifier",
                                      name: "data",
                                    },
                                  ],
                                  body: {
                                    type: "CallExpression",
                                    callee: {
                                      type: "MemberExpression",
                                      object: {
                                        type: "Identifier",
                                        name: "MsgSignProviderAttributesResponse",
                                      },
                                      computed: false,
                                      property: {
                                        type: "Identifier",
                                        name: "decode",
                                      },
                                    },
                                    arguments: [
                                      {
                                        type: "NewExpression",
                                        callee: {
                                          type: "MemberExpression",
                                          object: {
                                            type: "Identifier",
                                            name: "_m0",
                                          },
                                          computed: false,
                                          property: {
                                            type: "Identifier",
                                            name: "Reader",
                                          },
                                        },
                                        arguments: [
                                          {
                                            type: "Identifier",
                                            name: "data",
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                        directives: [],
                      },
                    },
                    trailingComments: [
                      {
                        type: "CommentBlock",
                        value:
                          " DeleteProviderAttributes defines a method that deletes provider attributes ",
                      },
                    ],
                    leadingComments: [
                      {
                        type: "CommentBlock",
                        value:
                          " SignProviderAttributes defines a method that signs provider attributes ",
                      },
                    ],
                  },
                  {
                    type: "ClassProperty",
                    static: false,
                    key: {
                      type: "Identifier",
                      name: "deleteProviderAttributes",
                    },
                    computed: false,
                    value: {
                      type: "ArrowFunctionExpression",
                      returnType: {
                        type: "TSTypeAnnotation",
                        typeAnnotation: {
                          type: "TSTypeReference",
                          typeName: {
                            type: "Identifier",
                            name: "Promise",
                          },
                          typeParameters: {
                            type: "TSTypeParameterInstantiation",
                            params: [
                              {
                                type: "TSTypeReference",
                                typeName: {
                                  type: "Identifier",
                                  name: "MsgDeleteProviderAttributesResponse",
                                },
                              },
                            ],
                          },
                        },
                      },
                      id: null,
                      generator: false,
                      async: true,
                      params: [
                        {
                          type: "Identifier",
                          name: "request",
                          typeAnnotation: {
                            type: "TSTypeAnnotation",
                            typeAnnotation: {
                              type: "TSTypeReference",
                              typeName: {
                                type: "Identifier",
                                name: "MsgDeleteProviderAttributes",
                              },
                            },
                          },
                        },
                      ],
                      body: {
                        type: "BlockStatement",
                        body: [
                          {
                            type: "VariableDeclaration",
                            declarations: [
                              {
                                type: "VariableDeclarator",
                                id: {
                                  type: "Identifier",
                                  name: "data",
                                },
                                init: {
                                  type: "CallExpression",
                                  callee: {
                                    type: "MemberExpression",
                                    object: {
                                      type: "CallExpression",
                                      callee: {
                                        type: "MemberExpression",
                                        object: {
                                          type: "Identifier",
                                          name: "MsgDeleteProviderAttributes",
                                        },
                                        computed: false,
                                        property: {
                                          type: "Identifier",
                                          name: "encode",
                                        },
                                      },
                                      arguments: [
                                        {
                                          type: "Identifier",
                                          name: "request",
                                        },
                                      ],
                                    },
                                    computed: false,
                                    property: {
                                      type: "Identifier",
                                      name: "finish",
                                    },
                                  },
                                  arguments: [],
                                },
                              },
                            ],
                            kind: "const",
                          },
                          {
                            type: "VariableDeclaration",
                            declarations: [
                              {
                                type: "VariableDeclarator",
                                id: {
                                  type: "Identifier",
                                  name: "promise",
                                },
                                init: {
                                  type: "CallExpression",
                                  callee: {
                                    type: "MemberExpression",
                                    object: {
                                      type: "MemberExpression",
                                      object: {
                                        type: "ThisExpression",
                                      },
                                      computed: false,
                                      property: {
                                        type: "Identifier",
                                        name: "rpc",
                                      },
                                    },
                                    computed: false,
                                    property: {
                                      type: "Identifier",
                                      name: "request",
                                    },
                                  },
                                  arguments: [
                                    {
                                      type: "StringLiteral",
                                      extra: {
                                        rawValue: "akash.audit.v1beta1.Msg",
                                        raw: '"akash.audit.v1beta1.Msg"',
                                      },
                                      value: "akash.audit.v1beta1.Msg",
                                    },
                                    {
                                      type: "StringLiteral",
                                      extra: {
                                        rawValue: "DeleteProviderAttributes",
                                        raw: '"DeleteProviderAttributes"',
                                      },
                                      value: "DeleteProviderAttributes",
                                    },
                                    {
                                      type: "Identifier",
                                      name: "data",
                                    },
                                  ],
                                },
                              },
                            ],
                            kind: "const",
                          },
                          {
                            type: "ReturnStatement",
                            argument: {
                              type: "CallExpression",
                              callee: {
                                type: "MemberExpression",
                                object: {
                                  type: "Identifier",
                                  name: "promise",
                                },
                                computed: false,
                                property: {
                                  type: "Identifier",
                                  name: "then",
                                },
                              },
                              arguments: [
                                {
                                  type: "ArrowFunctionExpression",
                                  id: null,
                                  generator: false,
                                  async: false,
                                  params: [
                                    {
                                      type: "Identifier",
                                      name: "data",
                                    },
                                  ],
                                  body: {
                                    type: "CallExpression",
                                    callee: {
                                      type: "MemberExpression",
                                      object: {
                                        type: "Identifier",
                                        name: "MsgDeleteProviderAttributesResponse",
                                      },
                                      computed: false,
                                      property: {
                                        type: "Identifier",
                                        name: "decode",
                                      },
                                    },
                                    arguments: [
                                      {
                                        type: "NewExpression",
                                        callee: {
                                          type: "MemberExpression",
                                          object: {
                                            type: "Identifier",
                                            name: "_m0",
                                          },
                                          computed: false,
                                          property: {
                                            type: "Identifier",
                                            name: "Reader",
                                          },
                                        },
                                        arguments: [
                                          {
                                            type: "Identifier",
                                            name: "data",
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                        directives: [],
                      },
                    },
                    leadingComments: [
                      {
                        type: "CommentBlock",
                        value:
                          " DeleteProviderAttributes defines a method that deletes provider attributes ",
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
        directives: [],
      },
      comments: [
        {
          type: "CommentBlock",
          value: "* Msg defines the provider Msg service ",
        },
        {
          type: "CommentBlock",
          value:
            "* SignProviderAttributes defines a method that signs provider attributes ",
        },
        {
          type: "CommentBlock",
          value:
            "* DeleteProviderAttributes defines a method that deletes provider attributes ",
        },
        {
          type: "CommentBlock",
          value:
            " SignProviderAttributes defines a method that signs provider attributes ",
        },
        {
          type: "CommentBlock",
          value:
            " DeleteProviderAttributes defines a method that deletes provider attributes ",
        },
      ],
    };
    expect(generate(ast).code).toMatchInlineSnapshot(`
      "import { Attribute, AttributeSDKType } from \\"../../base/v1beta1/attribute\\";
      import { Rpc } from \\"../../../helpers\\";
      import * as _m0 from \\"protobufjs/minimal\\";
      import { MsgSignProviderAttributes, MsgSignProviderAttributesSDKType, MsgSignProviderAttributesResponse, MsgSignProviderAttributesResponseSDKType, MsgDeleteProviderAttributes, MsgDeleteProviderAttributesSDKType, MsgDeleteProviderAttributesResponse, MsgDeleteProviderAttributesResponseSDKType } from \\"./audit\\";
      /** Msg defines the provider Msg service */
      /** Msg defines the provider Msg service */
      export interface Msg {
        /** SignProviderAttributes defines a method that signs provider attributes */signProviderAttributes(request: MsgSignProviderAttributes): Promise<MsgSignProviderAttributesResponse>;
        /** DeleteProviderAttributes defines a method that deletes provider attributes */
        /** DeleteProviderAttributes defines a method that deletes provider attributes */deleteProviderAttributes(request: MsgDeleteProviderAttributes): Promise<MsgDeleteProviderAttributesResponse>;
      }
      export class MsgClientImpl implements Msg {
        private readonly rpc: Rpc;
        constructor(rpc: Rpc) {
          this.rpc = rpc;
        }
        /* SignProviderAttributes defines a method that signs provider attributes */
        /* SignProviderAttributes defines a method that signs provider attributes */
        signProviderAttributes = async (request: MsgSignProviderAttributes): Promise<MsgSignProviderAttributesResponse> => {
          const data = MsgSignProviderAttributes.encode(request).finish();
          const promise = this.rpc.request(\\"akash.audit.v1beta1.Msg\\", \\"SignProviderAttributes\\", data);
          return promise.then(data => MsgSignProviderAttributesResponse.decode(new _m0.Reader(data)));
        };
        /* DeleteProviderAttributes defines a method that deletes provider attributes */
        /* DeleteProviderAttributes defines a method that deletes provider attributes */
        deleteProviderAttributes = async (request: MsgDeleteProviderAttributes): Promise<MsgDeleteProviderAttributesResponse> => {
          const data = MsgDeleteProviderAttributes.encode(request).finish();
          const promise = this.rpc.request(\\"akash.audit.v1beta1.Msg\\", \\"DeleteProviderAttributes\\", data);
          return promise.then(data => MsgDeleteProviderAttributesResponse.decode(new _m0.Reader(data)));
        };
      }"
    `);
  });
});

describe("programmatic generation", function () {
  it("should add parenthesis when NullishCoalescing is used along with ||", function () {
    // https://github.com/babel/babel/issues/10260
    const nullishCoalesc = t.logicalExpression(
      "??",
      t.logicalExpression("||", t.identifier("a"), t.identifier("b")),
      t.identifier("c"),
    );
    const output = generate(nullishCoalesc).code;
    expect(output).toBe(`(a || b) ?? c`);
  });

  it("should add parenthesis when NullishCoalesing is used with &&", function () {
    const nullishCoalesc = t.logicalExpression(
      "??",
      t.identifier("a"),
      t.logicalExpression(
        "&&",
        t.identifier("b"),
        t.logicalExpression("&&", t.identifier("c"), t.identifier("d")),
      ),
    );
    const output = generate(nullishCoalesc).code;
    expect(output).toBe(`a ?? (b && c && d)`);
  });

  it("numeric member expression", function () {
    // Should not generate `0.foo`
    const mem = t.memberExpression(
      t.numericLiteral(60702),
      t.identifier("foo"),
    );
    new Function(generate(mem).code);
  });

  it("nested if statements needs block", function () {
    const ifStatement = t.ifStatement(
      t.stringLiteral("top cond"),
      t.whileStatement(
        t.stringLiteral("while cond"),
        t.ifStatement(
          t.stringLiteral("nested"),
          t.expressionStatement(t.numericLiteral(1)),
        ),
      ),
      t.expressionStatement(t.stringLiteral("alt")),
    );

    const ast = parse(generate(ifStatement).code);
    expect(ast.program.body[0].consequent.type).toBe("BlockStatement");
  });

  it("prints directives in block with empty body", function () {
    const blockStatement = t.blockStatement(
      [],
      [t.directive(t.directiveLiteral("use strict"))],
    );

    const output = generate(blockStatement).code;
    expect(output).toBe(`{
  "use strict";
}`);
  });

  it("flow object indentation", function () {
    const objectStatement = t.objectTypeAnnotation([
      t.objectTypeProperty(t.identifier("bar"), t.stringTypeAnnotation()),
    ]);

    const output = generate(objectStatement).code;
    expect(output).toBe(`{
  bar: string
}`);
  });

  it("flow object exact", function () {
    const objectStatement = t.objectTypeAnnotation(
      [t.objectTypeProperty(t.identifier("bar"), t.stringTypeAnnotation())],
      undefined,
      undefined,
      undefined,
      true,
    );

    const output = generate(objectStatement).code;
    expect(output).toBe(`{|
  bar: string
|}`);
  });

  it("flow object indentation with empty leading ObjectTypeProperty", function () {
    const objectStatement = t.objectTypeAnnotation(
      [],
      [
        t.objectTypeIndexer(
          t.identifier("key"),
          t.anyTypeAnnotation(),
          t.numberTypeAnnotation(),
        ),
      ],
    );

    const output = generate(objectStatement).code;

    expect(output).toBe(`{
  [key: any]: number
}`);
  });

  it("flow interface with nullish extends", () => {
    const interfaceDeclaration = t.interfaceDeclaration(
      t.identifier("A"),
      undefined,
      undefined,
      t.objectTypeAnnotation([]),
    );
    const output = generate(interfaceDeclaration).code;
    expect(output).toBe("interface A {}");
  });

  it("flow function type annotation with no parent", () => {
    const functionTypeAnnotation = t.functionTypeAnnotation(
      null,
      [],
      null,
      t.voidTypeAnnotation(),
    );
    const output = generate(functionTypeAnnotation).code;
    expect(output).toBe("() => void");
  });

  describe("directives", function () {
    it("preserves escapes", function () {
      const directive = t.directive(
        t.directiveLiteral(String.raw`us\x65 strict`),
      );
      const output = generate(directive).code;

      expect(output).toBe(String.raw`"us\x65 strict";`);
    });

    it("preserves escapes in minified output", function () {
      // https://github.com/babel/babel/issues/4767

      const directive = t.directive(t.directiveLiteral(String.raw`foo\n\t\r`));
      const output = generate(directive, { minified: true }).code;

      expect(output).toBe(String.raw`"foo\n\t\r";`);
    });

    it("unescaped single quote", function () {
      const directive = t.directive(t.directiveLiteral(String.raw`'\'\"`));
      const output = generate(directive).code;

      expect(output).toBe(String.raw`"'\'\"";`);
    });

    it("unescaped double quote", function () {
      const directive = t.directive(t.directiveLiteral(String.raw`"\'\"`));
      const output = generate(directive).code;

      expect(output).toBe(String.raw`'"\'\"';`);
    });

    it("unescaped single and double quotes together throw", function () {
      const directive = t.directive(t.directiveLiteral(String.raw`'"`));

      expect(() => {
        generate(directive);
      }).toThrow();
    });

    it("preserves single quotes if not minified", function () {
      const directive = parse("'use strict';").program.directives[0];
      const output = generate(directive).code;

      expect(output).toBe("'use strict';");
    });

    it("converts single quotes to double quotes if minified", function () {
      const directive = parse("'use strict';").program.directives[0];
      const output = generate(directive, { minified: true }).code;

      expect(output).toBe('"use strict";');
    });
  });

  describe("typescript generate parentheses if necessary", function () {
    it("wraps around union for array", () => {
      const typeStatement = t.tsArrayType(
        t.tsUnionType([
          t.tsIntersectionType([t.tsNumberKeyword(), t.tsBooleanKeyword()]),
          t.tsNullKeyword(),
        ]),
      );
      const output = generate(typeStatement).code;
      expect(output).toBe("((number & boolean) | null)[]");
    });
    it("wraps around intersection for array", () => {
      const typeStatement = t.tsArrayType(
        t.tsIntersectionType([t.tsNumberKeyword(), t.tsBooleanKeyword()]),
      );
      const output = generate(typeStatement).code;
      expect(output).toBe("(number & boolean)[]");
    });
    it("wraps around rest", () => {
      const typeStatement = t.tsRestType(
        t.tsIntersectionType([t.tsNumberKeyword(), t.tsBooleanKeyword()]),
      );
      const output = generate(typeStatement).code;
      expect(output).toBe("...(number & boolean)");
    });
    it("wraps around optional type", () => {
      const typeStatement = t.tsOptionalType(
        t.tsIntersectionType([t.tsNumberKeyword(), t.tsBooleanKeyword()]),
      );
      const output = generate(typeStatement).code;
      expect(output).toBe("(number & boolean)?");
    });
  });

  describe("object expressions", () => {
    it("not wrapped in parentheses when standalone", () => {
      const objectExpression = t.objectExpression([]);
      const output = generate(objectExpression).code;
      expect(output).toBe("{}");
    });

    it("wrapped in parentheses in expression statement", () => {
      const expressionStatement = t.expressionStatement(t.objectExpression([]));
      const output = generate(expressionStatement).code;
      expect(output).toBe("({});");
    });

    it("wrapped in parentheses in arrow function", () => {
      const arrowFunctionExpression = t.arrowFunctionExpression(
        [],
        t.objectExpression([]),
      );
      const output = generate(arrowFunctionExpression).code;
      expect(output).toBe("() => ({})");
    });

    it("not wrapped in parentheses in conditional", () => {
      const conditionalExpression = t.conditionalExpression(
        t.objectExpression([]),
        t.booleanLiteral(true),
        t.booleanLiteral(false),
      );
      const output = generate(conditionalExpression).code;
      expect(output).toBe("{} ? true : false");
    });

    it("wrapped in parentheses in conditional in expression statement", () => {
      const expressionStatement = t.expressionStatement(
        t.conditionalExpression(
          t.objectExpression([]),
          t.booleanLiteral(true),
          t.booleanLiteral(false),
        ),
      );
      const output = generate(expressionStatement).code;
      expect(output).toBe("({}) ? true : false;");
    });

    it("wrapped in parentheses in conditional in arrow function", () => {
      const arrowFunctionExpression = t.arrowFunctionExpression(
        [],
        t.conditionalExpression(
          t.objectExpression([]),
          t.booleanLiteral(true),
          t.booleanLiteral(false),
        ),
      );
      const output = generate(arrowFunctionExpression).code;
      expect(output).toBe("() => ({}) ? true : false");
    });

    it("not wrapped in parentheses in binary expression", () => {
      const binaryExpression = t.binaryExpression(
        "+",
        t.objectExpression([]),
        t.numericLiteral(1),
      );
      const output = generate(binaryExpression).code;
      expect(output).toBe("{} + 1");
    });

    it("wrapped in parentheses in binary expression in expression statement", () => {
      const expressionStatement = t.expressionStatement(
        t.binaryExpression("+", t.objectExpression([]), t.numericLiteral(1)),
      );
      const output = generate(expressionStatement).code;
      expect(output).toBe("({}) + 1;");
    });

    it("wrapped in parentheses in binary expression in arrow function", () => {
      const arrowFunctionExpression = t.arrowFunctionExpression(
        [],
        t.binaryExpression("+", t.objectExpression([]), t.numericLiteral(1)),
      );
      const output = generate(arrowFunctionExpression).code;
      expect(output).toBe("() => ({}) + 1");
    });

    it("not wrapped in parentheses in sequence expression", () => {
      const sequenceExpression = t.sequenceExpression([
        t.objectExpression([]),
        t.numericLiteral(1),
      ]);
      const output = generate(sequenceExpression).code;
      expect(output).toBe("{}, 1");
    });

    it("wrapped in parentheses in sequence expression in expression statement", () => {
      const expressionStatement = t.expressionStatement(
        t.sequenceExpression([t.objectExpression([]), t.numericLiteral(1)]),
      );
      const output = generate(expressionStatement).code;
      expect(output).toBe("({}), 1;");
    });

    it("wrapped in parentheses in sequence expression in arrow function", () => {
      const arrowFunctionExpression = t.arrowFunctionExpression(
        [],
        t.sequenceExpression([t.objectExpression([]), t.numericLiteral(1)]),
      );
      const output = generate(arrowFunctionExpression).code;
      expect(output).toBe("() => (({}), 1)");
    });
  });

  describe("function expressions", () => {
    it("not wrapped in parentheses when standalone", () => {
      const functionExpression = t.functionExpression(
        null,
        [],
        t.blockStatement([]),
      );
      const output = generate(functionExpression).code;
      expect(output).toBe("function () {}");
    });

    it("wrapped in parentheses in expression statement", () => {
      const expressionStatement = t.expressionStatement(
        t.functionExpression(null, [], t.blockStatement([])),
      );
      const output = generate(expressionStatement).code;
      expect(output).toBe("(function () {});");
    });

    it("wrapped in parentheses in export default declaration", () => {
      const exportDefaultDeclaration = t.exportDefaultDeclaration(
        t.functionExpression(null, [], t.blockStatement([])),
      );
      const output = generate(exportDefaultDeclaration).code;
      expect(output).toBe("export default (function () {});");
    });
  });

  describe("class expressions", () => {
    it("not wrapped in parentheses when standalone", () => {
      const classExpression = t.classExpression(null, null, t.classBody([]));
      const output = generate(classExpression).code;
      expect(output).toBe("class {}");
    });

    it("wrapped in parentheses in expression statement", () => {
      const expressionStatement = t.expressionStatement(
        t.classExpression(null, null, t.classBody([])),
      );
      const output = generate(expressionStatement).code;
      expect(output).toBe("(class {});");
    });

    it("wrapped in parentheses in export default declaration", () => {
      const exportDefaultDeclaration = t.exportDefaultDeclaration(
        t.classExpression(null, null, t.classBody([])),
      );
      const output = generate(exportDefaultDeclaration).code;
      expect(output).toBe("export default (class {});");
    });
  });

  describe("jsescOption.minimal", () => {
    const string = t.stringLiteral("\u8868\u683C_\u526F\u672C");

    it("true", () => {
      const output = generate(string, { jsescOption: { minimal: true } }).code;
      expect(output).toBe(`"表格_副本"`);
    });

    it("false", () => {
      const output = generate(string, { jsescOption: { minimal: false } }).code;
      expect(output).toBe(`"\\u8868\\u683C_\\u526F\\u672C"`);
    });

    if (process.env.BABEL_8_BREAKING) {
      it("default", () => {
        const output = generate(string).code;

        expect(output).toBe(`"表格_副本"`);
      });
    } else {
      it("default in Babel 7", () => {
        const output = generate(string).code;

        expect(output).toBe(`"\\u8868\\u683C_\\u526F\\u672C"`);
      });
    }
  });

  describe("typescript interface declaration", () => {
    it("empty extends array", () => {
      const tsInterfaceDeclaration = t.tsInterfaceDeclaration(
        t.identifier("A"),
        undefined,
        [],
        t.tsInterfaceBody([]),
      );
      const output = generate(tsInterfaceDeclaration).code;
      expect(output).toBe("interface A {}");
    });
  });

  describe("identifier let", () => {
    it("detects open bracket from non-optional OptionalMemberExpression", () => {
      const ast = parse(`for (let?.[x];;);`, {
        sourceType: "script",
        strictMode: "false",
      });
      ast.program.body[0].init.optional = false;
      const output = generate(ast).code;
      expect(output).toBe("for ((let)[x];;);");
    });
  });
});

describe("CodeGenerator", function () {
  it("generate", function () {
    const codeGen = new CodeGenerator(t.numericLiteral(123));
    const code = codeGen.generate().code;
    expect(parse(code).program.body[0].expression.value).toBe(123);
  });
});

const suites = (fixtures.default || fixtures)(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures"),
);

suites.forEach(function (testSuite) {
  describe("generation/" + testSuite.title, function () {
    testSuite.tests.forEach(function (task) {
      const testFn = task.disabled ? it.skip : it;

      testFn(
        task.title,

        function () {
          const expected = task.expect;
          const actual = task.actual;
          const actualCode = actual.code;

          if (actualCode) {
            const parserOpts = {
              filename: actual.loc,
              plugins: task.options.plugins || [],
              strictMode: task.options.strictMode === false ? false : true,
              sourceType: "module",
              sourceMaps: !!task.sourceMap,
              ...task.options.parserOpts,
            };
            const actualAst = parse(actualCode, parserOpts);
            const options = {
              sourceFileName: path.relative(
                path.dirname(fileURLToPath(import.meta.url)),
                actual.loc,
              ),
              ...task.options,
              sourceMaps: task.sourceMap ? true : task.options.sourceMaps,
            };

            const run = () => {
              return generate(actualAst, options, actualCode);
            };

            const throwMsg = options.throws;
            if (throwMsg) {
              expect(() => run()).toThrow(
                throwMsg === true ? undefined : throwMsg,
              );
            } else {
              const result = run();

              if (options.sourceMaps) {
                try {
                  expect(result.map).toEqual(task.sourceMap);
                } catch (e) {
                  if (!process.env.OVERWRITE && task.sourceMap) throw e;
                  console.log(`Updated test file: ${task.sourceMapFile.loc}`);
                  fs.writeFileSync(
                    task.sourceMapFile.loc,
                    JSON.stringify(result.map, null, 2),
                  );
                }
              }

              if (
                !expected.code &&
                result.code &&
                fs.statSync(path.dirname(expected.loc)).isDirectory() &&
                !process.env.CI
              ) {
                console.log(`New test file created: ${expected.loc}`);
                fs.writeFileSync(expected.loc, result.code);
              } else {
                try {
                  expect(result.code).toBe(expected.code);
                  if (!options.expectedReParseError) {
                    expect(() => {
                      parse(result.code, parserOpts);
                    }).not.toThrow();
                  }
                } catch (e) {
                  if (!process.env.OVERWRITE) throw e;
                  console.log(`Updated test file: ${expected.loc}`);
                  fs.writeFileSync(expected.loc, result.code);
                }
              }
            }
          }
        },
      );
    });
  });
});
