import path from "path";
import { fileURLToPath } from "url";
import { transformSync } from "../lib";

const cwd = path.dirname(fileURLToPath(import.meta.url));

function transform(code, opts) {
  return transformSync(code, { cwd, configFile: false, ...opts });
}

describe("externalDependencies", () => {
  function makePlugin(external) {
    return api => {
      api.addExternalDependency(external);
      return { visitor: {} };
    };
  }

  function makePreset(external, plugins = []) {
    return api => {
      api.addExternalDependency(external);
      return { plugins };
    };
  }

  it("can be set by plugins", () => {
    const { externalDependencies } = transform("", {
      plugins: [makePlugin("./foo")],
    });

    expect(new Set(externalDependencies)).toEqual(new Set(["./foo"]));
  });

  it("can be set multiple times by the same plugin", () => {
    const { externalDependencies } = transform("", {
      plugins: [
        function (api) {
          api.addExternalDependency("./foo");
          api.addExternalDependency("./bar");
          return { visitor: {} };
        },
      ],
    });

    expect(new Set(externalDependencies)).toEqual(new Set(["./foo", "./bar"]));
  });

  it("can be set by presets", () => {
    const { externalDependencies } = transform("", {
      presets: [makePreset("./foo")],
    });

    expect(new Set(externalDependencies)).toEqual(new Set(["./foo"]));
  });

  it("can be set multiple times by the same preset", () => {
    const { externalDependencies } = transform("", {
      presets: [
        function (api) {
          api.addExternalDependency("./foo");
          api.addExternalDependency("./bar");
          return { plugins: [] };
        },
      ],
    });

    expect(new Set(externalDependencies)).toEqual(new Set(["./foo", "./bar"]));
  });

  it("can be set by multiple plugins and presets", () => {
    const { externalDependencies } = transform("", {
      plugins: [makePlugin("./plugin1"), makePlugin("./plugin2")],
      presets: [
        makePreset("./preset", [
          makePlugin("./preset-plugin1"),
          makePlugin("./preset-plugin2"),
        ]),
      ],
    });

    expect(new Set(externalDependencies)).toEqual(
      new Set([
        "./plugin1",
        "./plugin2",
        "./preset",
        "./preset-plugin1",
        "./preset-plugin2",
      ]),
    );
  });

  describe("cached plugins", () => {
    it("returned when set by cached plugins", () => {
      const plugin = jest.fn(makePlugin("./foo"));

      const result1 = transform("", { plugins: [plugin] });
      const result2 = transform("", { plugins: [plugin] });

      expect(plugin).toHaveBeenCalledTimes(1);

      expect(new Set(result1.externalDependencies)).toEqual(new Set(["./foo"]));
      expect(new Set(result2.externalDependencies)).toEqual(new Set(["./foo"]));
    });

    it("cached external depenencies are merged with new ones", () => {
      const plugin1 = jest.fn(makePlugin("./foo"));
      const plugin2 = jest.fn((api, { file }) => {
        api.addExternalDependency(file);
        return { visitor: {} };
      });

      const result1 = transform("", {
        plugins: [plugin1, [plugin2, { file: "./file1" }]],
      });
      const result2 = transform("", {
        plugins: [plugin1, [plugin2, { file: "./file2" }]],
      });

      expect(plugin1).toHaveBeenCalledTimes(1);
      expect(plugin2).toHaveBeenCalledTimes(2);

      expect(new Set(result1.externalDependencies)).toEqual(
        new Set(["./foo", "./file1"]),
      );
      expect(new Set(result2.externalDependencies)).toEqual(
        new Set(["./foo", "./file2"]),
      );
    });
  });
});
