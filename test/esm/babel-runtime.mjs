import assert from "assert";

export default {
  title: "@babel/runtime",
  testcases: [
    [
      "it should throw on unknown helpers",
      () =>
        assert.rejects(
          async () => import("@babel/runtime/helpers/esm/unknown-helper"),
          {
            name: "Error",
            code: "ERR_MODULE_NOT_FOUND",
          }
        ),
    ],
    [
      "it should not throw on helpers importing internal helpers",
      () =>
        assert.doesNotReject(
          async () => import("@babel/runtime/helpers/esm/wrapNativeSuper"),
          Error
        ),
    ],
  ],
};
