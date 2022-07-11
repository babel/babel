import { createRequire } from "module";
import { resolve as polyfill } from "../../vendor/import-meta-resolve";

const require = createRequire(import.meta.url);

let import_;
try {
  // Node < 13.3 doesn't support import() syntax.
  import_ = require("./import.cjs");
} catch {}

// import.meta.resolve is only available in ESM, but this file is compiled to CJS.
// We can extract it using dynamic import.
const importMetaResolveP: Promise<ImportMeta["resolve"]> =
  import_ &&
  // Due to a Node.js/V8 bug (https://github.com/nodejs/node/issues/35889), we cannot
  // use always dynamic import because it segfaults when running in a Node.js `vm` context,
  // which is used by the default Jest environment and by webpack-cli.
  //
  // However, import.meta.resolve is experimental and only enabled when Node.js is run
  // with the `--experimental-import-meta-resolve` flag: we can avoid calling import()
  // when that flag is not enabled, so that the default behavior never segfaults.
  //
  // Hopefully, before Node.js unflags import.meta.resolve, either:
  // - we will move to ESM, so that we have direct access to import.meta.resolve, or
  // - the V8 bug will be fixed so that we can safely use dynamic import by default.
  //
  // I (@nicolo-ribaudo) am really anoyed by this bug, because there is no known
  // work-around other than "don't use dynamic import if you are running in a `vm` context",
  // but there is no reliable way to detect it (you cannot try/catch segfaults).
  //
  // This is the only place where we *need* to use dynamic import because we need to access
  // an ES module. All the other places will first try using require() and *then*, if
  // it throws because it's a module, will fallback to import().
  process.execArgv.includes("--experimental-import-meta-resolve")
    ? import_("data:text/javascript,export default import.meta.resolve").then(
        (m: { default: ImportMeta["resolve"] | undefined }) =>
          m.default || polyfill,
        () => polyfill,
      )
    : Promise.resolve(polyfill);

export default async function resolve(
  specifier: Parameters<ImportMeta["resolve"]>[0],
  parent?: Parameters<ImportMeta["resolve"]>[1],
): ReturnType<ImportMeta["resolve"]> {
  return (await importMetaResolveP)(specifier, parent);
}
