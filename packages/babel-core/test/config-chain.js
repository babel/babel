import assert from "assert";
import fs from "fs";
import path from "path";
import { loadOptions } from "../lib";

function fixture(...args) {
  return path.join(__dirname, "fixtures", "config", ...args);
}

describe("buildConfigChain", function() {
  describe("test", () => {
    describe("single", () => {
      it("should process matching string values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          test: fixture("nonexistant-fake"),
          comments: true,
        });

        assert.equal(opts.comments, true);
      });

      it("should process matching RegExp values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          test: new RegExp(fixture("nonexistant-fake")),
          comments: true,
        });

        assert.equal(opts.comments, true);
      });

      it("should process matching function values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          test: p => p.indexOf(fixture("nonexistant-fake")) === 0,
          comments: true,
        });

        assert.equal(opts.comments, true);
      });

      it("should process non-matching string values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          test: fixture("nonexistant-fake-unknown"),
          comments: true,
        });

        assert.equal(opts.comments, undefined);
      });

      it("should process non-matching RegExp values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          test: new RegExp(fixture("nonexistant-unknown")),
          comments: true,
        });

        assert.equal(opts.comments, undefined);
      });

      it("should process non-matching function values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          test: p => p.indexOf(fixture("nonexistant-unknown")) === 0,
          comments: true,
        });

        assert.equal(opts.comments, undefined);
      });
    });

    describe("array", () => {
      it("should process matching string values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          test: [fixture("nonexistant-fake")],
          comments: true,
        });

        assert.equal(opts.comments, true);
      });

      it("should process matching RegExp values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          test: [new RegExp(fixture("nonexistant-fake"))],
          comments: true,
        });

        assert.equal(opts.comments, true);
      });

      it("should process matching function values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          test: [p => p.indexOf(fixture("nonexistant-fake")) === 0],
          comments: true,
        });

        assert.equal(opts.comments, true);
      });

      it("should process non-matching string values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          test: [fixture("nonexistant-fake-unknown")],
          comments: true,
        });

        assert.equal(opts.comments, undefined);
      });

      it("should process non-matching RegExp values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          test: [new RegExp(fixture("nonexistant-unknown"))],
          comments: true,
        });

        assert.equal(opts.comments, undefined);
      });

      it("should process non-matching function values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          test: [p => p.indexOf(fixture("nonexistant-unknown")) === 0],
          comments: true,
        });

        assert.equal(opts.comments, undefined);
      });
    });
  });

  describe("include", () => {
    describe("single", () => {
      it("should process matching string values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          include: fixture("nonexistant-fake"),
          comments: true,
        });

        assert.equal(opts.comments, true);
      });

      it("should process matching RegExp values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          include: new RegExp(fixture("nonexistant-fake")),
          comments: true,
        });

        assert.equal(opts.comments, true);
      });

      it("should process matching function values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          include: p => p.indexOf(fixture("nonexistant-fake")) === 0,
          comments: true,
        });

        assert.equal(opts.comments, true);
      });

      it("should process non-matching string values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          include: fixture("nonexistant-fake-unknown"),
          comments: true,
        });

        assert.equal(opts.comments, undefined);
      });

      it("should process non-matching RegExp values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          include: new RegExp(fixture("nonexistant-unknown")),
          comments: true,
        });

        assert.equal(opts.comments, undefined);
      });

      it("should process non-matching function values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          include: p => p.indexOf(fixture("nonexistant-unknown")) === 0,
          comments: true,
        });

        assert.equal(opts.comments, undefined);
      });
    });

    describe("array", () => {
      it("should process matching string values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          include: [fixture("nonexistant-fake")],
          comments: true,
        });

        assert.equal(opts.comments, true);
      });

      it("should process matching RegExp values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          include: [new RegExp(fixture("nonexistant-fake"))],
          comments: true,
        });

        assert.equal(opts.comments, true);
      });

      it("should process matching function values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          include: [p => p.indexOf(fixture("nonexistant-fake")) === 0],
          comments: true,
        });

        assert.equal(opts.comments, true);
      });

      it("should process non-matching string values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          include: [fixture("nonexistant-fake-unknown")],
          comments: true,
        });

        assert.equal(opts.comments, undefined);
      });

      it("should process non-matching RegExp values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          include: [new RegExp(fixture("nonexistant-unknown"))],
          comments: true,
        });

        assert.equal(opts.comments, undefined);
      });

      it("should process non-matching function values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          include: [p => p.indexOf(fixture("nonexistant-unknown")) === 0],
          comments: true,
        });

        assert.equal(opts.comments, undefined);
      });
    });
  });

  describe("exclude", () => {
    describe("single", () => {
      it("should process matching string values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          exclude: fixture("nonexistant-fake"),
          comments: true,
        });

        assert.equal(opts.comments, undefined);
      });

      it("should process matching RegExp values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          exclude: new RegExp(fixture("nonexistant-fake")),
          comments: true,
        });

        assert.equal(opts.comments, undefined);
      });

      it("should process matching function values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          exclude: p => p.indexOf(fixture("nonexistant-fake")) === 0,
          comments: true,
        });

        assert.equal(opts.comments, undefined);
      });

      it("should process non-matching string values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          exclude: fixture("nonexistant-fake-unknown"),
          comments: true,
        });

        assert.equal(opts.comments, true);
      });

      it("should process non-matching RegExp values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          exclude: new RegExp(fixture("nonexistant-unknown")),
          comments: true,
        });

        assert.equal(opts.comments, true);
      });

      it("should process non-matching function values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          exclude: p => p.indexOf(fixture("nonexistant-unknown")) === 0,
          comments: true,
        });

        assert.equal(opts.comments, true);
      });
    });

    describe("array", () => {
      it("should process matching string values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          exclude: [fixture("nonexistant-fake")],
          comments: true,
        });

        assert.equal(opts.comments, undefined);
      });

      it("should process matching RegExp values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          exclude: [new RegExp(fixture("nonexistant-fake"))],
          comments: true,
        });

        assert.equal(opts.comments, undefined);
      });

      it("should process matching function values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          exclude: [p => p.indexOf(fixture("nonexistant-fake")) === 0],
          comments: true,
        });

        assert.equal(opts.comments, undefined);
      });

      it("should process non-matching string values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          exclude: [fixture("nonexistant-fake-unknown")],
          comments: true,
        });

        assert.equal(opts.comments, true);
      });

      it("should process non-matching RegExp values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          exclude: [new RegExp(fixture("nonexistant-unknown"))],
          comments: true,
        });

        assert.equal(opts.comments, true);
      });

      it("should process non-matching function values", () => {
        const opts = loadOptions({
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          exclude: [p => p.indexOf(fixture("nonexistant-unknown")) === 0],
          comments: true,
        });

        assert.equal(opts.comments, true);
      });
    });
  });

  describe("ignore", () => {
    it("should ignore files that match", () => {
      const opts = loadOptions({
        filename: fixture("nonexistant-fake", "src.js"),
        babelrc: false,
        ignore: [
          fixture("nonexistant-fake", "src.js"),

          // We had a regression where multiple ignore patterns broke things, so
          // we keep some extra random items in here.
          fixture("nonexistant-fake", "other.js"),
          fixture("nonexistant-fake", "misc.js"),
        ],
      });

      assert.equal(opts, null);
    });

    it("should not ignore files that don't match", () => {
      const opts = loadOptions({
        filename: fixture("nonexistant-fake", "src.js"),
        babelrc: false,
        ignore: [
          fixture("nonexistant-fake", "other.js"),
          fixture("nonexistant-fake", "misc.js"),
        ],
      });

      assert.notEqual(opts, null);
    });
  });

  describe("only", () => {
    it("should ignore files that don't match", () => {
      const opts = loadOptions({
        filename: fixture("nonexistant-fake", "src.js"),
        babelrc: false,
        only: [
          fixture("nonexistant-fake", "other.js"),
          fixture("nonexistant-fake", "misc.js"),
        ],
      });

      assert.equal(opts, null);
    });

    it("should not ignore files that match", () => {
      const opts = loadOptions({
        filename: fixture("nonexistant-fake", "src.js"),
        babelrc: false,
        only: [
          fixture("nonexistant-fake", "src.js"),
          fixture("nonexistant-fake", "misc.js"),
        ],
      });

      assert.notEqual(opts, null);
    });
  });

  describe("ignore/only", () => {
    it("should ignore files that match ignore and don't match only", () => {
      const opts = loadOptions({
        filename: fixture("nonexistant-fake", "src.js"),
        babelrc: false,
        ignore: [fixture("nonexistant-fake", "src.js")],
        only: [],
      });

      assert.equal(opts, null);
    });

    it("should ignore files that match ignore and also only", () => {
      const opts = loadOptions({
        filename: fixture("nonexistant-fake", "src.js"),
        babelrc: false,
        ignore: [fixture("nonexistant-fake", "src.js")],
        only: [fixture("nonexistant-fake", "src.js")],
      });

      assert.equal(opts, null);
    });

    it("should not ignore files that match only and not ignore", () => {
      const opts = loadOptions({
        filename: fixture("nonexistant-fake", "src.js"),
        babelrc: false,
        only: [fixture("nonexistant-fake", "src.js")],
      });

      assert.notEqual(opts, null);
    });

    it("should not ignore files when no ignore/only are specified", () => {
      const opts = loadOptions({
        filename: fixture("nonexistant-fake", "src.js"),
        babelrc: false,
      });

      assert.notEqual(opts, null);
    });

    it("should allow negation of only", () => {
      const opts1 = loadOptions({
        filename: fixture("nonexistant-fake", "src.js"),
        babelrc: false,
        only: [
          "!" + fixture("nonexistant-fake"),
          fixture("nonexistant-fake", "other.js"),
        ],
      });
      assert.equal(opts1, null);

      const opts2 = loadOptions({
        filename: fixture("nonexistant-fake", "src.js"),
        babelrc: false,
        only: [
          "!" + fixture("nonexistant-fake"),
          fixture("nonexistant-fake", "src.js"),
        ],
      });
      assert.notEqual(opts2, null);

      const opts3 = loadOptions({
        filename: fixture("nonexistant-fake", "folder", "src.js"),
        babelrc: false,
        only: [
          "!" + fixture("nonexistant-fake"),
          fixture("nonexistant-fake", "folder"),
        ],
      });
      assert.notEqual(opts3, null);
    });

    it("should allow negation of ignore", () => {
      const opts1 = loadOptions({
        filename: fixture("nonexistant-fake", "src.js"),
        babelrc: false,
        ignore: [
          "!" + fixture("nonexistant-fake", "other.js"),
          fixture("nonexistant-fake"),
        ],
      });
      assert.equal(opts1, null);

      // Tests disabled pending https://github.com/babel/babel/issues/6907
      // const opts2 = loadOptions({
      //   filename: fixture("nonexistant-fake", "src.js"),
      //   babelrc: false,
      //   ignore: [
      //     "!" + fixture("nonexistant-fake", "src.js"),
      //     fixture("nonexistant-fake"),
      //   ],
      // });
      // assert.notEqual(opts2, null);
      //
      // const opts3 = loadOptions({
      //   filename: fixture("nonexistant-fake", "folder", "src.js"),
      //   babelrc: false,
      //   ignore: [
      //     "!" + fixture("nonexistant-fake", "folder"),
      //     fixture("nonexistant-fake"),
      //   ],
      // });
      // assert.notEqual(opts3, null);
    });
  });

  describe("caching", function() {
    describe("programmatic options", function() {
      const plugins1 = [() => ({})];
      const plugins2 = [() => ({})];

      it("should not cache the input options by identity", () => {
        const inputOpts = { plugins: plugins1 };

        const opts1 = loadOptions(inputOpts);

        inputOpts.plugins = plugins2;
        const opts2 = loadOptions(inputOpts);

        assert.equal(opts1.plugins.length, 1);
        assert.equal(opts2.plugins.length, 1);
        assert.notEqual(opts1.plugins[0], opts2.plugins[1]);
      });

      it("should cache the env plugins by identity", () => {
        const plugins = [() => ({})];

        const opts1 = loadOptions({
          envName: "foo",
          env: {
            foo: {
              plugins,
            },
          },
        });
        const opts2 = loadOptions({
          envName: "foo",
          env: {
            foo: {
              plugins,
            },
          },
        });

        assert.equal(opts1.plugins.length, 1);
        assert.equal(opts2.plugins.length, 1);
        assert.equal(opts1.plugins[0], opts2.plugins[0]);
      });

      it("should cache the env presets by identity", () => {
        const presets = [() => ({ plugins: [() => ({})] })];

        const opts1 = loadOptions({
          envName: "foo",
          env: {
            foo: {
              presets,
            },
          },
        });
        const opts2 = loadOptions({
          envName: "foo",
          env: {
            foo: {
              presets,
            },
          },
        });

        assert.equal(opts1.plugins.length, 1);
        assert.equal(opts2.plugins.length, 1);
        assert.equal(opts1.plugins[0], opts2.plugins[0]);
      });

      it("should cache the plugin options by identity", () => {
        const plugins = [() => ({})];

        const opts1 = loadOptions({ plugins });
        const opts2 = loadOptions({ plugins });

        assert.equal(opts1.plugins.length, 1);
        assert.equal(opts2.plugins.length, 1);
        assert.equal(opts1.plugins[0], opts2.plugins[0]);
      });

      it("should cache the presets options by identity", () => {
        const presets = [() => ({ plugins: [() => ({})] })];

        const opts1 = loadOptions({ presets });
        const opts2 = loadOptions({ presets });

        assert.equal(opts1.plugins.length, 1);
        assert.equal(opts2.plugins.length, 1);
        assert.strictEqual(opts1.plugins[0], opts2.plugins[0]);
      });

      it("should not cache the presets options with passPerPreset", () => {
        const presets = [() => ({ plugins: [() => ({})] })];

        const opts1 = loadOptions({ presets });
        const opts2 = loadOptions({ presets, passPerPreset: true });
        const opts3 = loadOptions({ presets, passPerPreset: false });

        assert.equal(opts1.plugins.length, 1);
        assert.equal(opts2.plugins.length, 0);
        assert.equal(opts3.plugins.length, 1);

        assert.strictEqual(opts1.plugins[0], opts3.plugins[0]);
      });
    });

    describe("config file options", function() {
      function touch(filepath) {
        const s = fs.statSync(filepath);
        fs.utimesSync(
          filepath,
          s.atime,
          s.mtime + Math.random() > 0.5 ? 1 : -1,
        );
      }

      it("should cache package.json files by mtime", () => {
        const filename = fixture(
          "complex-plugin-config",
          "config-identity",
          "pkg",
          "src.js",
        );
        const pkgJSON = fixture(
          "complex-plugin-config",
          "config-identity",
          "pkg",
          "package.json",
        );

        const opts1 = loadOptions({ filename });
        const opts2 = loadOptions({ filename });

        touch(pkgJSON);

        const opts3 = loadOptions({ filename });
        const opts4 = loadOptions({ filename });

        assert.equal(opts1.plugins.length, 1);
        assert.equal(opts2.plugins.length, 1);
        assert.equal(opts1.plugins[0], opts2.plugins[0]);

        assert.equal(opts3.plugins.length, 1);
        assert.equal(opts4.plugins.length, 1);
        assert.equal(opts3.plugins[0], opts4.plugins[0]);

        // Identity changed after touch().
        assert.notEqual(opts1.plugins[0], opts3.plugins[0]);
      });

      it("should cache .babelrc files by mtime", () => {
        const filename = fixture(
          "complex-plugin-config",
          "config-identity",
          "babelrc",
          "src.js",
        );
        const babelrcFile = fixture(
          "complex-plugin-config",
          "config-identity",
          "babelrc",
          ".babelrc",
        );

        const opts1 = loadOptions({ filename });
        const opts2 = loadOptions({ filename });

        touch(babelrcFile);

        const opts3 = loadOptions({ filename });
        const opts4 = loadOptions({ filename });

        assert.equal(opts1.plugins.length, 1);
        assert.equal(opts2.plugins.length, 1);
        assert.equal(opts1.plugins[0], opts2.plugins[0]);

        assert.equal(opts3.plugins.length, 1);
        assert.equal(opts4.plugins.length, 1);
        assert.equal(opts3.plugins[0], opts4.plugins[0]);

        // Identity changed after touch().
        assert.notEqual(opts1.plugins[0], opts3.plugins[0]);
      });

      it("should cache .babelrc.js files programmable behavior", () => {
        const filename = fixture(
          "complex-plugin-config",
          "config-identity",
          "babelrc-js",
          "src.js",
        );

        const opts1 = loadOptions({ filename });
        const opts2 = loadOptions({ filename });

        const opts3 = loadOptions({ filename, envName: "new-env" });
        const opts4 = loadOptions({ filename, envName: "new-env" });

        assert.equal(opts1.plugins.length, 1);
        assert.equal(opts2.plugins.length, 1);
        assert.equal(opts1.plugins[0], opts2.plugins[0]);

        assert.equal(opts3.plugins.length, 1);
        assert.equal(opts4.plugins.length, 1);
        assert.equal(opts3.plugins[0], opts4.plugins[0]);

        // Identity changed with different .env
        assert.notEqual(opts1.plugins[0], opts3.plugins[0]);
      });
    });
  });

  describe("overrides merging", () => {
    it("should apply matching overrides over base configs", () => {
      const opts = loadOptions({
        filename: fixture("nonexistant-fake", "src.js"),
        babelrc: false,
        comments: true,
        overrides: [
          {
            test: fixture("nonexistant-fake"),
            comments: false,
          },
        ],
      });

      assert.equal(opts.comments, false);
    });

    it("should not apply non-matching overrides over base configs", () => {
      const opts = loadOptions({
        filename: fixture("nonexistant-fake", "src.js"),
        babelrc: false,
        comments: true,
        overrides: [
          {
            test: fixture("nonexistant-unknown"),
            comments: false,
          },
        ],
      });

      assert.equal(opts.comments, true);
    });
  });

  describe("config files", () => {
    const getDefaults = () => ({
      babelrc: false,
      cwd: process.cwd(),
      envName: process.env.NODE_ENV,
      passPerPreset: false,
      plugins: [],
      presets: [],
    });

    it("should load .babelrc", () => {
      const filename = fixture("config-files", "babelrc", "src.js");

      assert.deepEqual(loadOptions({ filename }), {
        ...getDefaults(),
        filename,
        comments: true,
      });
    });

    it("should load .babelrc.js", () => {
      const filename = fixture("config-files", "babelrc-js", "src.js");

      assert.deepEqual(loadOptions({ filename }), {
        ...getDefaults(),
        filename,
        comments: true,
      });
    });

    it("should load package.json#babel", () => {
      const filename = fixture("config-files", "pkg", "src.js");

      assert.deepEqual(loadOptions({ filename }), {
        ...getDefaults(),
        filename,
        comments: true,
      });
    });

    it("should load .babelignore", () => {
      const filename = fixture("config-files", "babelignore", "src.js");

      assert.deepEqual(loadOptions({ filename }), null);
    });

    it("should throw if there are both .babelrc and .babelrc.js", () => {
      const filename = fixture("config-files", "both-babelrc", "src.js");

      assert.throws(
        () => loadOptions({ filename }),
        /Multiple configuration files found/,
      );
    });

    it("should throw if there are both .babelrc and package.json", () => {
      const filename = fixture("config-files", "pkg-babelrc", "src.js");

      assert.throws(
        () => loadOptions({ filename }),
        /Multiple configuration files found/,
      );
    });

    it("should throw if there are both .babelrc.js and package.json", () => {
      const filename = fixture("config-files", "pkg-babelrc-js", "src.js");

      assert.throws(
        () => loadOptions({ filename }),
        /Multiple configuration files found/,
      );
    });

    it("should ignore package.json without a 'babel' property", () => {
      const filename = fixture("config-files", "pkg-ignored", "src.js");

      assert.deepEqual(loadOptions({ filename }), {
        ...getDefaults(),
        filename,
        comments: true,
      });
    });

    it("should show helpful errors for .babelrc", () => {
      const filename = fixture("config-files", "babelrc-error", "src.js");

      assert.throws(
        () => loadOptions({ filename }),
        /Error while parsing config - /,
      );
    });

    it("should show helpful errors for .babelrc.js", () => {
      const filename = fixture("config-files", "babelrc-js-error", "src.js");

      assert.throws(() => loadOptions({ filename }), /Babelrc threw an error/);
    });

    it("should show helpful errors for package.json", () => {
      const filename = fixture("config-files", "pkg-error", "src.js");

      assert.throws(
        () => loadOptions({ filename }),
        /Error while parsing JSON - /,
      );
    });
  });
});
