import { expect, it, describe } from "tstyche";
import type { ESLint, Linter, Rule } from "eslint";
import plugin from "../src/index.ts";

describe("babel-eslint-plugin", () => {
  it("meta should be valid", () => {
    expect(plugin.meta).type.toBeAssignableTo<ESLint.Plugin["meta"]>();
  });
  it("rules should be valid", () => {
    expect(plugin.rules).type.toBeAssignableTo<
      Record<string, Rule.RuleModule>
    >();
  });
  it("configs should be valid", () => {
    expect(plugin.configs).type.toBeAssignableTo<
      Record<string, Linter.Config>
    >();
  });
  it("configs can be used in a config array", () => {
    const config = [
      { plugins: { babel: plugin } },
      plugin.configs.recommended,
      plugin.configs.all,
    ];
    expect(config).type.toBeAssignableTo<Linter.Config[]>();
  });
  it("configs can be used in a config array with overrides", () => {
    const config = [
      { plugins: { babel: plugin } },
      {
        ...plugin.configs.recommended,
        files: ["some-file.js"],
      },
      {
        ...plugin.configs.all,
        files: ["some-other-file.cjs"],
      },
      {
        files: ["one-more-file.mjs"],
        rules: plugin.configs.recommended.rules,
      },
    ];
    expect(config).type.toBeAssignableTo<Linter.Config[]>();
  });
});
