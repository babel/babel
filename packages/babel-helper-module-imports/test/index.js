import * as babel from "@babel/core";
import { fileURLToPath } from "url";
import path from "path";

import { ImportInjector } from "../lib/index.js";

const cwd = path.dirname(fileURLToPath(import.meta.url));

function transform(sourceType, opts, initializer, inputCode) {
  return babel.transformSync(inputCode, {
    cwd,
    sourceType,
    filename: "example" + (sourceType === "module" ? ".mjs" : ".js"),
    babelrc: false,
    configFile: false,
    plugins: [
      function ({ types: t }) {
        return {
          manipulateOptions({ parserOpts }) {
            parserOpts.plugins.push("typescript");
          },
          pre(file) {
            file.set("helperGenerator", name =>
              t.memberExpression(
                t.identifier("babelHelpers"),
                t.identifier(name),
              ),
            );
          },
          visitor: {
            Program(path) {
              const manager = new ImportInjector(path, opts);

              const ref = initializer(manager);
              if (ref) path.pushContainer("body", t.expressionStatement(ref));
            },
          },
        };
      },
    ],
  }).code;
}

function test(sourceType, opts, initializer, inputCode, expectedCode) {
  if (typeof opts === "function") {
    expectedCode = inputCode;
    inputCode = initializer;
    initializer = opts;
    opts = null;
  }
  if (expectedCode === undefined) {
    expectedCode = inputCode;
    inputCode = "";
  }

  expect(
    transform(sourceType, opts, initializer, inputCode)
      .replace(/\s+/g, " ")
      .trim(),
  ).toBe((expectedCode || "").replace(/\s+/g, " ").trim());
}
const testScript = test.bind(undefined, "script");
const testModule = test.bind(undefined, "module");

