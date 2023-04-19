import { resolve as polyfill } from "../../vendor/import-meta-resolve";

declare const USE_ESM: boolean;

let importMetaResolve: ImportMeta["resolve"];

if (USE_ESM) {
  // Node.js < 20, when using the `--experimental-import-meta-resolve` flag,
  // have an asynchronous implementation of import.meta.resolve.
  if (
    typeof import.meta.resolve === "function" &&
    typeof import.meta.resolve(import.meta.url) === "string"
  ) {
    importMetaResolve = import.meta.resolve;
  } else {
    importMetaResolve = polyfill;
  }
} else {
  importMetaResolve = polyfill;
}

export default function resolve(
  specifier: string,
  parent?: string | URL,
): string {
  // @ts-expect-error: TS defines import.meta.resolve as returning a promises
  return importMetaResolve(specifier, parent);
}
