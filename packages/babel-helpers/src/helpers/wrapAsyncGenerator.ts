/* @minVersion 7.0.0-beta.0 */

import AsyncGenerator from "./AsyncGenerator.ts";

export default function _wrapAsyncGenerator(fn: GeneratorFunction) {
  return function (this: any) {
    // Use "arguments" here for better compatibility and smaller bundle size
    return new AsyncGenerator(fn.apply(this, arguments as any));
  };
}
