const assert = require("assert");
const helpers = require("./spec-test-helpers");

describe("spec Interop import", function () {
  const runner = new helpers.Runner();

  const fakeMod = { "fakeFs": true };
  runner.addToCache("fs", { module: { exports: fakeMod } });

  const exports = runner.transformAndRun(
    "import * as ns from 'fs'\nimport fs from 'fs'\nexport { fs, ns }\n"
  );

  describe("export descriptors", function () {
    describe("ns", function () {
      const nsDesc = Object.getOwnPropertyDescriptor(exports, "ns");

      it("is enumerable", function () {
        assert(nsDesc.enumerable);
      });

      it("is writable", function () {
        // This should be the actual observable behavior, but getters
        // are being used, which forbids setting writable.
        // Even if it was a value descriptor, freezing the export
        // forces the result of getOwnPropertyDescriptor to have writable: false
        // // assert(nsDesc.writable);
        this.skip();
      });

      it("happens to be a getter", function () {
        assert.strictEqual(typeof nsDesc.get, "function");
      });

      it("is not configurable", function () {
        assert(!nsDesc.configurable);
      });
    });

    describe("fs", function () {
      const fsDesc = Object.getOwnPropertyDescriptor(exports, "fs");

      it("is enumerable", function () {
        assert(fsDesc.enumerable);
      });

      it("is writable", function () {
        // fsDesc.writable cannot be true for the same reason nsDesc.writable could not
        // // assert(fsDesc.writable);
        this.skip();
      });

      it("happens to be a getter", function () {
        assert.strictEqual(typeof fsDesc.get, "function");
      });

      it("is not configurable", function () {
        assert(!fsDesc.configurable);
      });
    });
  });

  describe("synthetic namespace", function () {
    const ns = exports.ns;

    it("is frozen", function () {
      assert(Object.isFrozen(ns));
    });

    it("has a null prototype", function () {
      assert.strictEqual(Object.getPrototypeOf(ns), null);
    });

    it("is tagged as Module", function () {
      if (helpers.hasToStringTag()) {
        assert.strictEqual(ns[Symbol.toStringTag], "Module");
      } else {
        this.skip();
      }
    });

    it("has the __esModule flag", function () {
      assert.deepEqual(
        Object.getOwnPropertyDescriptor(ns, "__esModule"),
        { value: true, configurable: false, writable: false, enumerable: false }
      );
    });

    it("has no exports other than 'default'", function () {
      assert.deepEqual(Object.keys(ns), ["default"]);
    });

    describe("'default' descriptor", function () {
      const defaultDesc = Object.getOwnPropertyDescriptor(ns, "default");

      it("is enumerable", function () {
        assert(defaultDesc.enumerable);
      });
      it("is writable", function () {
        // Unfortunately, when the namespace is frozen, all value descriptors
        // returned by getOwnPropertyDescriptors have writable: false
        // // assert(defaultDesc.writable)
        this.skip();
      });
      it("happens to not be writable", function () {
        assert(!defaultDesc.writable);
      });
      it("has a value", function () {
        assert("value" in defaultDesc);
      });
    });
  });

  describe("ns export", function () {
    it("is not a Module", function () {
      assert(!("__esModule" in exports.ns.default));
    });
    it("is the original commonjs namespace", function () {
      assert.strictEqual(exports.ns.default, fakeMod);
    });
  });

  describe("fs reexport", function () {
    it("is the original commonjs namespace", function() {
      assert.strictEqual(exports.fs, fakeMod);
    });
  });
});
