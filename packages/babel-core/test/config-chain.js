import fs from "fs";
import path from "path";
import { loadOptions as loadOptionsOrig } from "../lib";

function fixture(...args) {
  return path.join(__dirname, "fixtures", "config", ...args);
}

function loadOptions(opts) {
  return loadOptionsOrig({
    cwd: __dirname,
    ...opts,
  });
}

describe("buildConfigChain", function() {
  describe("test", () => {
    describe("single", () => {
      it("should process matching string values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          test: fixture("nonexistant-fake"),
          comments: true,
        });

        expect(opts.comments).toBe(true);
      });

      it("should process matching RegExp values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          test: new RegExp(fixture("nonexistant-fake")),
          comments: true,
        });

        expect(opts.comments).toBe(true);
      });

      it("should process matching function values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          test: p => p.indexOf(fixture("nonexistant-fake")) === 0,
          comments: true,
        });

        expect(opts.comments).toBe(true);
      });

      it("should process non-matching string values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          test: fixture("nonexistant-fake-unknown"),
          comments: true,
        });

        expect(opts.comments).toBeUndefined();
      });

      it("should process non-matching RegExp values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          test: new RegExp(fixture("nonexistant-unknown")),
          comments: true,
        });

        expect(opts.comments).toBeUndefined();
      });

      it("should process non-matching function values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          test: p => p.indexOf(fixture("nonexistant-unknown")) === 0,
          comments: true,
        });

        expect(opts.comments).toBeUndefined();
      });
    });

    describe("array", () => {
      it("should process matching string values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          test: [fixture("nonexistant-fake")],
          comments: true,
        });

        expect(opts.comments).toBe(true);
      });

      it("should process matching RegExp values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          test: [new RegExp(fixture("nonexistant-fake"))],
          comments: true,
        });

        expect(opts.comments).toBe(true);
      });

      it("should process matching function values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          test: [p => p.indexOf(fixture("nonexistant-fake")) === 0],
          comments: true,
        });

        expect(opts.comments).toBe(true);
      });

      it("should process non-matching string values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          test: [fixture("nonexistant-fake-unknown")],
          comments: true,
        });

        expect(opts.comments).toBeUndefined();
      });

      it("should process non-matching RegExp values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          test: [new RegExp(fixture("nonexistant-unknown"))],
          comments: true,
        });

        expect(opts.comments).toBeUndefined();
      });

      it("should process non-matching function values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          test: [p => p.indexOf(fixture("nonexistant-unknown")) === 0],
          comments: true,
        });

        expect(opts.comments).toBeUndefined();
      });
    });
  });

  describe("include", () => {
    describe("single", () => {
      it("should process matching string values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          include: fixture("nonexistant-fake"),
          comments: true,
        });

        expect(opts.comments).toBe(true);
      });

      it("should process matching RegExp values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          include: new RegExp(fixture("nonexistant-fake")),
          comments: true,
        });

        expect(opts.comments).toBe(true);
      });

      it("should process matching function values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          include: p => p.indexOf(fixture("nonexistant-fake")) === 0,
          comments: true,
        });

        expect(opts.comments).toBe(true);
      });

      it("should process non-matching string values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          include: fixture("nonexistant-fake-unknown"),
          comments: true,
        });

        expect(opts.comments).toBeUndefined();
      });

      it("should process non-matching RegExp values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          include: new RegExp(fixture("nonexistant-unknown")),
          comments: true,
        });

        expect(opts.comments).toBeUndefined();
      });

      it("should process non-matching function values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          include: p => p.indexOf(fixture("nonexistant-unknown")) === 0,
          comments: true,
        });

        expect(opts.comments).toBeUndefined();
      });
    });

    describe("array", () => {
      it("should process matching string values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          include: [fixture("nonexistant-fake")],
          comments: true,
        });

        expect(opts.comments).toBe(true);
      });

      it("should process matching RegExp values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          include: [new RegExp(fixture("nonexistant-fake"))],
          comments: true,
        });

        expect(opts.comments).toBe(true);
      });

      it("should process matching function values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          include: [p => p.indexOf(fixture("nonexistant-fake")) === 0],
          comments: true,
        });

        expect(opts.comments).toBe(true);
      });

      it("should process non-matching string values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          include: [fixture("nonexistant-fake-unknown")],
          comments: true,
        });

        expect(opts.comments).toBeUndefined();
      });

      it("should process non-matching RegExp values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          include: [new RegExp(fixture("nonexistant-unknown"))],
          comments: true,
        });

        expect(opts.comments).toBeUndefined();
      });

      it("should process non-matching function values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          include: [p => p.indexOf(fixture("nonexistant-unknown")) === 0],
          comments: true,
        });

        expect(opts.comments).toBeUndefined();
      });
    });
  });

  describe("exclude", () => {
    describe("single", () => {
      it("should process matching string values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          exclude: fixture("nonexistant-fake"),
          comments: true,
        });

        expect(opts.comments).toBeUndefined();
      });

      it("should process matching RegExp values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          exclude: new RegExp(fixture("nonexistant-fake")),
          comments: true,
        });

        expect(opts.comments).toBeUndefined();
      });

      it("should process matching function values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          exclude: p => p.indexOf(fixture("nonexistant-fake")) === 0,
          comments: true,
        });

        expect(opts.comments).toBeUndefined();
      });

      it("should process non-matching string values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          exclude: fixture("nonexistant-fake-unknown"),
          comments: true,
        });

        expect(opts.comments).toBe(true);
      });

      it("should process non-matching RegExp values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          exclude: new RegExp(fixture("nonexistant-unknown")),
          comments: true,
        });

        expect(opts.comments).toBe(true);
      });

      it("should process non-matching function values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          exclude: p => p.indexOf(fixture("nonexistant-unknown")) === 0,
          comments: true,
        });

        expect(opts.comments).toBe(true);
      });
    });

    describe("array", () => {
      it("should process matching string values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          exclude: [fixture("nonexistant-fake")],
          comments: true,
        });

        expect(opts.comments).toBeUndefined();
      });

      it("should process matching RegExp values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          exclude: [new RegExp(fixture("nonexistant-fake"))],
          comments: true,
        });

        expect(opts.comments).toBeUndefined();
      });

      it("should process matching function values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          exclude: [p => p.indexOf(fixture("nonexistant-fake")) === 0],
          comments: true,
        });

        expect(opts.comments).toBeUndefined();
      });

      it("should process non-matching string values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          exclude: [fixture("nonexistant-fake-unknown")],
          comments: true,
        });

        expect(opts.comments).toBe(true);
      });

      it("should process non-matching RegExp values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          exclude: [new RegExp(fixture("nonexistant-unknown"))],
          comments: true,
        });

        expect(opts.comments).toBe(true);
      });

      it("should process non-matching function values", () => {
        const opts = loadOptions({
          cwd: fixture("nonexistant-fake"),
          filename: fixture("nonexistant-fake", "src.js"),
          babelrc: false,
          exclude: [p => p.indexOf(fixture("nonexistant-unknown")) === 0],
          comments: true,
        });

        expect(opts.comments).toBe(true);
      });
    });
  });

  describe("ignore", () => {
    it("should ignore files that match", () => {
      const opts = loadOptions({
        cwd: fixture("nonexistant-fake"),
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

      expect(opts).toBeNull();
    });

    it("should not ignore files that don't match", () => {
      const opts = loadOptions({
        cwd: fixture("nonexistant-fake"),
        filename: fixture("nonexistant-fake", "src.js"),
        babelrc: false,
        ignore: [
          fixture("nonexistant-fake", "other.js"),
          fixture("nonexistant-fake", "misc.js"),
        ],
      });

      expect(opts).not.toBeNull();
    });
  });

  describe("only", () => {
    it("should ignore files that don't match", () => {
      const opts = loadOptions({
        cwd: fixture("nonexistant-fake"),
        filename: fixture("nonexistant-fake", "src.js"),
        babelrc: false,
        only: [
          fixture("nonexistant-fake", "other.js"),
          fixture("nonexistant-fake", "misc.js"),
        ],
      });

      expect(opts).toBeNull();
    });

    it("should not ignore files that match", () => {
      const opts = loadOptions({
        cwd: fixture("nonexistant-fake"),
        filename: fixture("nonexistant-fake", "src.js"),
        babelrc: false,
        only: [
          fixture("nonexistant-fake", "src.js"),
          fixture("nonexistant-fake", "misc.js"),
        ],
      });

      expect(opts).not.toBeNull();
    });
  });

  describe("ignore/only", () => {
    it("should ignore files that match ignore and don't match only", () => {
      const opts = loadOptions({
        cwd: fixture("nonexistant-fake"),
        filename: fixture("nonexistant-fake", "src.js"),
        babelrc: false,
        ignore: [fixture("nonexistant-fake", "src.js")],
        only: [],
      });

      expect(opts).toBeNull();
    });

    it("should ignore files that match ignore and also only", () => {
      const opts = loadOptions({
        cwd: fixture("nonexistant-fake"),
        filename: fixture("nonexistant-fake", "src.js"),
        babelrc: false,
        ignore: [fixture("nonexistant-fake", "src.js")],
        only: [fixture("nonexistant-fake", "src.js")],
      });

      expect(opts).toBeNull();
    });

    it("should not ignore files that match only and not ignore", () => {
      const opts = loadOptions({
        cwd: fixture("nonexistant-fake"),
        filename: fixture("nonexistant-fake", "src.js"),
        babelrc: false,
        only: [fixture("nonexistant-fake", "src.js")],
      });

      expect(opts).not.toBeNull();
    });

    it("should not ignore files when no ignore/only are specified", () => {
      const opts = loadOptions({
        cwd: fixture("nonexistant-fake"),
        filename: fixture("nonexistant-fake", "src.js"),
        babelrc: false,
      });

      expect(opts).not.toBeNull();
    });

    it("should allow negation of only", () => {
      const opts1 = loadOptions({
        cwd: fixture("nonexistant-fake"),
        filename: fixture("nonexistant-fake", "src.js"),
        babelrc: false,
        only: [
          "!" + fixture("nonexistant-fake"),
          fixture("nonexistant-fake", "other.js"),
        ],
      });
      expect(opts1).toBeNull();

      const opts2 = loadOptions({
        cwd: fixture("nonexistant-fake"),
        filename: fixture("nonexistant-fake", "src.js"),
        babelrc: false,
        only: [
          "!" + fixture("nonexistant-fake"),
          fixture("nonexistant-fake", "src.js"),
        ],
      });
      expect(opts2).not.toBeNull();

      const opts3 = loadOptions({
        cwd: fixture("nonexistant-fake"),
        filename: fixture("nonexistant-fake", "folder", "src.js"),
        babelrc: false,
        only: [
          "!" + fixture("nonexistant-fake"),
          fixture("nonexistant-fake", "folder"),
        ],
      });
      expect(opts3).not.toBeNull();
    });

    it("should allow negation of ignore", () => {
      const opts1 = loadOptions({
        cwd: fixture("nonexistant-fake"),
        filename: fixture("nonexistant-fake", "src.js"),
        babelrc: false,
        ignore: [
          "!" + fixture("nonexistant-fake", "other.js"),
          fixture("nonexistant-fake"),
        ],
      });
      expect(opts1).toBeNull();

      // Tests disabled pending https://github.com/babel/babel/issues/6907
      // const opts2 = loadOptions({
      //   cwd: fixture("nonexistant-fake"),
      //   filename: fixture("nonexistant-fake", "src.js"),
      //   babelrc: false,
      //   ignore: [
      //     "!" + fixture("nonexistant-fake", "src.js"),
      //     fixture("nonexistant-fake"),
      //   ],
      // });
      // expect(opts2).not.toBeNull();
      //
      // const opts3 = loadOptions({
      //   cwd: fixture("nonexistant-fake"),
      //   filename: fixture("nonexistant-fake", "folder", "src.js"),
      //   babelrc: false,
      //   ignore: [
      //     "!" + fixture("nonexistant-fake", "folder"),
      //     fixture("nonexistant-fake"),
      //   ],
      // });
      // expect(opts3).not.toBeNull();
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

        expect(opts1.plugins).toHaveLength(1);
        expect(opts2.plugins).toHaveLength(1);
        expect(opts1.plugins[0]).not.toBe(opts2.plugins[1]);
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

        expect(opts1.plugins).toHaveLength(1);
        expect(opts2.plugins).toHaveLength(1);
        expect(opts1.plugins[0]).toBe(opts2.plugins[0]);
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

        expect(opts1.plugins).toHaveLength(1);
        expect(opts2.plugins).toHaveLength(1);
        expect(opts1.plugins[0]).toBe(opts2.plugins[0]);
      });

      it("should cache the plugin options by identity", () => {
        const plugins = [() => ({})];

        const opts1 = loadOptions({ plugins });
        const opts2 = loadOptions({ plugins });

        expect(opts1.plugins).toHaveLength(1);
        expect(opts2.plugins).toHaveLength(1);
        expect(opts1.plugins[0]).toBe(opts2.plugins[0]);
      });

      it("should cache the presets options by identity", () => {
        const presets = [() => ({ plugins: [() => ({})] })];

        const opts1 = loadOptions({ presets });
        const opts2 = loadOptions({ presets });

        expect(opts1.plugins).toHaveLength(1);
        expect(opts2.plugins).toHaveLength(1);
        expect(opts1.plugins[0]).toBe(opts2.plugins[0]);
      });

      it("should not cache the presets options with passPerPreset", () => {
        const presets = [() => ({ plugins: [() => ({})] })];

        const opts1 = loadOptions({ presets });
        const opts2 = loadOptions({ presets, passPerPreset: true });
        const opts3 = loadOptions({ presets, passPerPreset: false });

        expect(opts1.plugins).toHaveLength(1);
        expect(opts2.plugins).toHaveLength(0);
        expect(opts3.plugins).toHaveLength(1);

        expect(opts1.plugins[0]).toBe(opts3.plugins[0]);
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

        const opts1 = loadOptions({ filename, cwd: path.dirname(filename) });
        const opts2 = loadOptions({ filename, cwd: path.dirname(filename) });

        touch(pkgJSON);

        const opts3 = loadOptions({ filename, cwd: path.dirname(filename) });
        const opts4 = loadOptions({ filename, cwd: path.dirname(filename) });

        expect(opts1.plugins).toHaveLength(1);
        expect(opts2.plugins).toHaveLength(1);
        expect(opts1.plugins[0]).toBe(opts2.plugins[0]);

        expect(opts1.plugins).toHaveLength(1);
        expect(opts2.plugins).toHaveLength(1);
        expect(opts3.plugins[0]).toBe(opts4.plugins[0]);

        // Identity changed after touch().
        expect(opts1.plugins[0]).not.toBe(opts3.plugins[0]);
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

        const opts1 = loadOptions({ filename, cwd: path.dirname(filename) });
        const opts2 = loadOptions({ filename, cwd: path.dirname(filename) });

        touch(babelrcFile);

        const opts3 = loadOptions({ filename, cwd: path.dirname(filename) });
        const opts4 = loadOptions({ filename, cwd: path.dirname(filename) });

        expect(opts1.plugins).toHaveLength(1);
        expect(opts2.plugins).toHaveLength(1);
        expect(opts1.plugins[0]).toBe(opts2.plugins[0]);

        expect(opts3.plugins).toHaveLength(1);
        expect(opts4.plugins).toHaveLength(1);
        expect(opts3.plugins[0]).toBe(opts4.plugins[0]);

        // Identity changed after touch().
        expect(opts1.plugins[0]).not.toBe(opts3.plugins[0]);
      });

      it("should cache .babelrc.js files programmable behavior", () => {
        const filename = fixture(
          "complex-plugin-config",
          "config-identity",
          "babelrc-js",
          "src.js",
        );

        const opts1 = loadOptions({ filename, cwd: path.dirname(filename) });
        const opts2 = loadOptions({ filename, cwd: path.dirname(filename) });

        const opts3 = loadOptions({
          filename,
          envName: "new-env",
          cwd: path.dirname(filename),
        });
        const opts4 = loadOptions({
          filename,
          envName: "new-env",
          cwd: path.dirname(filename),
        });

        expect(opts1.plugins).toHaveLength(1);
        expect(opts2.plugins).toHaveLength(1);
        expect(opts1.plugins[0]).toBe(opts2.plugins[0]);

        expect(opts3.plugins).toHaveLength(1);
        expect(opts4.plugins).toHaveLength(1);
        expect(opts3.plugins[0]).toBe(opts4.plugins[0]);

        // Identity changed with different .env
        expect(opts1.plugins[0]).not.toBe(opts3.plugins[0]);
      });
    });
  });

  describe("overrides merging", () => {
    it("should apply matching overrides over base configs", () => {
      const opts = loadOptions({
        cwd: fixture("nonexistant-fake"),
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

      expect(opts.comments).toBe(false);
    });

    it("should not apply non-matching overrides over base configs", () => {
      const opts = loadOptions({
        cwd: fixture("nonexistant-fake"),
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

      expect(opts.comments).toBe(true);
    });
  });

  describe("config files", () => {
    const getDefaults = () => ({
      babelrc: false,
      configFile: false,
      cwd: process.cwd(),
      envName: "development",
      passPerPreset: false,
      plugins: [],
      presets: [],
    });
    const realEnv = process.env.NODE_ENV;
    const realBabelEnv = process.env.BABEL_ENV;

    beforeAll(() => {
      delete process.env.NODE_ENV;
      delete process.env.BABEL_ENV;
    });
    afterAll(() => {
      if (realEnv) {
        process.env.NODE_ENV = realEnv;
        process.env.NODE_ENV = realBabelEnv;
      }
    });

    it("should load .babelrc", () => {
      const filename = fixture("config-files", "babelrc", "src.js");

      expect(
        loadOptions({
          filename,
          cwd: path.dirname(filename),
        }),
      ).toEqual({
        ...getDefaults(),
        filename,
        cwd: path.dirname(filename),
        comments: true,
      });
    });

    it("should load .babelrc.js", () => {
      const filename = fixture("config-files", "babelrc-js", "src.js");

      expect(loadOptions({ filename, cwd: path.dirname(filename) })).toEqual({
        ...getDefaults(),
        filename,
        cwd: path.dirname(filename),
        comments: true,
      });
    });

    it("should load package.json#babel", () => {
      const filename = fixture("config-files", "pkg", "src.js");

      expect(loadOptions({ filename, cwd: path.dirname(filename) })).toEqual({
        ...getDefaults(),
        filename,
        cwd: path.dirname(filename),
        comments: true,
      });
    });

    it("should load .babelignore", () => {
      const filename = fixture("config-files", "babelignore", "src.js");

      expect(loadOptions({ filename, cwd: path.dirname(filename) })).toBeNull();
    });

    it("should throw if there are both .babelrc and .babelrc.js", () => {
      const filename = fixture("config-files", "both-babelrc", "src.js");

      expect(() =>
        loadOptions({ filename, cwd: path.dirname(filename) }),
      ).toThrow(/Multiple configuration files found/);
    });

    it("should throw if there are both .babelrc and package.json", () => {
      const filename = fixture("config-files", "pkg-babelrc", "src.js");

      expect(() =>
        loadOptions({ filename, cwd: path.dirname(filename) }),
      ).toThrow(/Multiple configuration files found/);
    });

    it("should throw if there are both .babelrc.js and package.json", () => {
      const filename = fixture("config-files", "pkg-babelrc-js", "src.js");

      expect(() =>
        loadOptions({ filename, cwd: path.dirname(filename) }),
      ).toThrow(/Multiple configuration files found/);
    });

    it("should ignore package.json without a 'babel' property", () => {
      const filename = fixture("config-files", "pkg-ignored", "src.js");

      expect(loadOptions({ filename, cwd: path.dirname(filename) })).toEqual({
        ...getDefaults(),
        filename,
        cwd: path.dirname(filename),
        comments: true,
      });
    });

    it("should show helpful errors for .babelrc", () => {
      const filename = fixture("config-files", "babelrc-error", "src.js");

      expect(() =>
        loadOptions({ filename, cwd: path.dirname(filename) }),
      ).toThrow(/Error while parsing config - /);
    });

    it("should show helpful errors for .babelrc.js", () => {
      const filename = fixture("config-files", "babelrc-js-error", "src.js");

      expect(() =>
        loadOptions({ filename, cwd: path.dirname(filename) }),
      ).toThrow(/Babelrc threw an error/);
    });

    it("should show helpful errors for package.json", () => {
      const filename = fixture("config-files", "pkg-error", "src.js");

      expect(() =>
        loadOptions({ filename, cwd: path.dirname(filename) }),
      ).toThrow(/Error while parsing JSON - /);
    });
  });
});
