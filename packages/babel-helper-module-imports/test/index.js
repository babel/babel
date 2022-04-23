import * as babel from "@babel/core";
import { fileURLToPath } from "url";
import path from "path";

import { ImportInjector } from "../lib/index.js";

const cwd = path.dirname(fileURLToPath(import.meta.url));

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

  const result = babel.transformSync(inputCode, {
    cwd,
    sourceType,
    filename: "example" + (sourceType === "module" ? ".mjs" : ".js"),
    babelrc: false,
    configFile: false,
    plugins: [
      function ({ types: t }) {
        return {
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

              const ref = initializer(manager, t);
              if (ref) path.pushContainer("body", t.expressionStatement(ref));
            },
          },
        };
      },
    ],
  });

  expect(result.code.replace(/\s+/g, " ").trim()).toBe(
    (expectedCode || "").replace(/\s+/g, " ").trim(),
  );
}
const testScript = test.bind(undefined, "script");
const testModule = test.bind(undefined, "module");

const addNamespace = opts => m => m.addNamespace("source", opts);
const addDefault = opts => m => m.addDefault("source", opts);
const addNamed = opts => m => m.addNamed("read", "source", opts);
const addSideEffect = opts => m => m.addSideEffect("source", opts);
const addMultiple = opts => (m, t) => {
  const refs = [];
  refs.push(m.addSideEffect("source", opts));
  refs.push(m.addNamespace("source", { nameHint: "ns", ...opts }));
  refs.push(m.addDefault("source", opts));
  refs.push(m.addNamed("read", "source", opts));
  return t.arrayExpression(refs);
};

describe("@babel/helper-module-imports", () => {
  describe("namespace import", () => {
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

  describe("multiple imports", () => {
    describe("loading an ES6 module", () => {
      const importedType = "es6";

      describe("using Node's interop", () => {
        const importingInterop = "node";

        it("should import", () => {
          testModule(
            { importingInterop, importedType },
            addMultiple(),
            `
              import * as _ns from "source";
              var _read = _ns.read;
              var _default = _ns.default;
              [, _ns, _default, _read];
            `,
          );
        });
      });

      describe("using Babel's interop", () => {
        const importingInterop = "babel";

        it("should import", () => {
          testModule(
            { importingInterop, importedType },
            addMultiple(),
            `
              import * as _ns from "source";
              var _read = _ns.read;
              var _default = _ns.default;
              [, _ns, _default, _read];
            `,
          );
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
            addMultiple(),
            `
              import _ns from "source";
              [, _ns, _ns, _ns.read];
            `,
          );
        });
      });

      describe("using Babel's interop", () => {
        const importingInterop = "babel";

        it("should import", () => {
          testModule(
            { importingInterop, importedInterop },
            addMultiple(),
            `
              import _ns, { read as _read } from "source";
              [, _ns, _ns, _read];
            `,
          );
        });
      });

      describe("using a CommonJS loader", () => {
        it("should import", () => {
          testScript(
            { importedInterop },
            addMultiple(),
            `
              var _read = require("source").read;
              var _default = require("source");
              var _ns = require("source");
              require("source");
              [, _ns, _default, _read];
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
            addMultiple(),
            `
              import _ns from "source";
              [, _ns, _ns.default, _ns.read];
            `,
          );
        });

        it("should import with a force-disabled context", () => {
          testModule(
            { importingInterop, importedInterop, ensureNoContext: true },
            addMultiple(),
            `
              import _ns from "source";
              [, _ns, (0, _ns.default), (0, _ns.read)];
            `,
          );
        });
      });

      describe("using Babel's interop", () => {
        const importingInterop = "babel";

        it("should import", () => {
          testModule(
            { importingInterop, importedInterop },
            addMultiple(),
            `
              import * as _ns from "source";
              var _read = _ns.read;
              var _default = _ns.default;
              [, _ns, _default, _read];
            `,
          );
        });
      });

      describe("using a CommonJS loader", () => {
        it("should import", () => {
          testScript(
            { importedInterop },
            addMultiple(),
            `
              var _read = require("source").read;
              var _default = require("source").default;
              var _ns = require("source");
              require("source");
              [, _ns, _default, _read];
            `,
          );
        });

        it("should import with force-enabled liveness", () => {
          testScript(
            { importedInterop, ensureLiveReference: true },
            addMultiple(),
            `
              var _source2 = require("source");
              var _source = require("source");
              var _ns = require("source");
              require("source");
              [, _ns, _source.default, _source2.read];

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
            addMultiple(),
            `
              import _source$es6Default from "source";
              var _source = babelHelpers.interopRequireDefault(_source$es6Default).default;
              var _ns = babelHelpers.interopRequireWildcard(_source$es6Default);
              [, _ns, _source, _source$es6Default.read];
            `,
          );
        });

        it("should import with force-enabled liveness", () => {
          testModule(
            { importingInterop, importedInterop, ensureLiveReference: true },
            addMultiple(),
            `
              import _source$es6Default from "source";
              var _source = babelHelpers.interopRequireDefault(_source$es6Default);
              var _ns = babelHelpers.interopRequireWildcard(_source$es6Default);
              [, _ns, _source.default, _source$es6Default.read];
            `,
          );
        });
      });

      describe("using Babel's interop", () => {
        const importingInterop = "babel";

        it("should import", () => {
          testModule(
            { importingInterop, importedInterop },
            addMultiple(),
            `
              import * as _ns from "source";
              var _read = _ns.read;
              var _default = _ns.default;
              [, _ns, _default, _read];
            `,
          );
        });
      });

      describe("using a CommonJS loader", () => {
        it("should import", () => {
          testScript(
            { importedInterop },
            addMultiple(),
            `
              var _read = require("source").read;
              var _default = babelHelpers.interopRequireDefault(require("source")).default;
              var _ns = babelHelpers.interopRequireWildcard(require("source"));
              require("source");
              [, _ns, _default, _read];
            `,
          );
        });

        it("should import with force-enabled liveness", () => {
          testScript(
            { importedInterop, ensureLiveReference: true },
            addMultiple(),
            `
              var _source2 = require("source");
              var _source = babelHelpers.interopRequireDefault(require("source"));
              var _ns = babelHelpers.interopRequireWildcard(require("source"));
              require("source");
              [, _ns, _source.default, _source2.read];
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
  });
});
