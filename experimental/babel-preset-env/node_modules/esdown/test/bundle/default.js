// PRE-BUILD

import { bundle } from "../../src/Bundler.js";
import * as Path from "node:path";
import * as FS from "node:fs";
import { runTests } from "moon-unit";

const resolve = Path.resolve.bind(Path, __dirname);

runTests({

    "Bundling" (test) {

        return bundle(resolve("./root.js"), { deep: true }).then(output => {

            let expected = FS.readFileSync(resolve("./expected.js"), { encoding: "utf8" }),
                ok = expected === output;

            test._("Bundled output matches expected output").assert(ok);

            if (ok) {

                try { FS.unlinkSync(resolve("./_out.js")) }
                catch (e) {}

            } else {

                FS.writeFileSync(resolve("./_out.js"), output);
            }

        });
    },

    "Broken links reject if allowBrokenLinks is false" (test) {

        test._("Broken links result in a rejected promise");
        return bundle(resolve("./broken.js")).then(_=> test.assert(false), _=> test.assert(true));
    },

    "Broken links result in empty modules when allowBrokenLinks is true" (test) {

        test._("Broken links result in an empty module");
        return bundle(resolve("./broken.js"), { allowBrokenLinks: true }).then(output => {
            let factory = new Function("module", "exports", output),
                exports = {};

            factory({ exports }, exports);
            test.equals(Object.keys(exports.empty), []);
        });
    },

});
