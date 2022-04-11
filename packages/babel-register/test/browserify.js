import browserify from "browserify";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

describe("browserify", function () {
  it("@babel/register may be used without breaking browserify", function () {
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
  });
});
