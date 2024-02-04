import type { Handler } from "gensync";

import { isAsync, waitFor } from "./async.ts";

export function once<R>(fn: () => Handler<R>): () => Handler<R> {
  let result: { ok: true; value: R } | { ok: false; value: unknown };
  let resultP: Promise<R>;
  let promiseReferenced = false;
  return function* () {
    if (!result) {
      if (resultP) {
        promiseReferenced = true;
        return yield* waitFor(resultP);
      }

      if (!(yield* isAsync())) {
        try {
          result = { ok: true, value: yield* fn() };
        } catch (error) {
          result = { ok: false, value: error };
        }
      } else {
        let resolve: (result: R) => void, reject: (error: unknown) => void;
        resultP = new Promise((res, rej) => {
          resolve = res;
          reject = rej;
        });

        try {
          result = { ok: true, value: yield* fn() };
          // Avoid keeping the promise around
          // now that we have the result.
          resultP = null;
          // We only resolve/reject the promise if it has been actually
          // referenced. If there are no listeners we can forget about it.
          // In the reject case, this avoid uncatchable unhandledRejection
          // events.
          if (promiseReferenced) resolve(result.value);
        } catch (error) {
          result = { ok: false, value: error };
          resultP = null;
          if (promiseReferenced) reject(error);
        }
      }
    }

    if (result.ok) return result.value;
    else throw result.value;
  };
}
