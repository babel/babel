import { parse } from "@babel/parser";
import _traverse from "../lib/index.js";
const traverse = _traverse.default || _traverse;
import _generate from "@babel/generator";
const generate = _generate.default || _generate;

describe("traverse.direct", function () {
  const code = `
    const foo = bar => {
      const lorem = "ipsum";
      return lorem;
    };
  `;

  it("traverses a NodePath's children", () => {
    let reference;
    const ast = parse(code);

    traverse(ast, {
      VariableDeclaration(path) {
        reference = path; // side effect
        path.stop();
      },
    });

    const { node, parentPath } = reference;
    expect(parentPath.node.type).toBe("Program");
    expect(reference.parentPath.node.type).toBe("Program");

    const visitor = {
      VariableDeclaration(path) {
        // Let's change the type of variable declaration
        path.node.kind = "let";
        // And do it only once
        path.stop();
      },
    };

    // no third argument provided, `visitSelf` defaults to false
    traverse.direct(reference, visitor);

    expect(parentPath.node.type).toBe("Program");
    expect(reference.parentPath.node.type).toBe("Program");

    // foo remains a const declaration
    expect(node.kind).toMatch("const");
    expect(node.declarations[0].id.name).toMatch("foo");
    // lorem is now a let declaration
    expect(node.declarations[0].init.body.body[0].kind).toMatch("let");
    expect(
      node.declarations[0].init.body.body[0].declarations[0].id.name,
    ).toMatch("lorem");

    expect(generate(node).code).toBe(`const foo = bar => {
  let lorem = "ipsum";
  return lorem;
};`);
  });

  it("traverses a NodePath directly and it's childrens", () => {
    let reference;
    const ast = parse(code);

    traverse(ast, {
      VariableDeclaration(path) {
        reference = path; // side effect
        path.stop();
      },
    });

    const { node, parentPath } = reference;
    expect(parentPath.node.type).toBe("Program");
    expect(reference.parentPath.node.type).toBe("Program");

    const visitor = {
      VariableDeclaration(path) {
        // Let's change the type of variable declaration
        path.node.kind = "let";
        // And do it only once
        path.stop();
      },
    };

    // third argument provided as true, `visitSelf` is true
    traverse.direct(reference, visitor, true);

    expect(parentPath.node.type).toBe("Program");
    expect(reference.parentPath.node.type).toBe("Program");

    // foo is now a let declaration
    expect(node.kind).toMatch("let");
    expect(node.declarations[0].id.name).toMatch("foo");
    // lorem remains a const declaration
    expect(node.declarations[0].init.body.body[0].kind).toMatch("const");
    expect(
      node.declarations[0].init.body.body[0].declarations[0].id.name,
    ).toMatch("lorem");

    expect(generate(node).code).toBe(`let foo = bar => {
  const lorem = "ipsum";
  return lorem;
};`);
  });
});
