/* eslint-disable */

import assert from "node:assert";
import { globSync } from "node:fs";
import { describe, it } from "node:test";

import { commonJS } from "$repo-utils";
const { require } = commonJS(import.meta.url);

describe("@babel/runtime", () => {
  it("it should throw on unknown helpers", () =>
    assert.rejects(
      async () => import("@babel/runtime/helpers/unknown-helper"),
      {
        name: "Error",
        code: "ERR_PACKAGE_PATH_NOT_EXPORTED",
      }
    ));
  it("it should not throw on helpers importing internal helpers", () =>
    assert.doesNotReject(
      async () => import("@babel/runtime/helpers/wrapNativeSuper"),
      Error
    ));
});

describe("@babel/runtime-corejs3", () => {
  it("it should throw on unknown helpers", () =>
    assert.rejects(
      async () => import("@babel/runtime-corejs3/helpers/unknown-helper"),
      {
        name: "Error",
        code: "ERR_PACKAGE_PATH_NOT_EXPORTED",
      }
    ));
  it("it should not throw on helpers importing internal helpers", () =>
    assert.doesNotReject(
      async () => import("@babel/runtime-corejs3/helpers/wrapNativeSuper"),
      Error
    ));
});

describe("all packages", () => {
  it("ESM packages can be required", () => {
    const packages = globSync("packages/*").filter(
      v => v !== "babel-register" && v.startsWith("babel")
    );

    for (const pkg of packages) {
      require(pkg);
    }
  });
});
