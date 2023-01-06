var a = babelHelpers.temporalUndefined;
import { foo } from "somewhere";

// foo might call "bar"
foo();
babelHelpers.tdz("a");
var a = void 0;
a;
export function bar() {
  return babelHelpers.temporalRef(a, "a");
}
