import type { types as t, File } from "@babel/core";
import type { isSideEffectImport } from "@babel/helper-module-transforms";

const commonJSHooksKey =
  "@babel/plugin-transform-modules-commonjs/customWrapperPlugin";

type SourceMetadata = Parameters<typeof isSideEffectImport>[0];

export interface CommonJSHook {
  name: string;
  version: string;
  wrapReference?(ref: t.Expression, payload: unknown): t.CallExpression | null;
  buildRequireWrapper?(
    name: string,
    init: t.Expression,
    payload: unknown,
    referenced: boolean,
  ): t.Statement | false | null;
  getWrapperPayload?(
    source: string,
    metadata: SourceMetadata,
    importNodes: t.Node[],
  ): string | null;
}

export function defineCommonJSHook(file: File, hook: CommonJSHook) {
  let hooks = file.get(commonJSHooksKey);
  if (!hooks) file.set(commonJSHooksKey, (hooks = []));
  hooks.push(hook);
}

function findMap<T, U>(arr: T[] | null, cb: (el: T) => U): U | null {
  if (arr) {
    for (const el of arr) {
      const res = cb(el);
      if (res != null) return res;
    }
  }
}

export function makeInvokers(
  file: File,
): Pick<
  CommonJSHook,
  "wrapReference" | "getWrapperPayload" | "buildRequireWrapper"
> {
  const hooks: CommonJSHook[] | null = file.get(commonJSHooksKey);

  return {
    getWrapperPayload(...args) {
      return findMap(hooks, hook => hook.getWrapperPayload?.(...args));
    },
    wrapReference(...args) {
      return findMap(hooks, hook => hook.wrapReference?.(...args));
    },
    buildRequireWrapper(...args) {
      return findMap(hooks, hook => hook.buildRequireWrapper?.(...args));
    },
  };
}
