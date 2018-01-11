import * as t from "../lib";
import assert from "assert";
import { parse } from "babylon";

suite("cloneNode", function() {
  it("should handle undefined", function() {
    const node = undefined;
    const cloned = t.cloneNode(node);
    assert(cloned === undefined);
  });

  it("should handle null", function() {
    const node = null;
    const cloned = t.cloneNode(node);
    assert(cloned === null);
  });

  it("should handle simple cases", function() {
    const node = t.identifier("a");
    const cloned = t.cloneNode(node);
    assert(node !== cloned);
    assert(t.isNodesEquivalent(node, cloned) === true);
  });

  it("should handle full programs", function() {
    const file = parse("1 + 1");
    const cloned = t.cloneNode(file);
    assert(file !== cloned);
    assert(
      file.program.body[0].expression.right !==
        cloned.program.body[0].expression.right,
    );
    assert(
      file.program.body[0].expression.left !==
        cloned.program.body[0].expression.left,
    );
    assert(t.isNodesEquivalent(file, cloned) === true);
  });

  it("should handle complex programs", function() {
    const program = "'use strict'; function lol() { wow();return 1; }";
    const node = parse(program);
    const cloned = t.cloneNode(node);
    assert(node !== cloned);
    assert(t.isNodesEquivalent(node, cloned) === true);
  });

  it("should handle missing array element", function() {
    const node = parse("[,0]");
    const cloned = t.cloneNode(node);
    assert(node !== cloned);
    assert(t.isNodesEquivalent(node, cloned) === true);
  });

  it("should support shallow cloning", function() {
    const node = t.memberExpression(t.identifier("foo"), t.identifier("bar"));
    const cloned = t.cloneNode(node, /* deep */ false);
    assert.notStrictEqual(node, cloned);
    assert.strictEqual(node.object, cloned.object);
    assert.strictEqual(node.property, cloned.property);
  });
});
