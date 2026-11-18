// NOTE: This file must be runnable on all Node.js version
/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-node-protocol */
// @ts-check

const path = require("path");
const { fileURLToPath } = require("url");
const { createRequire } = require("module");
const { isGreaterThanOrEqual, isLessThan, satisfies } = require("verkit");

// env vars from the cli are always strings, so !!ENV_VAR returns true for "false"
function bool(value) {
  return Boolean(value) && value !== "false" && value !== "0";
}

exports.repoRoot = path.resolve(__dirname, "../../");

exports.IS_BABEL_9 = () => bool(process.env.BABEL_9_BREAKING);

if (typeof jest !== "undefined") {
  const dummy = () => {};
  dummy.only = dummy.skip = dummy;
  dummy.each = () => dummy;
  exports.itDummy = dummy;
  exports.itBabel8 = bool(process.env.BABEL_9_BREAKING) ? dummy : it;
  exports.itBabel9 = bool(process.env.BABEL_9_BREAKING) ? it : dummy;
  exports.itGte = function (version) {
    return isGreaterThanOrEqual(process.version, version) ? it : dummy;
  };
  exports.itLt = function (version) {
    return isLessThan(process.version, version) ? it : dummy;
  };
  exports.itSatisfies = function (version) {
    return satisfies(process.version, version) ? it : dummy;
  };
  exports.itNegate = function (jestIt) {
    return jestIt === dummy ? it : dummy;
  };
  exports.itNoWin32 = process.platform === "win32" ? dummy : it;
  exports.describeBabel8 = bool(process.env.BABEL_9_BREAKING)
    ? dummy
    : describe;
  exports.describeBabel9 = bool(process.env.BABEL_9_BREAKING)
    ? describe
    : dummy;
  exports.describeGte = function (version) {
    return isGreaterThanOrEqual(process.version, version)
      ? describe
      : describe.skip;
  };
  exports.describeSatisfies = function (version) {
    return satisfies(process.version, version) ? describe : describe.skip;
  };
  exports.describeNoCITGM =
    bool(process.env.CITGM) || __dirname.includes("citgm_tmp")
      ? describe.skip
      : describe;

  /**
   * Checks that the deprecated `loose: true` option of `plugin` enables
   * exactly `assumptions`: the `loose` output must equal the output with
   * those assumptions, and `code` must exercise each of them, so that dropping
   * any one changes the output.
   *
   * `companions` are plugins that get the same options as `plugin`, for
   * plugins whose `loose` has to match theirs.
   */
  exports.testLooseAssumptions = function (
    plugin,
    assumptions,
    code,
    { companions = [], sourceType = "module" } = {}
  ) {
    const enabled = Object.fromEntries(assumptions.map(name => [name, true]));

    function transform(pluginOptions, assumptions) {
      // $repo-utils resolves @babel/core to the published one, not the
      // workspace one, so load it by path.
      const { transformSync } = require(
        path.join(exports.repoRoot, "packages/babel-core")
      );
      const warn = jest.spyOn(console, "warn").mockImplementation(() => {});
      try {
        return transformSync(code, {
          configFile: false,
          babelrc: false,
          sourceType,
          assumptions,
          plugins: [plugin].concat(companions).map(p => [p, pluginOptions]),
        }).code;
      } finally {
        warn.mockRestore();
      }
    }

    describe("loose", () => {
      it(`is equivalent to ${assumptions.join(", ")}`, () => {
        expect(transform({ loose: true }, {})).toBe(transform({}, enabled));
      });

      it.each(assumptions)("input exercises %s", name => {
        const output = transform(
          {},
          Object.assign({}, enabled, { [name]: false })
        );
        expect(output).not.toBe(transform({}, enabled));
      });
    });
  };
}

exports.commonJS = function (metaUrl) {
  if (!metaUrl) {
    throw new Error("commonJS() requires import.meta.url");
  }
  const filename = fileURLToPath(metaUrl);
  const dirname = path.dirname(filename);
  return {
    __filename: filename,
    __dirname: dirname,
    // Only available in Node.js 12+
    require: createRequire ? createRequire(filename) : null,
  };
};
