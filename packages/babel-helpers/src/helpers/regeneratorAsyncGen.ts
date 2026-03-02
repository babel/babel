/* @minVersion 7.27.0 */
/* @mangleFns */

import regenerator from "./regenerator.ts";
import regeneratorAsyncIterator from "./regeneratorAsyncIterator.ts";

export default /* @no-mangle */ function _regeneratorAsyncGen(
  innerFn: Function,
  outerFn: Function,
  self: any,
  tryLocsList: any[],
  PromiseImpl: PromiseConstructor | undefined,
) {
  return new (regeneratorAsyncIterator as any)(
    regenerator().w(innerFn as any, outerFn, self, tryLocsList),
    PromiseImpl || Promise,
  );
}
