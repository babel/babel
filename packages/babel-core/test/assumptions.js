import { loadOptions as loadOptionsOrig, transformSync } from "../lib";

function loadOptions(opts) {
  return loadOptionsOrig({ cwd: __dirname, ...opts });
}

function withAssumptions(assumptions) {
  return loadOptions({ assumptions });
}

describe("assumptions", () => {
  it("throws if invalid name", () => {
    expect(() => withAssumptions({ foo: true })).toThrow(
      `.assumptions["foo"] is not a supported assumption.`,
    );

    expect(() => withAssumptions({ setPublicClassFields: true })).not.toThrow();
  });

  it("throws if not boolean", () => {
    expect(() => withAssumptions({ setPublicClassFields: "yes" })).toThrow(
      `.assumptions["setPublicClassFields"] must be a boolean.`,
    );

    expect(() => withAssumptions({ setPublicClassFields: true })).not.toThrow();
    expect(() =>
      withAssumptions({ setPublicClassFields: false }),
    ).not.toThrow();
  });

  it("can be enabled by presets", () => {
    expect(
      loadOptions({
        assumptions: {
          setPublicClassFields: true,
        },
        presets: [() => ({ assumptions: { mutableTemplateObject: true } })],
      }).assumptions,
    ).toEqual({
      setPublicClassFields: true,
      mutableTemplateObject: true,
    });
  });

  it("cannot be disabled by presets", () => {
    expect(() =>
      loadOptions({
        presets: [() => ({ assumptions: { mutableTemplateObject: false } })],
      }),
    ).toThrow(
      ` .assumptions["mutableTemplateObject"] cannot be set to 'false' inside presets.`,
    );
  });

  it("can be queried from plugins", () => {
    let setPublicClassFields;
    let unknownAssumption;

    transformSync("", {
      configFile: false,
      browserslistConfigFile: false,
      assumptions: {
        setPublicClassFields: true,
      },
      plugins: [
        api => {
          setPublicClassFields = api.assumption("setPublicClassFields");

          // Unknown assumptions don't throw, so that plugins can keep compat
          // with older @babel/core versions when they introduce support for
          // a new assumption.
          unknownAssumption = api.assumption("unknownAssumption");

          return {};
        },
      ],
    });

    expect(setPublicClassFields).toBe(true);
    expect(unknownAssumption).toBe(undefined);
  });

  it("cannot be queried from presets", () => {
    let assumptionFn;

    transformSync("", {
      configFile: false,
      browserslistConfigFile: false,
      presets: [
        api => {
          assumptionFn = api.assumption;
          return {};
        },
      ],
    });

    expect(assumptionFn).toBeUndefined();
  });

  describe("plugin cache", () => {
    const makePlugin = () =>
      jest.fn(api => {
        api.assumption("setPublicClassFields");
        return {};
      });

    const run = (plugin, assumptions) =>
      transformSync("", {
        assumptions,
        configFile: false,
        browserslistConfigFile: false,
        plugins: [plugin],
      });

    it("is not invalidated when assumptions don't change", () => {
      const plugin = makePlugin();

      run(plugin, {
        setPublicClassFields: true,
        mutableTemplateObject: false,
      });
      run(plugin, {
        setPublicClassFields: true,
        mutableTemplateObject: false,
      });

      expect(plugin).toHaveBeenCalledTimes(1);
    });

    it("is not invalidated when unused assumptions change", () => {
      const plugin = makePlugin();

      run(plugin, {
        setPublicClassFields: true,
        mutableTemplateObject: false,
      });
      run(plugin, {
        setPublicClassFields: true,
        mutableTemplateObject: true,
      });

      expect(plugin).toHaveBeenCalledTimes(1);
    });

    it("is invalidated when used assumptions change", () => {
      const plugin = makePlugin();

      run(plugin, {
        setPublicClassFields: true,
        mutableTemplateObject: false,
      });
      run(plugin, {
        setPublicClassFields: false,
        mutableTemplateObject: true,
      });

      expect(plugin).toHaveBeenCalledTimes(2);
    });

    it("is invalidated when used assumptions are added", () => {
      const plugin = makePlugin();

      run(plugin, {
        mutableTemplateObject: false,
      });
      run(plugin, {
        mutableTemplateObject: false,
        setPublicClassFields: true,
      });

      expect(plugin).toHaveBeenCalledTimes(2);
    });

    it("is invalidated when used assumptions are removed", () => {
      const plugin = makePlugin();

      run(plugin, {
        setPublicClassFields: true,
        mutableTemplateObject: false,
      });
      run(plugin, {
        mutableTemplateObject: true,
      });

      expect(plugin).toHaveBeenCalledTimes(2);
    });
  });
});
