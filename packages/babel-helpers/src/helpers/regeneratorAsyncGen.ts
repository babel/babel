/* @minVersion 7.27.0 */

import AsyncIterator from "./regeneratorAsyncIterator.ts";
import regenerator from "./regenerator.ts";

export default function _regeneratorAsyncGen(
  innerFn: Function,
  outerFn: Function,
  self: any,
  tryLocsList: any[],
  PromiseImpl: PromiseConstructor | undefined,
) {
  return new (AsyncIterator as any)(
    regenerator().w(innerFn as any, outerFn, self, tryLocsList),
    PromiseImpl || Promise,
  );
}
