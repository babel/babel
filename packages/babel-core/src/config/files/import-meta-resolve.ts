import { createRequire } from "module";
import { resolve as polyfill } from "../../vendor/import-meta-resolve";

const require = createRequire(import.meta.url);

let import_;
try {
  // Node < 13.3 doesn't support import() syntax.
  import_ = require("./import").default;
} catch {}

// import.meta.resolve is only available in ESM, but this file is compiled to CJS.
// We can extract ir using dynamic import.
const resolveP =
  import_ &&
  // Due to a Node.js/V8 bug (https://github.com/nodejs/node/issues/35889), we cannot
  // use dynamic import when running in the default Jest environment because it
  // uses vm.SourceTextModule.
  // Jest defines globalThis["jest-symbol-do-not-touch"] in
  // https://github.com/facebook/jest/blob/11d79ec096a25851124356095d60352f6ca2824e/packages/jest-util/src/installCommonGlobals.ts#L49
  // which is called by
  // https://github.com/facebook/jest/blob/11d79ec096a25851124356095d60352f6ca2824e/packages/jest-environment-node/src/index.ts#L85
  //
  // Note that our Jest runner doesn't have this problem, because it runs ESM in the default
  // Node.js context rather than using the `vm` module.
  //
  // When V8 fixes this bug, we can remove this check. We usually don't have package-specific hacks,
  // but Jest is a big Babel consumer widely used in the community and they cannot workaround
  // this problem on their side.
  !Object.hasOwnProperty.call(global, "jest-symbol-do-not-touch")
    ? import_("data:text/javascript,export default import.meta.resolve").then(
        // Since import.meta.resolve is unstable and only available when
        // using the --experimental-import-meta-resolve flag, we almost
        // always use the polyfill for now.
        m => m.default || polyfill,
        () => polyfill,
      )
    : Promise.resolve(polyfill);

export default function getImportMetaResolve(): Promise<ImportMeta["resolve"]> {
  return resolveP;
}
