import { targetsSupported } from "../lib/filter-items.js";

describe("targetsSupported", () => {
  const MAX_VERSION = `${Number.MAX_SAFE_INTEGER}.0.0`;

  it("returns false if no targets are specified", () => {
    expect(targetsSupported({}, {})).toBe(false);
  });

  it("returns false if plugin feature is not implemented in one or more targets", () => {
    let targets;
    const plugin = {
      edge: false,
      firefox: 45,
      chrome: 49,
    };

    targets = {
      chrome: MAX_VERSION,
      firefox: MAX_VERSION,
    };
    expect(targetsSupported(targets, plugin)).toBe(true);

    targets = {
      edge: "12",
    };
    expect(targetsSupported(targets, plugin)).toBe(false);
  });

  it("returns true if plugin feature is implemented by lower than target", () => {
    const plugin = {
      chrome: 49,
    };
    const targets = {
      chrome: MAX_VERSION,
    };

    expect(targetsSupported(targets, plugin)).toBe(true);
  });

  it("returns true if plugin feature is implemented is equal to target", () => {
    const plugin = {
      chrome: 49,
    };
    const targets = {
      chrome: "49.0.0",
    };
    expect(targetsSupported(targets, plugin)).toBe(true);
  });

  it("returns false if plugin feature is implemented is greater than target", () => {
    const plugin = {
      chrome: 50,
    };
    const targets = {
      chrome: "49.0.0",
    };
    expect(targetsSupported(targets, plugin)).toBe(false);
  });

  it("returns when target is a decimal", () => {
    const plugin = {
      node: 6.9,
    };
    const targets = {
      node: "6.10.0",
    };
    expect(targetsSupported(targets, plugin)).toBe(true);
  });

  it("throws an error if target version is invalid", () => {
    const plugin = {
      chrome: 50,
    };
    const targets = {
      chrome: 55,
    };
    expect(() => targetsSupported(targets, plugin)).toThrow();
  });
});
