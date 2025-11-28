import assert from "assert";

export default {
  title: "@babel/runtime",
  testcases: [
    [
      "it should throw on unknown helpers",
      () =>
        assert.rejects(
          async () => import("@babel/runtime/helpers/unknown-helper"),
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
          async () => import("@babel/runtime/helpers/wrapNativeSuper"),
          Error
        ),
    ],
  ],
};
