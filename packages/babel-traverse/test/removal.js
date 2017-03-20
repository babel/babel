import traverse from "../lib";
import assert from "assert";
import { parse } from "babylon";
import generate from "babel-generator";

function getPath(code) {
  const ast = parse(code);
  let path;
  traverse(ast, {
    Program: function (_path) {
      path = _path;
      _path.stop();
    },
  });

  return path;
}

function generateCode(path) {
  return generate(path.node).code;
}

describe("removal", function () {
  describe("ArrowFunction", function () {
    it("remove body", function () {
      const rootPath = getPath("x = () => b;");
      const path = rootPath.get("body")[0].get("expression").get("right");
      const body = path.get("body");
      body.remove();

      assert.equal(generateCode(rootPath), "x = () => {};", "body should be replaced with BlockStatement");
    });
  });

  describe("comment sharing", function () {
    function transpile(code) {
      const ast = parse(code);
      traverse(ast, {
        Identifier: function (path) {
          const node = path.node;
          if (node.name === "removeme") {
            path.remove();
          }
        },
      });

      return generate(ast.program).code;
    }

    it("fails to preserves comment when removed node is orphan", function () {
      const code = `/* top */
/* left */removeme;/* right */
/* bottom */`;
      const expected = "";
      const actual = transpile(code);
      assert.equal(actual, expected);
    });
    it("kinda preserves trailing comments when removed node only has a previous node", function () {
      const code = `previous;
/* top */
/* left */removeme;/* right */
/* bottom */`;
      const expected = "previous; /* top */ /* left */ /* right */ /* bottom */";
      const actual = transpile(code);
      assert.equal(actual, expected);
    });
    it("kinda preserves leading comments when removed node only has a next node", function () {
      const code = `/* top */
/* left */removeme;/* right */
/* bottom */
next;`;
      const expected = "/* top */ /* left */ /* right */ /* bottom */next;";
      const actual = transpile(code);
      assert.equal(actual, expected);
    });
    it("kinda preserves comments when removed node has both previous & next node", function () {
      const code = `previous;
/* top */
/* left */removeme;/* right */
/* bottom */
next;`;
      const expected = `previous; /* top */ /* left */
/* right */ /* bottom */next;`;
      const actual = transpile(code);
      assert.equal(actual, expected);
    });
  });
});
