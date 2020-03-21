import * as t from "../lib";
import { parse } from "@babel/parser";

describe("validators", function () {
  describe("isNodesEquivalent", function () {
    it("should handle simple cases", function () {
      const mem = t.memberExpression(t.identifier("a"), t.identifier("b"));
      expect(t.isNodesEquivalent(mem, mem)).toBe(true);

      const mem2 = t.memberExpression(t.identifier("a"), t.identifier("c"));
      expect(t.isNodesEquivalent(mem, mem2)).toBe(false);
    });

    it("should handle full programs", function () {
      expect(t.isNodesEquivalent(parse("1 + 1"), parse("1+1"))).toBe(true);
      expect(t.isNodesEquivalent(parse("1 + 1"), parse("1+2"))).toBe(false);
    });

    it("should handle complex programs", function () {
      const program = "'use strict'; function lol() { wow();return 1; }";

      expect(t.isNodesEquivalent(parse(program), parse(program))).toBe(true);

      const program2 = "'use strict'; function lol() { wow();return -1; }";

      expect(t.isNodesEquivalent(parse(program), parse(program2))).toBe(false);
    });

    it("should handle nodes with object properties", function () {
      const original = t.templateElement({ raw: "\\'a", cooked: "'a" }, true);
      const identical = t.templateElement({ raw: "\\'a", cooked: "'a" }, true);
      const different = t.templateElement({ raw: "'a", cooked: "'a" }, true);
      expect(t.isNodesEquivalent(original, identical)).toBe(true);
      expect(t.isNodesEquivalent(original, different)).toBe(false);
    });

    it("rejects 'await' as an identifier", function () {
      expect(t.isValidIdentifier("await")).toBe(false);
    });
  });

  describe("isCompatTag", function () {
    it("should handle lowercase tag names", function () {
      expect(t.react.isCompatTag("div")).toBe(true);
      expect(t.react.isCompatTag("a")).toBe(true); // one letter
      expect(t.react.isCompatTag("h3")).toBe(true); // letters and numbers
    });

    it("should handle custom element tag names", function () {
      expect(t.react.isCompatTag("plastic-button")).toBe(true); // ascii letters
      expect(t.react.isCompatTag("math-α")).toBe(true); // non-latin chars
      expect(t.react.isCompatTag("img-viewer2")).toBe(true); // numbers
      expect(t.react.isCompatTag("emotion-😍")).toBe(true); // emoji
    });

    it("accepts trailing dash '-' in custom element tag names", function () {
      expect(t.react.isCompatTag("div-")).toBe(true);
      expect(t.react.isCompatTag("a-")).toBe(true);
      expect(t.react.isCompatTag("h3-")).toBe(true);
    });

    it("rejects empty or null tag names", function () {
      expect(t.react.isCompatTag(null)).toBe(false);
      expect(t.react.isCompatTag()).toBe(false);
      expect(t.react.isCompatTag(undefined)).toBe(false);
      expect(t.react.isCompatTag("")).toBe(false);
    });

    it("rejects tag names starting with an uppercase letter", function () {
      expect(t.react.isCompatTag("Div")).toBe(false);
      expect(t.react.isCompatTag("A")).toBe(false);
      expect(t.react.isCompatTag("H3")).toBe(false);
    });

    it("rejects all uppercase tag names", function () {
      expect(t.react.isCompatTag("DIV")).toBe(false);
      expect(t.react.isCompatTag("A")).toBe(false);
      expect(t.react.isCompatTag("H3")).toBe(false);
    });

    it("rejects leading dash '-'", function () {
      expect(t.react.isCompatTag("-div")).toBe(false);
      expect(t.react.isCompatTag("-a")).toBe(false);
      expect(t.react.isCompatTag("-h3")).toBe(false);
    });
  });

  describe("patterns", function () {
    it("allows nested pattern structures", function () {
      const pattern = t.objectPattern([
        t.objectProperty(
          t.identifier("a"),
          t.objectPattern([
            t.objectProperty(t.identifier("b"), t.identifier("foo")),
            t.objectProperty(
              t.identifier("c"),
              t.arrayPattern([t.identifier("value")]),
            ),
          ]),
        ),
      ]);

      expect(t.isNodesEquivalent(pattern, pattern)).toBe(true);
    });
  });

  describe("isReferenced", function () {
    it("returns false if node is a key of ObjectTypeProperty", function () {
      const node = t.identifier("a");
      const parent = t.objectTypeProperty(node, t.numberTypeAnnotation());

      expect(t.isReferenced(node, parent)).toBe(false);
    });

    it("returns true if node is a value of ObjectTypeProperty", function () {
      const node = t.identifier("a");
      const parent = t.objectTypeProperty(
        t.identifier("someKey"),
        t.genericTypeAnnotation(node),
      );

      expect(t.isReferenced(node, parent)).toBe(true);
    });

    it("returns true if node is a value of ObjectProperty of an expression", function () {
      const node = t.identifier("a");
      const parent = t.objectProperty(t.identifier("key"), node);
      const grandparent = t.objectExpression([parent]);

      expect(t.isReferenced(node, parent, grandparent)).toBe(true);
    });

    it("returns false if node is a value of ObjectProperty of a pattern", function () {
      const node = t.identifier("a");
      const parent = t.objectProperty(t.identifier("key"), node);
      const grandparent = t.objectPattern([parent]);

      expect(t.isReferenced(node, parent, grandparent)).toBe(false);
    });

    describe("TSPropertySignature", function () {
      it("returns false if node is a key", function () {
        // { A: string }
        const node = t.identifier("A");
        const parent = t.tsPropertySignature(
          node,
          t.tsTypeAnnotation(t.tsStringKeyword()),
        );

        expect(t.isReferenced(node, parent)).toBe(false);
      });

      it("returns true if node is a value", function () {
        // { someKey: A }
        const node = t.identifier("A");
        const parent = t.tsPropertySignature(
          t.identifier("someKey"),
          t.tsTypeAnnotation(t.tsTypeReference(node)),
        );

        expect(t.isReferenced(node, parent)).toBe(true);
      });
    });

    describe("TSEnumMember", function () {
      it("returns false if node is an id", function () {
        // enum X = { A };
        const node = t.identifier("A");
        const parent = t.tsEnumMember(node);

        expect(t.isReferenced(node, parent)).toBe(false);
      });

      it("returns true if node is a value", function () {
        // enum X = { Foo = A }
        const node = t.identifier("A");
        const parent = t.tsEnumMember(t.identifier("Foo"), node);

        expect(t.isReferenced(node, parent)).toBe(true);
      });
    });

    describe("ObjectMethod", function () {
      it("returns false if node is method key", function () {
        const node = t.identifier("A");
        const parent = t.objectMethod("method", node, [], t.blockStatement([]));

        expect(t.isReferenced(node, parent)).toBe(false);
      });

      it("returns true if node is computed method key", function () {
        const node = t.identifier("A");
        const parent = t.objectMethod(
          "method",
          node,
          [],
          t.blockStatement([]),
          true,
        );

        expect(t.isReferenced(node, parent)).toBe(true);
      });

      it("returns false if node is method param", function () {
        const node = t.identifier("A");
        const parent = t.objectMethod(
          "method",
          t.identifier("foo"),
          [node],
          t.blockStatement([]),
        );

        expect(t.isReferenced(node, parent)).toBe(false);
      });
    });

    describe("ClassMethod", function () {
      it("returns false if node is method key", function () {
        const node = t.identifier("A");
        const parent = t.classMethod("method", node, [], t.blockStatement([]));

        expect(t.isReferenced(node, parent)).toBe(false);
      });

      it("returns true if node is computed method key", function () {
        const node = t.identifier("A");
        const parent = t.classMethod(
          "method",
          node,
          [],
          t.blockStatement([]),
          true,
        );

        expect(t.isReferenced(node, parent)).toBe(true);
      });

      it("returns false if node is method param", function () {
        const node = t.identifier("A");
        const parent = t.classMethod(
          "method",
          t.identifier("foo"),
          [node],
          t.blockStatement([]),
        );

        expect(t.isReferenced(node, parent)).toBe(false);
      });
    });
  });

  describe("isBinding", function () {
    it("returns false if node id a value of ObjectProperty of an expression", function () {
      const node = t.identifier("a");
      const parent = t.objectProperty(t.identifier("key"), node);
      const grandparent = t.objectExpression([parent]);

      expect(t.isBinding(node, parent, grandparent)).toBe(false);
    });

    it("returns true if node id a value of ObjectProperty of a pattern", function () {
      const node = t.identifier("a");
      const parent = t.objectProperty(t.identifier("key"), node);
      const grandparent = t.objectPattern([parent]);

      expect(t.isBinding(node, parent, grandparent)).toBe(true);
    });
  });

  describe("isType", function () {
    it("returns true if nodeType equals targetType", function () {
      expect(t.isType("Identifier", "Identifier")).toBe(true);
    });
    it("returns false if targetType is a primary node type", function () {
      expect(t.isType("Expression", "ArrayExpression")).toBe(false);
    });
    it("returns true if targetType is an alias of nodeType", function () {
      expect(t.isType("ArrayExpression", "Expression")).toBe(true);
    });
    it("returns false if nodeType and targetType are unrelated", function () {
      expect(t.isType("ArrayExpression", "ClassBody")).toBe(false);
    });
    it("returns false if nodeType is undefined", function () {
      expect(t.isType(undefined, "Expression")).toBe(false);
    });
  });

  describe("placeholders", function () {
    describe("isPlaceholderType", function () {
      describe("when placeholderType is a specific node type", function () {
        const placeholder = "Identifier";

        it("returns true if targetType is placeholderType", function () {
          expect(t.isPlaceholderType(placeholder, "Identifier")).toBe(true);
        });
        it("returns true if targetType an alias for placeholderType", function () {
          expect(t.isPlaceholderType(placeholder, "Expression")).toBe(true);
        });
        it("returns false for unrelated types", function () {
          expect(t.isPlaceholderType(placeholder, "String")).toBe(false);
        });
      });

      describe("when placeholderType is a generic alias type", function () {
        const placeholder = "Pattern";

        it("returns true if targetType is placeholderType", function () {
          expect(t.isPlaceholderType(placeholder, "Pattern")).toBe(true);
        });
        it("returns true if targetType an alias for placeholderType", function () {
          expect(t.isPlaceholderType(placeholder, "LVal")).toBe(true);
        });
        it("returns false for unrelated types", function () {
          expect(t.isPlaceholderType(placeholder, "Expression")).toBe(false);
        });
        it("returns false if targetType is aliased by placeholderType", function () {
          // i.e. a Pattern might not be an Identifier
          expect(t.isPlaceholderType(placeholder, "Identifier")).toBe(false);
        });
      });
    });

    describe("is", function () {
      describe("when the placeholder matches a specific node", function () {
        const identifier = t.placeholder("Identifier", t.identifier("foo"));

        it("returns false if targetType is expectedNode", function () {
          expect(t.is("Identifier", identifier)).toBe(false);
        });
        it("returns true if targetType is an alias", function () {
          expect(t.is("LVal", identifier)).toBe(true);
        });
      });

      describe("when the placeholder matches a generic alias", function () {
        const pattern = t.placeholder("Pattern", t.identifier("bar"));

        it("returns false if targetType is aliased as expectedNode", function () {
          // i.e. a Pattern might not be an Identifier
          expect(t.is("Identifier", pattern)).toBe(false);
        });
        it("returns true if targetType is expectedNode", function () {
          expect(t.is("Pattern", pattern)).toBe(true);
        });
        it("returns true if targetType is an alias for expectedNode", function () {
          expect(t.is("LVal", pattern)).toBe(true);
        });
      });
    });

    describe("is[Type]", function () {
      describe("when the placeholder matches a specific node", function () {
        const identifier = t.placeholder("Identifier", t.identifier("foo"));

        it("returns false if targetType is expectedNode", function () {
          expect(t.isIdentifier(identifier)).toBe(false);
        });
        it("returns true if targetType is an alias", function () {
          expect(t.isLVal(identifier)).toBe(true);
        });
      });

      describe("when the placeholder matches a generic alias", function () {
        const pattern = t.placeholder("Pattern", t.identifier("bar"));

        it("returns false if targetType is aliased as expectedNode", function () {
          expect(t.isIdentifier(pattern)).toBe(false);
        });
        it("returns true if targetType is expectedNode", function () {
          expect(t.isPattern(pattern)).toBe(true);
        });
        it("returns true if targetType is an alias for expectedNode", function () {
          expect(t.isLVal(pattern)).toBe(true);
        });
      });
    });
  });
});
