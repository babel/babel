/* @minVersion 7.27.0 */

import asyncGen from "./regeneratorAsyncGen.ts";

export default function _regeneratorAsync(
  innerFn: Function,
  outerFn: Function,
  self: any,
  tryLocsList: any[],
  PromiseImpl: PromiseConstructor | undefined,
) {
  var iter = asyncGen(innerFn, outerFn, self, tryLocsList, PromiseImpl);
  return iter.next().then(function (result: IteratorResult<any>) {
    return result.done ? result.value : iter.next();
  });
}
