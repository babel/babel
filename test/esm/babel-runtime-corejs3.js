import assert from "assert";

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
    [
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
  ],
};
