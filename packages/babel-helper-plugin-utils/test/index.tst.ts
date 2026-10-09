import { expect, it, describe } from "tstyche";
import { declare, declarePreset } from "../src/index.ts";
import type { PluginTarget, PresetTarget } from "@babel/core";

describe("declare", () => {
  it("should return a valid plugin target", () => {
    type PluginOption = { foo: string };
    const plugin = declare(
      (_, _options: PluginOption) => (console.log(_options), {}),
    );
    expect(plugin).type.toBeAssignableTo<PluginTarget<PluginOption>>();
  });
});

describe("declarePreset", () => {
  it("should return a valid preset target", () => {
    type PresetOption = { foo: string };
    const preset = declarePreset(
      (_, _options: PresetOption) => (console.log(_options), {}),
    );
    expect(preset).type.toBeAssignableTo<PresetTarget<PresetOption>>();
  });
});
