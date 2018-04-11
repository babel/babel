import traverse from "../lib";
import { parse } from "babylon";

function getPath(code, options = { sourceType: "script" }) {
  const ast = parse(code, options);
  let path;
  traverse(ast, {
    Program: function(_path) {
      path = _path;
      _path.stop();
    },
  });
  return path;
}

describe("path/introspection", function() {
  describe("isInStrictMode", function() {
    describe("classes", function() {
      it("returns parent's strictness for class", function() {
        let program = getPath("class Test extends Super {}");
        let klass = program.get("body.0");
        expect(klass.isInStrictMode()).toBeFalsy();

        program = getPath(`"use strict"; class Test extends Super {}`);
        klass = program.get("body.0");
        expect(klass.isInStrictMode()).toBeTruthy();
      });

      it("returns true for class id", function() {
        const program = getPath("class Test extends Super {}");
        const id = program.get("body.0.id");
        expect(id.isInStrictMode()).toBeTruthy();
      });

      it("returns true for superClass", function() {
        const program = getPath("class Test extends Super {}");
        const superClass = program.get("body.0.superClass");
        expect(superClass.isInStrictMode()).toBeTruthy();
      });

      it("returns true for method", function() {
        const program = getPath("class Test { test() {} }");
        const method = program.get("body.0.body.body.0");
        expect(method.isInStrictMode()).toBeTruthy();
      });
    });

    describe("program", function() {
      describe("when script", function() {
        it("returns true when strict", function() {
          let program = getPath(`test;`);
          expect(program.isInStrictMode()).toBeFalsy();

          program = getPath(`"use strict";`);
          expect(program.isInStrictMode()).toBeTruthy();
        });
      });

      describe("when module", function() {
        it("returns true", function() {
          const program = getPath(`test;`, { sourceType: "module" });
          expect(program.isInStrictMode()).toBeTruthy();
        });
      });
    });

    describe("function", function() {
      it("returns parent's strictness for function", function() {
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

      it("returns function's strictness for id", function() {
        let program = getPath("function test(a) {}");
        let id = program.get("body.0.id");
        expect(id.isInStrictMode()).toBeFalsy();

        program = getPath(`function test(a) {"use strict";}`);
        id = program.get("body.0.id");
        expect(id.isInStrictMode()).toBeTruthy();
      });

      it("returns function's strictness for parameters", function() {
        let program = getPath("function test(a) {}");
        let param = program.get("body.0.params.0");
        expect(param.isInStrictMode()).toBeFalsy();

        program = getPath(`function test(a) {"use strict";}`);
        param = program.get("body.0.params.0");
        expect(param.isInStrictMode()).toBeTruthy();
      });
    });
  });
});
