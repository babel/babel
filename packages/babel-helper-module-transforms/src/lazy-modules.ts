// TODO: Move `lazy` implementation logic into the CommonJS plugin, since other
// modules systems do not support `lazy`.

import { types as t } from "@babel/core";
import {
  type SourceModuleMetadata,
  isSideEffectImport,
} from "./normalize-and-load-metadata.ts";

export type Lazy = boolean | string[] | ((source: string) => boolean);

export function toGetWrapperPayload(lazy: Lazy) {
  return (
    source: string,
    metadata: SourceModuleMetadata,
    importNodes: t.Node[] = [],
  ): null | "lazy" => {
    if (lazy === false) return null;
    if (isSideEffectImport(metadata) || metadata.reexportAll) return null;
    // Lazy loading has different semantics from `import defer`, so it must
    // not be used as a fallback for it.
    if (hasDeferredImport(importNodes)) return null;
    if (lazy === true) {
      // 'true' means that local relative files are eagerly loaded and
      // dependency modules are loaded lazily.
      return source.includes(".") ? null : "lazy";
    }
    if (Array.isArray(lazy)) {
      return !lazy.includes(source) ? null : "lazy";
    }
    if (typeof lazy === "function") {
      return lazy(source) ? "lazy" : null;
    }
    throw new Error(`.lazy must be a boolean, string array, or function`);
  };
}

function hasDeferredImport(importNodes: t.Node[]) {
  return importNodes.some(
    node => t.isImportDeclaration(node) && node.phase === "defer",
  );
}

export function wrapReference(
  ref: t.Expression,
  payload: unknown,
): t.Expression | null {
  if (payload === "lazy") return t.callExpression(ref, []);
  return null;
}
