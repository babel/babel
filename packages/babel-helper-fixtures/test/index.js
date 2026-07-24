import getFixtures from "../lib/index.js";

const fixturesUrl = new URL("./fixtures/options-loading/", import.meta.url);

function getOptions(name) {
  const [suite] = getFixtures(new URL(`${name}/`, fixturesUrl));
  return suite.tests[0].options;
}

describe("options loading", () => {
  it.each([
    ["root-esm", "setArrayLength"],
    ["suite-esm", "constantReexports"],
    ["task-esm", "noDocumentAll"],
  ])("loads default-exported ESM options at %s", (name, assumption) => {
    expect(getOptions(name)).toMatchObject({
      assumptions: { [assumption]: true },
    });
  });

  it.each(["root-cjs", "suite-cjs", "task-cjs"])(
    "preserves CommonJS options with a default key at %s",
    name => {
      expect(getOptions(name)).toMatchObject({
        comments: false,
        default: name,
      });
    },
  );

  it.each([
    "root-esm-named-only",
    "suite-esm-named-only",
    "task-esm-named-only",
  ])("rejects ESM options without a default export at %s", name => {
    expect(() => getOptions(name)).toThrow(
      /Fixture options must export a default export when using ES modules:/,
    );
  });
});
