import { parse } from "@babel/parser";

import _traverse from "../lib/index.js";
const traverse = _traverse.default || _traverse;

function getPath(code, options = { sourceType: "script" }) {
  const ast = parse(code, options);
  let path;
  traverse(ast, {
    Program: function (_path) {
      path = _path;
      _path.stop();
    },
  });
  return path;
}

describe("path/introspection", function () {
  describe("isInStrictMode", function () {
    describe("classes", function () {
      it("returns parent's strictness for class", function () {
        let program = getPath("class Test extends Super {}");
        let klass = program.get("body.0");
        expect(klass.isInStrictMode()).toBeFalsy();

        program = getPath(`"use strict"; class Test extends Super {}`);
        klass = program.get("body.0");
        expect(klass.isInStrictMode()).toBeTruthy();
      });

      it("returns true for class id", function () {
        const program = getPath("class Test extends Super {}");
        const id = program.get("body.0.id");
        expect(id.isInStrictMode()).toBeTruthy();
      });

      it("returns true for superClass", function () {
        const program = getPath("class Test extends Super {}");
        const superClass = program.get("body.0.superClass");
        expect(superClass.isInStrictMode()).toBeTruthy();
      });

      it("returns true for method", function () {
        const program = getPath("class Test { test() {} }");
        const method = program.get("body.0.body.body.0");
        expect(method.isInStrictMode()).toBeTruthy();
      });
    });

    describe("program", function () {
      describe("when script", function () {
        it("returns true when strict", function () {
          let program = getPath(`test;`);
          expect(program.isInStrictMode()).toBeFalsy();

          program = getPath(`"use strict";`);
          expect(program.isInStrictMode()).toBeTruthy();
        });
      });

      describe("when module", function () {
        it("returns true", function () {
          const program = getPath(`test;`, { sourceType: "module" });
          expect(program.isInStrictMode()).toBeTruthy();
        });
      });
    });

    describe("function", function () {
      it("returns parent's strictness for function", function () {
        let program = getPath("function test() {}");
        let fn = program.get("body.0");
        expect(fn.isInStrictMode()).toBeFalsy();

        program = getPath(`function test() {"use strict";}`);
        fn = program.get("body.0");
        expect(fn.isInStrictMode()).toBeFalsy();

        program = getPath(`"use strict"; function test() {}`);
        fn = program.get("body.0");
        expect(fn.isInStrictMode()).toBeTruthy();
      });

      it("returns function's strictness for id", function () {
        let program = getPath("function test(a) {}");
        let id = program.get("body.0.id");
        expect(id.isInStrictMode()).toBeFalsy();

        program = getPath(`function test(a) {"use strict";}`);
        id = program.get("body.0.id");
        expect(id.isInStrictMode()).toBeTruthy();
      });

      it("returns function's strictness for parameters", function () {
        let program = getPath("function test(a) {}");
        let param = program.get("body.0.params.0");
        expect(param.isInStrictMode()).toBeFalsy();

        program = getPath(`function test(a) {"use strict";}`);
        param = program.get("body.0.params.0");
        expect(param.isInStrictMode()).toBeTruthy();
      });
    });
  });

  describe("referencesImport", function () {
    it("accepts a default import", function () {
      const program = getPath(`import dep from "source"; dep;`, {
        sourceType: "module",
      });
      const reference = program.get("body.1.expression");
      expect(reference.referencesImport("source", "default")).toBe(true);
    });
    it("rejects a default import from the wrong module", function () {
      const program = getPath(`import dep from "wrong-source"; dep;`, {
        sourceType: "module",
      });
      const reference = program.get("body.1.expression");
      expect(reference.referencesImport("source", "default")).toBe(false);
    });
    it("rejects a named instead of default import", function () {
      const program = getPath(`import { dep } from "source"; dep;`, {
        sourceType: "module",
      });
      const reference = program.get("body.1.expression");
      expect(reference.referencesImport("source", "default")).toBe(false);
    });

    it("accepts a named import", function () {
      const program = getPath(`import { dep } from "source"; dep;`, {
        sourceType: "module",
      });
      const reference = program.get("body.1.expression");
      expect(reference.referencesImport("source", "dep")).toBe(true);
    });
    it("accepts an aliased named import", function () {
      const program = getPath(`import { dep as alias } from "source"; alias;`, {
        sourceType: "module",
      });
      const reference = program.get("body.1.expression");
      expect(reference.referencesImport("source", "dep")).toBe(true);
    });
    it("accepts a named import via a namespace import member expression", function () {
      const program = getPath(`import * as ns from "source"; ns.dep;`, {
        sourceType: "module",
      });
      const reference = program.get("body.1.expression");
      expect(reference.referencesImport("source", "dep")).toBe(true);
    });
    it("accepts a named import via a namespace import optional member expression", function () {
      const program = getPath(`import * as ns from "source"; ns?.dep;`, {
        sourceType: "module",
      });
      const reference = program.get("body.1.expression");
      expect(reference.referencesImport("source", "dep")).toBe(true);
    });
    it("accepts a named import via a namespace import computed member expression", function () {
      const program = getPath(`import * as ns from "source"; ns["😅"];`, {
        sourceType: "module",
      });
      const reference = program.get("body.1.expression");
      expect(reference.referencesImport("source", "😅")).toBe(true);
    });
    it("accepts a named import via a namespace import jsx member expression", function () {
      const program = getPath(`import * as ns from "source"; <ns.dep />;`, {
        sourceType: "module",
        plugins: ["jsx"],
      });
      const reference = program.get("body.1.expression.openingElement.name");
      expect(reference.referencesImport("source", "dep")).toBe(true);
    });
    it("rejects a named import from the wrong module", function () {
      const program = getPath(`import { dep } from "wrong-source"; dep;`, {
        sourceType: "module",
      });
      const reference = program.get("body.1.expression");
      expect(reference.referencesImport("source", "dep")).toBe(false);
    });
    it("rejects a default instead of named import", function () {
      const program = getPath(`import dep from "source"; dep;`, {
        sourceType: "module",
      });
      const reference = program.get("body.1.expression");
      expect(reference.referencesImport("source", "dep")).toBe(false);
    });
    it('rejects the "export called *" trick', function () {
      const program = getPath(`import * as ns from "source"; ns["*"].nested;`, {
        sourceType: "module",
      });
      const reference = program.get("body.1.expression");
      expect(reference.referencesImport("source", "nested")).toBe(false);
    });

    it("accepts a namespace import", function () {
      const program = getPath(`import * as dep from "source"; dep;`, {
        sourceType: "module",
      });
      const reference = program.get("body.1.expression");
      expect(reference.referencesImport("source", "*")).toBe(true);
    });
    it("rejects a namespace import from the wrong module", function () {
      const program = getPath(`import * as dep from "wrong-source"; dep;`, {
        sourceType: "module",
      });
      const reference = program.get("body.1.expression");
      expect(reference.referencesImport("source", "*")).toBe(false);
    });
    it("rejects a default instead of a namespace import", () => {
      const program = getPath(`import dep from "source"; dep;`, {
        sourceType: "module",
      });
      const reference = program.get("body.1.expression");
      expect(reference.referencesImport("source", "*")).toBe(false);
    });
  });

  describe("_guessExecutionStatusRelativeTo", function () {
    it("works with paths in function expressions", () => {
      const program = getPath(`
        a;
        f(() => b);
        c;
      `);
      const a = program.get("body.0.expression");
      const b = program.get("body.1.expression.arguments.0.body");
      const c = program.get("body.2.expression");

      expect(a._guessExecutionStatusRelativeTo(b)).toBe("before");
      expect(c._guessExecutionStatusRelativeTo(b)).toBe("unknown");
    });
  });
});
