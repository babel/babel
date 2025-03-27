import browserify from "browserify";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { itBabel7, itBabel8 } from "$repo-utils";

describe("browserify", function () {
  itBabel8("dummy", function () {});
  itBabel7(
    "@babel/register may be used without breaking browserify",
    function () {
      const bundler = browserify(
        path.join(
          path.dirname(fileURLToPath(import.meta.url)),
          "fixtures/browserify/register.js",
        ),
      );
      return new Promise((resolve, reject) => {
        bundler.bundle(function (err, bundle) {
          if (err) return reject(err);
          expect(bundle.length).toBeTruthy();

          // ensure that the code runs without throwing an exception
          vm.runInNewContext("var global = this;\n" + bundle, {});
          resolve();
        });
      });
    },
  );
});
