import chai from "chai";
import * as babel from "@babel/core";

import { ImportInjector } from "../";

function test(sourceType, opts, initializer, expectedCode) {
  if (typeof opts === "function") {
    expectedCode = initializer;
    initializer = opts;
    opts = null;
  }

  const result = babel.transform("", {
    sourceType,
    filename: "example" + (sourceType === "module" ? ".mjs" : ".js"),
    babelrc: false,
    plugins: [
      function({ types: t }) {
        return {
          pre(file) {
            file.set("helpersNamespace", t.identifier("babelHelpers"));
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
  });

  chai
    .expect(result.code.replace(/\s+/g, " ").trim())
    .to.equal((expectedCode || "").replace(/\s+/g, " ").trim());
}
const testScript = test.bind(undefined, "script");
const testModule = test.bind(undefined, "module");

describe("babel-helper-module-imports", () => {
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
              import * as _namespace from "source";
              _namespace;
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
              import * as _namespace from "source";
              _namespace;
            `,
          );
        });
      });

      describe("using a CommonJS loader", () => {
        it("should import", () => {
          chai
            .expect(() => {
              testScript({ importedType }, addNamespace());
            })
            .to.throw(Error, "Cannot import an ES6 module from CommonJS");
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
              import _namespace from "source";
              _namespace;
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
              import _namespace from "source";
              _namespace;
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
              var _namespace = require("source");
              _namespace;
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
              import _namespace from "source";
              _namespace;
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
              import * as _namespace from "source";
              _namespace;
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
              var _namespace = require("source");
              _namespace;
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
            import _es6Default from "source";
              var _namespace = babelHelpers.interopRequireWildcard(_es6Default);
              _namespace;
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
              import * as _namespace from "source";
              _namespace;
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
              var _namespace = babelHelpers.interopRequireWildcard(require("source"));
              _namespace;
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
          chai
            .expect(() => {
              testScript({ importedType }, addDefault());
            })
            .to.throw(Error, "Cannot import an ES6 module from CommonJS");
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
          chai
            .expect(() => {
              testScript(
                { importedInterop, ensureLiveReference: true },
                addDefault(),
              );
            })
            .to.throw(Error, "No live reference for commonjs default");
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
              import _namespace from "source";
              _namespace.default;
            `,
          );
        });

        it("should import with a force-disabled context", () => {
          testModule(
            { importingInterop, importedInterop, ensureNoContext: true },
            addDefault(),
            `
              import _namespace from "source";
              0, _namespace.default;
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
              var _namespace = require("source");
              _namespace.default;
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
              import _es6Default from "source";
              var _default = babelHelpers.interopRequireDefault(_es6Default).default;
              _default;
            `,
          );
        });

        it("should import with a name hint", () => {
          testModule(
            { importingInterop, importedInterop },
            addDefault({ nameHint: "hintedName" }),
            `
              import _es6Default from "source";
              var _hintedName = babelHelpers.interopRequireDefault(_es6Default).default;
              _hintedName;
            `,
          );
        });

        it("should import with force-enabled liveness", () => {
          testModule(
            { importingInterop, importedInterop, ensureLiveReference: true },
            addDefault(),
            `
              import _es6Default from "source";
              var _namespace = babelHelpers.interopRequireDefault(_es6Default);
              _namespace.default;
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
              var _namespace = babelHelpers.interopRequireDefault(require("source"));
              _namespace.default;
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
          chai
            .expect(() => {
              testScript({ importedType }, addNamed());
            })
            .to.throw(Error, "Cannot import an ES6 module from CommonJS");
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
              import _namespace from "source";
              _namespace.read;
            `,
          );
        });

        it("should import with a force-disabled context", () => {
          testModule(
            { importingInterop, importedInterop, ensureNoContext: true },
            addNamed(),
            `
              import _namespace from "source";
              0, _namespace.read;
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
              var _namespace = require("source");
              _namespace.read;
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
              import _namespace from "source";
              _namespace.read;
            `,
          );
        });

        it("should import with a force-disabled context", () => {
          testModule(
            { importingInterop, importedInterop, ensureNoContext: true },
            addNamed(),
            `
              import _namespace from "source";
              0, _namespace.read;
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
              var _namespace = require("source");
              _namespace.read;
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
              import _es6Default from "source";
              _es6Default.read;
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
              var _namespace = require("source");
              _namespace.read;
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
          chai
            .expect(() => {
              testScript({ importedType }, addSideEffect());
            })
            .to.throw(Error, "Cannot import an ES6 module from CommonJS");
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
});
