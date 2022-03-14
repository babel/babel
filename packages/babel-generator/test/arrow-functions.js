import { parse } from "@babel/parser";

import _generate from "../lib/index.js";
const generate = _generate.default;

describe("parameter parentheses", () => {
  // Common source text for several snapshot tests
  const source = `
    () => {};
    a => {};
    (a, b) => {};
    async () => {};
    async a => {};
    async (a, b) => {};
  `;
  // Apply a callback function to each parameter in the AST of the above source
  function forEachParam(ast, callbackFn) {
    ast.program.body.forEach(s => {
      s.expression.params.forEach(p => {
        callbackFn(p);
      });
    });
  }

  it("auxiliaryCommentBefore", () => {
    const ast = parse(source);
    forEachParam(ast, p => (p.loc = null));
    const output = generate(ast, { auxiliaryCommentBefore: "BEFORE" }).code;
    expect(output).toMatchInlineSnapshot(`
      "() => {};

      (
      /*BEFORE*/
      a) => {};

      (
      /*BEFORE*/
      a,
      /*BEFORE*/
      b) => {};

      async () => {};

      async (
      /*BEFORE*/
      a) => {};

      async (
      /*BEFORE*/
      a,
      /*BEFORE*/
      b) => {};"
    `);
  });
  it("auxiliaryCommentAfter", () => {
    const ast = parse(source);
    forEachParam(ast, p => (p.loc = null));
    const output = generate(ast, { auxiliaryCommentAfter: "AFTER" }).code;
    expect(output).toMatchInlineSnapshot(`
      "() => {};

      (a
      /*AFTER*/
      ) => {};

      (a
      /*AFTER*/
      , b
      /*AFTER*/
      ) => {};

      async () => {};

      async (a
      /*AFTER*/
      ) => {};

      async (a
      /*AFTER*/
      , b
      /*AFTER*/
      ) => {};"
    `);
  });
  it("empty leadingComments array", () => {
    const ast = parse(source);
    forEachParam(ast, p => (p.leadingComments = []));
    const output = generate(ast).code;
    expect(output).toMatchInlineSnapshot(`
      "() => {};

      a => {};

      (a, b) => {};

      async () => {};

      async a => {};

      async (a, b) => {};"
    `);
  });
  it("empty trailingComments array", () => {
    const ast = parse(source);
    forEachParam(ast, p => (p.trailingComments = []));
    const output = generate(ast).code;
    expect(output).toMatchInlineSnapshot(`
      "() => {};

      a => {};

      (a, b) => {};

      async () => {};

      async a => {};

      async (a, b) => {};"
    `);
  });
});
