/* @minVersion 7.27.0 */

import AsyncIterator from "./regeneratorAsyncIterator.ts";
import regeneratorRuntime from "./regeneratorRuntime.ts";

export default function _regeneratorAsync(
  innerFn: Function,
  outerFn: Function,
  self: any,
  tryLocsList: any[],
  PromiseImpl: PromiseConstructor,
) {
  if (PromiseImpl == null) PromiseImpl = Promise;

  var r = regeneratorRuntime();

  var iter = new (AsyncIterator as any)(
    r.wrap(innerFn, outerFn, self, tryLocsList),
    PromiseImpl,
  );

  return r.isGeneratorFunction(outerFn)
    ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result: IteratorResult<any>) {
        return result.done ? result.value : iter.next();
      });
}
