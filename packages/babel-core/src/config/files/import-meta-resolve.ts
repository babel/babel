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
const resolveP = import_
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
