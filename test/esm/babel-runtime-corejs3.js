import assert from "assert";

// env vars from the cli are always strings, so !!ENV_VAR returns true for "false"
function bool(value) {
  return Boolean(value) && value !== "false" && value !== "0";
}

export default {
  title: "@babel/runtime-corejs3",
  testcases: [
    [
      "it should throw on unknown helpers",
      () =>
        assert.rejects(
          async () =>
            import("@babel/runtime-corejs3/helpers/esm/unknown-helper"),
          {
            name: "Error",
            code: "ERR_PACKAGE_PATH_NOT_EXPORTED",
          }
        ),
    ],
    [
      "it should not throw on helpers importing internal helpers",
      () =>
        assert.doesNotReject(
          async () =>
            import("@babel/runtime-corejs3/helpers/esm/wrapNativeSuper"),
          Error
        ),
    ],
    /*[
      "it supports importing with explicit extension",
      () =>
        assert.doesNotReject(
          async () => import("@babel/runtime/helpers/esm/wrapNativeSuper.js"),
          Error
        ),
    ],*/
    !bool(process.env.BABEL_8_BREAKING) && [
      "it should not throw on importing core-js helpers",
      () =>
        assert.doesNotReject(
          async () => import("@babel/runtime-corejs3/core-js/array/is-array"),
          Error
        ),
    ],
    /*[
      "it should not throw on importing core-js helpers with explicit extension",
      () =>
        assert.doesNotReject(
          async () =>
            import("@babel/runtime-corejs3/core-js/array/is-array.js"),
          Error
        ),
    ],*/
    [
      "it should not throw on importing regenerator helpers",
      () =>
        assert.doesNotReject(
          async () => import("@babel/runtime-corejs3/regenerator"),
          Error
        ),
    ],
    [
      "it should not throw on importing regenerator helpers with explicit extension",
      () =>
        assert.doesNotReject(
          async () => import("@babel/runtime-corejs3/regenerator/index.js"),
          Error
        ),
    ],
  ].filter(Boolean),
};
