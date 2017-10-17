import loadConfig from "../lib/config";
import path from "path";
import { expect } from "chai";

describe("@babel/core config loading", () => {
  const FILEPATH = path.join(
    __dirname,
    "fixtures",
    "config-loading",
    "folder",
    "example.js",
  );

  afterEach(() => {
    delete process.env.INVALIDATE_BABELRC;
    delete process.env.INVALIDATE_PRESET1;
    delete process.env.INVALIDATE_PRESET2;
    delete process.env.INVALIDATE_PRESET3;
    delete process.env.INVALIDATE_PLUGIN1;
    delete process.env.INVALIDATE_PLUGIN2;
    delete process.env.INVALIDATE_PLUGIN3;
    delete process.env.INVALIDATE_PLUGIN4;
    delete process.env.INVALIDATE_PLUGIN5;
    delete process.env.INVALIDATE_PLUGIN6;
  });

  function makeOpts(skipProgrammatic = false) {
    return {
      filename: FILEPATH,
      presets: skipProgrammatic
        ? null
        : [require("./fixtures/config-loading/preset3")],
      plugins: skipProgrammatic
        ? null
        : [require("./fixtures/config-loading/plugin6")],
    };
  }

  describe("config file", () => {
    it("should load and cache the config with plugins and presets", () => {
      const opts = makeOpts();

      const options1 = loadConfig(opts).options;
      expect(options1.plugins.map(p => p.key)).to.eql([
        "plugin6",
        "plugin5",
        "plugin1",
        "plugin2",
        "plugin4",
        "plugin3",
      ]);

      const options2 = loadConfig(opts).options;
      expect(options2.plugins.length).to.equal(options1.plugins.length);

      for (let i = 0; i < options2.plugins.length; i++) {
        expect(options2.plugins[i]).to.equal(options1.plugins[i]);
      }
    });

    it("should load and cache the config for unique opts objects", () => {
      const options1 = loadConfig(makeOpts(true)).options;
      expect(options1.plugins.map(p => p.key)).to.eql([
        "plugin1",
        "plugin2",
        "plugin4",
        "plugin3",
      ]);

      const options2 = loadConfig(makeOpts(true)).options;
      expect(options2.plugins.length).to.equal(options1.plugins.length);

      for (let i = 0; i < options2.plugins.length; i++) {
        expect(options2.plugins[i]).to.equal(options1.plugins[i]);
      }
    });

    it("should invalidate config file plugins", () => {
      const opts = makeOpts();

      const options1 = loadConfig(opts).options;

      process.env.INVALIDATE_PLUGIN1 = true;

      const options2 = loadConfig(opts).options;
      expect(options2.plugins.length).to.equal(options1.plugins.length);

      for (let i = 0; i < options1.plugins.length; i++) {
        if (i === 2) {
          expect(options2.plugins[i]).not.to.equal(options1.plugins[i]);
        } else {
          expect(options2.plugins[i]).to.equal(options1.plugins[i]);
        }
      }

      process.env.INVALIDATE_PLUGIN3 = true;

      const options3 = loadConfig(opts).options;
      expect(options3.plugins.length).to.equal(options1.plugins.length);

      for (let i = 0; i < options1.plugins.length; i++) {
        if (i === 2 || i === 5) {
          expect(options3.plugins[i]).not.to.equal(options1.plugins[i]);
        } else {
          expect(options3.plugins[i]).to.equal(options1.plugins[i]);
        }
      }
    });

    it("should invalidate config file presets and their children", () => {
      const opts = makeOpts();

      const options1 = loadConfig(opts).options;

      process.env.INVALIDATE_PRESET1 = true;

      const options2 = loadConfig(opts).options;
      expect(options2.plugins.length).to.equal(options1.plugins.length);

      for (let i = 0; i < options1.plugins.length; i++) {
        if (i === 5) {
          expect(options2.plugins[i]).not.to.equal(options1.plugins[i]);
        } else {
          expect(options2.plugins[i]).to.equal(options1.plugins[i]);
        }
      }

      process.env.INVALIDATE_PRESET2 = true;

      const options3 = loadConfig(opts).options;
      expect(options3.plugins.length).to.equal(options1.plugins.length);

      for (let i = 0; i < options1.plugins.length; i++) {
        if (i === 4 || i === 5) {
          expect(options3.plugins[i]).not.to.equal(options1.plugins[i]);
        } else {
          expect(options3.plugins[i]).to.equal(options1.plugins[i]);
        }
      }
    });

    it("should invalidate the config file and its plugins/presets", () => {
      const opts = makeOpts();

      const options1 = loadConfig(opts).options;

      process.env.INVALIDATE_BABELRC = true;

      const options2 = loadConfig(opts).options;
      expect(options2.plugins.length).to.equal(options1.plugins.length);

      for (let i = 0; i < options1.plugins.length; i++) {
        if (i === 2 || i === 3 || i === 4 || i === 5 || i === 6) {
          expect(options2.plugins[i]).not.to.equal(options1.plugins[i]);
        } else {
          expect(options2.plugins[i]).to.equal(options1.plugins[i]);
        }
      }
    });
  });

  describe("programmatic plugins/presets", () => {
    it("should not invalidate the plugins when given a fresh object", () => {
      const opts = makeOpts();

      const options1 = loadConfig(opts).options;

      const options2 = loadConfig(Object.assign({}, opts)).options;
      expect(options2.plugins.length).to.equal(options1.plugins.length);

      for (let i = 0; i < options2.plugins.length; i++) {
        expect(options2.plugins[i]).to.equal(options1.plugins[i]);
      }
    });

    it("should invalidate the plugins when given a fresh arrays", () => {
      const opts = makeOpts();

      const options1 = loadConfig(opts).options;

      const options2 = loadConfig({
        ...opts,
        plugins: opts.plugins.slice(),
      }).options;
      expect(options2.plugins.length).to.equal(options1.plugins.length);

      for (let i = 0; i < options2.plugins.length; i++) {
        if (i === 0) {
          expect(options2.plugins[i]).not.to.equal(options1.plugins[i]);
        } else {
          expect(options2.plugins[i]).to.equal(options1.plugins[i]);
        }
      }
    });

    it("should invalidate the presets when given a fresh arrays", () => {
      const opts = makeOpts();

      const options1 = loadConfig(opts).options;

      const options2 = loadConfig({
        ...opts,
        presets: opts.presets.slice(),
      }).options;
      expect(options2.plugins.length).to.equal(options1.plugins.length);

      for (let i = 0; i < options2.plugins.length; i++) {
        if (i === 1) {
          expect(options2.plugins[i]).not.to.equal(options1.plugins[i]);
        } else {
          expect(options2.plugins[i]).to.equal(options1.plugins[i]);
        }
      }
    });

    it("should invalidate the programmatic plugins", () => {
      const opts = makeOpts();

      const options1 = loadConfig(opts).options;

      process.env.INVALIDATE_PLUGIN6 = true;

      const options2 = loadConfig(opts).options;
      expect(options2.plugins.length).to.equal(options1.plugins.length);

      for (let i = 0; i < options1.plugins.length; i++) {
        if (i === 0) {
          expect(options2.plugins[i]).not.to.equal(options1.plugins[i]);
        } else {
          expect(options2.plugins[i]).to.equal(options1.plugins[i]);
        }
      }
    });

    it("should invalidate the programmatic presets and their children", () => {
      const opts = makeOpts();

      const options1 = loadConfig(opts).options;

      process.env.INVALIDATE_PRESET3 = true;

      const options2 = loadConfig(opts).options;
      expect(options2.plugins.length).to.equal(options1.plugins.length);

      for (let i = 0; i < options1.plugins.length; i++) {
        if (i === 1) {
          expect(options2.plugins[i]).not.to.equal(options1.plugins[i]);
        } else {
          expect(options2.plugins[i]).to.equal(options1.plugins[i]);
        }
      }
    });
  });
});
