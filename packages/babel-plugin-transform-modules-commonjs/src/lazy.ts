import { template, types as t } from "@babel/core";
import { isSideEffectImport } from "@babel/helper-module-transforms";
import type { CommonJSHook } from "./hooks.ts";

type Lazy = boolean | string[] | ((source: string) => boolean);

export const lazyImportsHook = (lazy: Lazy): CommonJSHook => ({
  name: `${PACKAGE_JSON.name}/lazy`,
  version: PACKAGE_JSON.version,
  getWrapperPayload(source, metadata) {
    if (isSideEffectImport(metadata) || metadata.reexportAll) {
      return null;
    }
    if (lazy === true) {
      // 'true' means that local relative files are eagerly loaded and
      // dependency modules are loaded lazily.
      return source.includes(".") ? null : "lazy/function";
    }
    if (Array.isArray(lazy)) {
      return !lazy.includes(source) ? null : "lazy/function";
    }
    if (typeof lazy === "function") {
      return lazy(source) ? "lazy/function" : null;
    }
  },
  buildRequireWrapper(name, init, payload, referenced) {
    if (payload === "lazy/function") {
      if (!referenced) return false;
      return template.statement.ast`
        function ${name}() {
          const data = ${init};
          ${name} = function(){ return data; };
          return data;
        }
      `;
    }
  },
  wrapReference(ref, payload) {
    if (payload === "lazy/function") return t.callExpression(ref, []);
  },
});
