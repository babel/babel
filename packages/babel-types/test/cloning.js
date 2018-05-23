import * as t from "../lib";
import { parse } from "@babel/parser";

describe("cloneNode", function() {
  it("should handle undefined", function() {
    const node = undefined;
    const cloned = t.cloneNode(node);
    expect(cloned).toBeUndefined();
  });

  it("should handle null", function() {
    const node = null;
    const cloned = t.cloneNode(node);
    expect(cloned).toBeNull();
  });

  it("should handle simple cases", function() {
    const node = t.identifier("a");
    const cloned = t.cloneNode(node);
    expect(node).not.toBe(cloned);
    expect(t.isNodesEquivalent(node, cloned)).toBe(true);
  });

  it("should handle full programs", function() {
    const file = parse("1 + 1");
    const cloned = t.cloneNode(file);
    expect(file).not.toBe(cloned);
    expect(file.program.body[0].expression.right).not.toBe(
      cloned.program.body[0].expression.right,
    );
    expect(file.program.body[0].expression.left).not.toBe(
      cloned.program.body[0].expression.left,
    );
    expect(t.isNodesEquivalent(file, cloned)).toBe(true);
  });

  it("should handle complex programs", function() {
    const program = "'use strict'; function lol() { wow();return 1; }";
    const node = parse(program);
    const cloned = t.cloneNode(node);
    expect(node).not.toBe(cloned);
    expect(t.isNodesEquivalent(node, cloned)).toBe(true);
  });

  it("should handle missing array element", function() {
    const node = parse("[,0]");
    const cloned = t.cloneNode(node);
    expect(node).not.toBe(cloned);
    expect(t.isNodesEquivalent(node, cloned)).toBe(true);
  });

  it("should support shallow cloning", function() {
    const node = t.memberExpression(t.identifier("foo"), t.identifier("bar"));
    const cloned = t.cloneNode(node, /* deep */ false);
    expect(node).not.toBe(cloned);
    expect(node.object).toBe(cloned.object);
    expect(node.property).toBe(cloned.property);
  });
});