describe("@babel/helper-module-imports", () => {
  describe("namespace import", () => {
    const addNamespace = opts => m => m.addNamespace("source", opts);

    describe("loading an ES6 module", () => {
      const importedType = "es6";

      describe("using Node's interop", () => {
        const importingInterop = "node";

        it("should import", () => {
          testModule(
            { importingInterop, importedType },
            addNamespace(),
            `
              import * as _source from "source";
              _source;
            `,
          );
        });

        it("should import with a name hint", () => {
          testModule(
            { importingInterop, importedType },
            addNamespace({ nameHint: "hintedName" }),
            `
              import * as _hintedName from "source";
              _hintedName;
            `,
          );
        });
      });

      describe("using Babel's interop", () => {
        const importingInterop = "babel";

        it("should import", () => {
          testModule(
            { importingInterop, importedType },
            addNamespace(),
            `
              import * as _source from "source";
              _source;
            `,
          );
        });
      });

      describe("using a CommonJS loader", () => {
        it("should import", () => {
          expect(() => {
            testScript({ importedType }, addNamespace());
          }).toThrow("Cannot import an ES6 module from CommonJS");
        });
      });
    });

    describe("loading CommonJS with 'uncompiled'", () => {
      const importedInterop = "uncompiled";

      describe("using Node's interop", () => {
        const importingInterop = "node";

        it("should import", () => {
          testModule(
            { importingInterop, importedInterop },
            addNamespace(),
            `
              import _source from "source";
              _source;
            `,
          );
        });
      });

      describe("using Babel's interop", () => {
        const importingInterop = "babel";

        it("should import", () => {
          testModule(
            { importingInterop, importedInterop },
            addNamespace(),
            `
              import _source from "source";
              _source;
            `,
          );
        });
      });

      describe("using a CommonJS loader", () => {
        it("should import", () => {
          testScript(
            { importedInterop },
            addNamespace(),
            `
              var _source = require("source");
              _source;
            `,
          );
        });
      });
    });

    describe("loading CommonJS with 'compiled'", () => {
      const importedInterop = "compiled";

      describe("using Node's interop", () => {
        const importingInterop = "node";

        it("should import", () => {
          testModule(
            { importingInterop, importedInterop },
            addNamespace(),
            `
              import _source from "source";
              _source;
            `,
          );
        });
      });

      describe("using Babel's interop", () => {
        const importingInterop = "babel";

        it("should import", () => {
          testModule(
            { importingInterop, importedInterop },
            addNamespace(),
            `
              import * as _source from "source";
              _source;
            `,
          );
        });
      });

      describe("using a CommonJS loader", () => {
        it("should import", () => {
          testScript(
            { importedInterop },
            addNamespace(),
            `
              var _source = require("source");
              _source;
            `,
          );
        });
      });
    });

    describe("loading CommonJS with 'babel'", () => {
      const importedInterop = "babel";

      describe("using Node's interop", () => {
        const importingInterop = "node";

        it("should import", () => {
          testModule(
            { importingInterop, importedInterop },
            addNamespace(),
            `
              import _source$es6Default from "source";
              var _source = babelHelpers.interopRequireWildcard(_source$es6Default);
              _source;
            `,
          );
        });
      });

      describe("using Babel's interop", () => {
        const importingInterop = "babel";

        it("should import", () => {
          testModule(
            { importingInterop, importedInterop },
            addNamespace(),
            `
              import * as _source from "source";
              _source;
            `,
          );
        });
      });

      describe("using a CommonJS loader", () => {
        it("should import", () => {
          testScript(
            { importedInterop },
            addNamespace(),
            `
              var _source = babelHelpers.interopRequireWildcard(require("source"));
              _source;
            `,
          );
        });
      });
    });
  });

  describe("default imports", () => {
    const addDefault = opts => m => m.addDefault("source", opts);

    describe("loading an ES6 module", () => {
      const importedType = "es6";

      describe("using Node's interop", () => {
        const importingInterop = "node";

        it("should import", () => {
          testModule(
            { importingInterop, importedType },
            addDefault(),
            `
              import _default from "source";
              _default;
            `,
          );
        });

        it("should import with a name hint", () => {
          testModule(
            { importingInterop, importedType },
            addDefault({ nameHint: "hintedName" }),
            `
              import _hintedName from "source";
              _hintedName;
            `,
          );
        });
      });

      describe("using Babel's interop", () => {
        const importingInterop = "babel";

        it("should import", () => {
          testModule(
            { importingInterop, importedType },
            addDefault(),
            `
              import _default from "source";
              _default;
            `,
          );
        });

        it("should import with a name hint", () => {
          testModule(
            { importingInterop, importedType },
            addDefault({ nameHint: "hintedName" }),
            `
              import _hintedName from "source";
              _hintedName;
            `,
          );
        });
      });

      describe("using a CommonJS loader", () => {
        it("should import", () => {
          expect(() => {
            testScript({ importedType }, addDefault());
          }).toThrow("Cannot import an ES6 module from CommonJS");
        });
      });
    });

    describe("loading CommonJS with 'uncompiled'", () => {
      const importedInterop = "uncompiled";

      describe("using Node's interop", () => {
        const importingInterop = "node";

        it("should import", () => {
          testModule(
            { importingInterop, importedInterop },
            addDefault(),
            `
              import _default from "source";
              _default;
            `,
          );
        });

        it("should import with a name hint", () => {
          testModule(
            { importingInterop, importedInterop },
            addDefault({ nameHint: "hintedName" }),
            `
              import _hintedName from "source";
              _hintedName;
            `,
          );
        });
      });

      describe("using Babel's interop", () => {
        const importingInterop = "babel";

        it("should import", () => {
          testModule(
            { importingInterop, importedInterop },
            addDefault(),
            `
              import _default from "source";
              _default;
            `,
          );
        });

        it("should import with a name hint", () => {
          testModule(
            { importingInterop, importedInterop },
            addDefault({ nameHint: "hintedName" }),
            `
              import _hintedName from "source";
              _hintedName;
            `,
          );
        });
      });

      describe("using a CommonJS loader", () => {
        it("should import", () => {
          testScript(
            { importedInterop },
            addDefault(),
            `
              var _default = require("source");
              _default;
            `,
          );
        });

        it("should import with a name hint", () => {
          testScript(
            { importedInterop },
            addDefault({ nameHint: "hintedName" }),
            `
              var _hintedName = require("source");
              _hintedName;
            `,
          );
        });

        it("should fail to import with force-enabled liveness", () => {
          expect(() => {
            testScript(
              { importedInterop, ensureLiveReference: true },
              addDefault(),
            );
          }).toThrow("No live reference for commonjs default");
        });
      });
    });

    describe("loading CommonJS with 'compiled'", () => {
      const importedInterop = "compiled";

      describe("using Node's interop", () => {
        const importingInterop = "node";

        it("should import", () => {
          testModule(
            { importingInterop, importedInterop },
            addDefault(),
            `
              import _source from "source";
              _source.default;
            `,
          );
        });

        it("should import with a force-disabled context", () => {
          testModule(
            { importingInterop, importedInterop, ensureNoContext: true },
            addDefault(),
            `
              import _source from "source";
              0, _source.default;
            `,
          );
        });
      });

      describe("using Babel's interop", () => {
        const importingInterop = "babel";

        it("should import", () => {
          testModule(
            { importingInterop, importedInterop },
            addDefault(),
            `
              import _default from "source";
              _default;
            `,
          );
        });

        it("should import with a name hint", () => {
          testModule(
            { importingInterop, importedInterop },
            addDefault({ nameHint: "hintedName" }),
            `
              import _hintedName from "source";
              _hintedName;
            `,
          );
        });
      });

      describe("using a CommonJS loader", () => {
        it("should import", () => {
          testScript(
            { importedInterop },
            addDefault(),
            `
              var _default = require("source").default;
              _default;
            `,
          );
        });

        it("should import with a name hint", () => {
          testScript(
            { importedInterop },
            addDefault({ nameHint: "hintedName" }),
            `
              var _hintedName = require("source").default;
              _hintedName;
            `,
          );
        });

        it("should import with force-enabled liveness", () => {
          testScript(
            { importedInterop, ensureLiveReference: true },
            addDefault(),
            `
              var _source = require("source");
              _source.default;
            `,
          );
        });
      });
    });

    describe("loading CommonJS with 'babel'", () => {
      const importedInterop = "babel";

      describe("using Node's interop", () => {
        const importingInterop = "node";

        it("should import", () => {
          testModule(
            { importingInterop, importedInterop },
            addDefault(),
            `
              import _source$es6Default from "source";
              var _source = babelHelpers.interopRequireDefault(_source$es6Default).default;
              _source;
            `,
          );
        });

        it("should import with a name hint", () => {
          testModule(
            { importingInterop, importedInterop },
            addDefault({ nameHint: "hintedName" }),
            `
              import _source$es6Default from "source";
              var _hintedName = babelHelpers.interopRequireDefault(_source$es6Default).default;
              _hintedName;
            `,
          );
        });

        it("should import with force-enabled liveness", () => {
          testModule(
            { importingInterop, importedInterop, ensureLiveReference: true },
            addDefault(),
            `
              import _source$es6Default from "source";
              var _source = babelHelpers.interopRequireDefault(_source$es6Default);
              _source.default;
            `,
          );
        });
      });

      describe("using Babel's interop", () => {
        const importingInterop = "babel";

        it("should import", () => {
          testModule(
            { importingInterop, importedInterop },
            addDefault(),
            `
              import _default from "source";
              _default;
            `,
          );
        });

        it("should import with a name hint", () => {
          testModule(
            { importingInterop, importedInterop },
            addDefault({ nameHint: "hintedName" }),
            `
              import _hintedName from "source";
              _hintedName;
            `,
          );
        });
      });

      describe("using a CommonJS loader", () => {
        it("should import", () => {
          testScript(
            { importedInterop },
            addDefault(),
            `
              var _default = babelHelpers.interopRequireDefault(require("source")).default;
              _default;
            `,
          );
        });

        it("should import with a name hint", () => {
          testScript(
            { importedInterop },
            addDefault({ nameHint: "hintedName" }),
            `
              var _hintedName = babelHelpers.interopRequireDefault(require("source")).default;
              _hintedName;
            `,
          );
        });

        it("should import with force-enabled liveness", () => {
          testScript(
            { importedInterop, ensureLiveReference: true },
            addDefault(),
            `
              var _source = babelHelpers.interopRequireDefault(require("source"));
              _source.default;
            `,
          );
        });
      });
    });
  });

  describe("named imports", () => {
    const addNamed = opts => m => m.addNamed("read", "source", opts);

    describe("loading an ES6 module", () => {
      const importedType = "es6";

      describe("using Node's interop", () => {
        const importingInterop = "node";

        it("should import", () => {
          testModule(
            { importingInterop, importedType },
            addNamed(),
            `
              import { read as _read } from "source";
              _read;
            `,
          );
        });

        it("should import with a name hint", () => {
          testModule(
            { importingInterop, importedType },
            addNamed({ nameHint: "hintedName" }),
            `
              import { read as _hintedName } from "source";
              _hintedName;
            `,
          );
        });
      });

      describe("using Babel's interop", () => {
        const importingInterop = "babel";

        it("should import", () => {
          testModule(
            { importingInterop, importedType },
            addNamed(),
            `
              import { read as _read } from "source";
              _read;
            `,
          );
        });

        it("should import with a name hint", () => {
          testModule(
            { importingInterop, importedType },
            addNamed({ nameHint: "hintedName" }),
            `
              import { read as _hintedName } from "source";
              _hintedName;
            `,
          );
        });
      });

      describe("using a CommonJS loader", () => {
        it("should import", () => {
          expect(() => {
            testScript({ importedType }, addNamed());
          }).toThrow("Cannot import an ES6 module from CommonJS");
        });
      });
    });

    describe("loading CommonJS with 'uncompiled'", () => {
      const importedInterop = "uncompiled";

      describe("using Node's interop", () => {
        const importingInterop = "node";

        it("should import", () => {
          testModule(
            { importingInterop, importedInterop },
            addNamed(),
            `
              import _source from "source";
              _source.read;
            `,
          );
        });

        it("should import with a force-disabled context", () => {
          testModule(
            { importingInterop, importedInterop, ensureNoContext: true },
            addNamed(),
            `
              import _source from "source";
              0, _source.read;
            `,
          );
        });
      });

      describe("using Babel's interop", () => {
        const importingInterop = "babel";

        it("should import", () => {
          testModule(
            { importingInterop, importedInterop },
            addNamed(),
            `
              import { read as _read } from "source";
              _read;
            `,
          );
        });

        it("should import with a name hint", () => {
          testModule(
            { importingInterop, importedInterop },
            addNamed({ nameHint: "hintedName" }),
            `
              import { read as _hintedName } from "source";
              _hintedName;
            `,
          );
        });
      });

      describe("using a CommonJS loader", () => {
        it("should import", () => {
          testScript(
            { importedInterop },
            addNamed(),
            `
              var _read = require("source").read;
              _read;
            `,
          );
        });

        it("should import with a name hint", () => {
          testScript(
            { importedInterop },
            addNamed({ nameHint: "hintedName" }),
            `
              var _hintedName = require("source").read;
              _hintedName;
            `,
          );
        });

        it("should import with force-enabled liveness", () => {
          testScript(
            { importedInterop, ensureLiveReference: true },
            addNamed(),
            `
              var _source = require("source");
              _source.read;
            `,
          );
        });
      });
    });

    describe("loading CommonJS with 'compiled'", () => {
      const importedInterop = "compiled";

      describe("using Node's interop", () => {
        const importingInterop = "node";

        it("should import", () => {
          testModule(
            { importingInterop, importedInterop },
            addNamed(),
            `
              import _source from "source";
              _source.read;
            `,
          );
        });

        it("should import with a force-disabled context", () => {
          testModule(
            { importingInterop, importedInterop, ensureNoContext: true },
            addNamed(),
            `
              import _source from "source";
              0, _source.read;
            `,
          );
        });
      });

      describe("using Babel's interop", () => {
        const importingInterop = "babel";

        it("should import", () => {
          testModule(
            { importingInterop, importedInterop },
            addNamed(),
            `
              import { read as _read } from "source";
              _read;
            `,
          );
        });

        it("should import with a name hint", () => {
          testModule(
            { importingInterop, importedInterop },
            addNamed({ nameHint: "hintedName" }),
            `
              import { read as _hintedName } from "source";
              _hintedName;
            `,
          );
        });
      });

      describe("using a CommonJS loader", () => {
        it("should import", () => {
          testScript(
            { importedInterop },
            addNamed(),
            `
              var _read = require("source").read;
              _read;
            `,
          );
        });

        it("should import with a name hint", () => {
          testScript(
            { importedInterop },
            addNamed({ nameHint: "hintedName" }),
            `
              var _hintedName = require("source").read;
              _hintedName;
            `,
          );
        });

        it("should import with force-enabled liveness", () => {
          testScript(
            { importedInterop, ensureLiveReference: true },
            addNamed(),
            `
              var _source = require("source");
              _source.read;
            `,
          );
        });
      });
    });

    describe("loading CommonJS with 'babel'", () => {
      const importedInterop = "babel";

      describe("using Node's interop", () => {
        const importingInterop = "node";

        it("should import", () => {
          testModule(
            { importingInterop, importedInterop },
            addNamed(),
            `
              import _source$es6Default from "source";
              _source$es6Default.read;
            `,
          );
        });
      });

      describe("using Babel's interop", () => {
        const importingInterop = "babel";

        it("should import", () => {
          testModule(
            { importingInterop, importedInterop },
            addNamed(),
            `
              import { read as _read } from "source";
              _read;
            `,
          );
        });

        it("should import with a name hint", () => {
          testModule(
            { importingInterop, importedInterop },
            addNamed({ nameHint: "hintedName" }),
            `
              import { read as _hintedName } from "source";
              _hintedName;
            `,
          );
        });
      });

      describe("using a CommonJS loader", () => {
        it("should import", () => {
          testScript(
            { importedInterop },
            addNamed(),
            `
              var _read = require("source").read;
              _read;
            `,
          );
        });

        it("should import with a name hint", () => {
          testScript(
            { importedInterop },
            addNamed({ nameHint: "hintedName" }),
            `
              var _hintedName = require("source").read;
              _hintedName;
            `,
          );
        });

        it("should import with force-enabled liveness", () => {
          testScript(
            { importedInterop, ensureLiveReference: true },
            addNamed(),
            `
              var _source = require("source");
              _source.read;
            `,
          );
        });
      });
    });
  });

  describe("side-effectful imports", () => {
    const addSideEffect = opts => m => m.addSideEffect("source", opts);

    describe("loading an ES6 module", () => {
      const importedType = "es6";

      describe("using Node's interop", () => {
        const importingInterop = "node";

        it("should import", () => {
          testModule(
            { importingInterop, importedType },
            addSideEffect(),
            `
              import "source";
            `,
          );
        });
      });

      describe("using Babel's interop", () => {
        const importingInterop = "babel";

        it("should import", () => {
          testModule(
            { importingInterop, importedType },
            addSideEffect(),
            `
              import "source";
            `,
          );
        });
      });

      describe("using a CommonJS loader", () => {
        it("should import", () => {
          expect(() => {
            testScript({ importedType }, addSideEffect());
          }).toThrow("Cannot import an ES6 module from CommonJS");
        });
      });
    });

    describe("loading CommonJS with 'uncompiled'", () => {
      const importedInterop = "uncompiled";

      describe("using Node's interop", () => {
        const importingInterop = "node";

        it("should import", () => {
          testModule(
            { importingInterop, importedInterop },
            addSideEffect(),
            `
              import "source";
            `,
          );
        });
      });

      describe("using Babel's interop", () => {
        const importingInterop = "babel";

        it("should import", () => {
          testModule(
            { importingInterop, importedInterop },
            addSideEffect(),
            `
              import "source";
            `,
          );
        });
      });

      describe("using a CommonJS loader", () => {
        it("should import", () => {
          testScript(
            { importedInterop },
            addSideEffect(),
            `
              require("source");
            `,
          );
        });
      });
    });

    describe("loading CommonJS with 'compiled'", () => {
      const importedInterop = "compiled";

      describe("using Node's interop", () => {
        const importingInterop = "node";

        it("should import", () => {
          testModule(
            { importingInterop, importedInterop },
            addSideEffect(),
            `
              import "source";
            `,
          );
        });
      });

      describe("using Babel's interop", () => {
        const importingInterop = "babel";

        it("should import", () => {
          testModule(
            { importingInterop, importedInterop },
            addSideEffect(),
            `
              import "source";
            `,
          );
        });
      });

      describe("using a CommonJS loader", () => {
        it("should import", () => {
          testScript(
            { importedInterop },
            addSideEffect(),
            `
              require("source");
            `,
          );
        });
      });
    });

    describe("loading CommonJS with 'babel'", () => {
      const importedInterop = "babel";

      describe("using Node's interop", () => {
        const importingInterop = "node";

        it("should import", () => {
          testModule(
            { importingInterop, importedInterop },
            addSideEffect(),
            `
              import "source";
            `,
          );
        });
      });

      describe("using Babel's interop", () => {
        const importingInterop = "babel";

        it("should import", () => {
          testModule(
            { importingInterop, importedInterop },
            addSideEffect(),
            `
              import "source";
            `,
          );
        });
      });

      describe("using a CommonJS loader", () => {
        it("should import", () => {
          testScript(
            { importedInterop },
            addSideEffect(),
            `
              require("source");
            `,
          );
        });
      });
    });
  });

  describe("importPosition: after", () => {
    it("works in ES modules", () => {
      testModule(
        { importPosition: "after" },
        m => m.addNamed("read", "source"),
        `
          import f from "foo";
          f();
          import b from "bar";
          b();
        `,
        `
          import f from "foo";
          f();
          import b from "bar";
          import { read as _read } from "source";
          b();
          _read;
        `,
      );
    });

    it("is disallowed in CJS modules", () => {
      expect(() =>
        testScript({ importPosition: "after" }, m =>
          m.addNamed("read", "source"),
        ),
      ).toThrow(`"importPosition": "after" is only supported in modules`);
    });

    describe("imports merging", () => {
      const opts = { importPosition: "after" };
      const addNamespace = m => void m.addNamespace("s", opts);
      const addDefault = m => void m.addDefault("s", opts);
      const addNamed = m => void m.addNamed("n", "s", opts);
      const addSideEffect = m => void m.addSideEffect("s", opts);

      it.each`
        input                                              | operation        | expected
        ${`import "s"`}                                    | ${addNamespace}  | ${`import * as _s from "s";`}
        ${`import x from "s"`}                             | ${addNamespace}  | ${`import x from "s"; import * as _s from "s";`}
        ${`import { x } from "s"`}                         | ${addNamespace}  | ${`import { x } from "s"; import * as _s from "s";`}
        ${`import * as x from "s"`}                        | ${addNamespace}  | ${`import * as x from "s"; import * as _s from "s";`}
        ${`import "s"`}                                    | ${addNamed}      | ${`import { n as _n } from "s";`}
        ${`import x from "s"`}                             | ${addNamed}      | ${`import x, { n as _n } from  "s";`}
        ${`import { x } from "s"`}                         | ${addNamed}      | ${`import { x, n as _n } from "s";`}
        ${`import x, { y } from "s"`}                      | ${addNamed}      | ${`import x, { y, n as _n } from  "s";`}
        ${`import * as x from "s"`}                        | ${addNamed}      | ${`import * as x from "s"; import { n as _n } from "s";`}
        ${`import { x } from "s"; import { y } from "s";`} | ${addNamed}      | ${`import { x, n as _n } from "s"; import { y } from "s";`}
        ${`import "s"`}                                    | ${addDefault}    | ${`import _default from "s";`}
        ${`import x from "s"`}                             | ${addDefault}    | ${`import x, { default as _default } from  "s";`}
        ${`import { x } from "s"`}                         | ${addDefault}    | ${`import _default, { x } from "s";`}
        ${`import x, { y } from "s"`}                      | ${addDefault}    | ${`import x, { y, default as _default } from  "s";`}
        ${`import * as x from "s"`}                        | ${addDefault}    | ${`import * as x from "s"; import _default from "s";`}
        ${`import "s"`}                                    | ${addSideEffect} | ${`import "s";`}
        ${`import x from "s"`}                             | ${addSideEffect} | ${`import x from "s";`}
        ${`import { x } from "s"`}                         | ${addSideEffect} | ${`import { x } from "s";`}
        ${`import * as x from "s"`}                        | ${addSideEffect} | ${`import * as x from "s";`}
        ${`import "u"; import type T from "s"`}            | ${addSideEffect} | ${`import "u"; import "s"; import type T from "s";`}
      `(
        "$operation.name works with `$input`",
        ({ input, operation, expected }) => {
          const out = transform(
            "module",
            { importingInterop: "babel", importedType: "es6" },
            operation,
            input,
          );
          expect(out.replace(/\s+/g, " ")).toBe(expected.replace(/\s+/g, " "));
        },
      );

      describe("ordering", () => {
        it("should try to merge imports", () => {
          testModule(
            { importingInterop: "babel", importedType: "es6" },
            m => {
              return babel.types.arrayExpression([
                m.addNamed("x", "modA", { importPosition: "after" }),
                m.addNamed("y", "modA", { importPosition: "after" }),
                m.addNamed("z", "modB", { importPosition: "after" }),
                m.addNamed("w", "modA", { importPosition: "after" }),
              ]);
            },
            `
              import { x as _x, y as _y, w as _w } from "modA";
              import { z as _z } from "modB";
              [_x, _y, _z, _w];
            `,
          );
        });

        it("with user imports", () => {
          testModule(
            { importingInterop: "babel", importedType: "es6" },
            m => {
              return babel.types.arrayExpression([
                m.addNamed("x", "modA", { importPosition: "after" }),
                m.addNamed("y", "modB", { importPosition: "after" }),
                m.addNamed("z", "modC", { importPosition: "after" }),
                m.addNamed("w", "modD", { importPosition: "after" }),
              ]);
            },
            `
              import { foo } from "modA";
              import bar from "modB";
              import * as baz from "modC";
              import "modD";
            `,
            `
              import { foo, x as _x } from "modA";
              import bar, { y as _y } from "modB";
              import * as baz from "modC";
              import { w as _w } from "modD";
              import { z as _z } from "modC";
              [_x, _y, _z, _w];
            `,
          );
        });

        it("with importPosition: before", () => {
          testModule(
            { importingInterop: "babel", importedType: "es6" },
            m => {
              return babel.types.arrayExpression([
                m.addNamed("x", "modA", { importPosition: "before" }),
                m.addNamed("y", "modB", { importPosition: "before" }),
                m.addNamed("z", "modC", { importPosition: "before" }),
              ]);
            },
            `
              import { foo } from "modA";
              import bar from "modB";
              import * as baz from "modC";
            `,
            `
              import { z as _z } from "modC";
              import { y as _y } from "modB";
              import { foo, x as _x } from "modA";
              import bar from "modB";
              import * as baz from "modC";
              [_x, _y, _z];
            `,
          );
        });
      });
    });
  });
});
