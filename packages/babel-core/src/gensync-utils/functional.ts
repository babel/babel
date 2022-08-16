import type { Handler } from "gensync";

import { isAsync, waitFor } from "./async";

export function once<R>(fn: () => Handler<R>): () => Handler<R> {
  let result: R;
  let resultP: Promise<R>;
  return function* () {
    if (result) return result;
    if (!(yield* isAsync())) return (result = yield* fn());
    if (resultP) return yield* waitFor(resultP);

    let resolve: (result: R) => void, reject: (error: unknown) => void;
    resultP = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });

    try {
      result = yield* fn();
      // Avoid keeping the promise around
      // now that we have the result.
      resultP = null;
      resolve(result);
      return result;
    } catch (error) {
      reject(error);
      throw error;
    }
  };
}
