/* @minVersion 7.0.0-beta.0 */

function asyncGeneratorStep<TYield, TReturn>(
  gen: Generator<TYield, TReturn, Awaited<TYield>>,
  resolve: (value: TReturn) => void,
  reject: (error: unknown) => void,
  _next: (value: Awaited<TYield> | undefined) => void,
  _throw: (err: unknown) => void,
  key: "next",
  arg: Awaited<TYield> | undefined,
): void;
function asyncGeneratorStep<TYield, TReturn>(
  gen: Generator<TYield, TReturn, Awaited<TYield>>,
  resolve: (value: TReturn) => void,
  reject: (error: unknown) => void,
  _next: (value: Awaited<TYield> | undefined) => void,
  _throw: (err: unknown) => void,
  key: "throw",
  arg: unknown,
): void;
function asyncGeneratorStep<TYield, TReturn>(
  gen: Generator<TYield, TReturn, Awaited<TYield>>,
  resolve: (value: TReturn) => void,
  reject: (error: unknown) => void,
  _next: (value: Awaited<TYield> | undefined) => void,
  _throw: (err: unknown) => void,
  key: "next" | "throw",
  arg: any,
): void {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    // The "value" variable is defined above before the "info.done" guard
    // So TypeScript can't narrowing "value" to TReturn here
    // If we use "info.value" here the type is narrowed correctly.
    // Still requires manual casting for the smaller bundle size.
    resolve(value as TReturn);
  } else {
    // Same as above, TypeScript can't narrow "value" to TYield here
    Promise.resolve(value as TYield).then(_next, _throw);
  }
}

export default function _asyncToGenerator<
  This,
  Args extends unknown[],
  TYield,
  TReturn,
>(
  fn: (
    this: This,
    ...args: Args
  ) => Generator<TYield, TReturn, Awaited<TYield>>,
): (this: This, ...args: Args) => Promise<TReturn> {
  return function (this: any) {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      // Casting "args" to "Args" is intentional since we are trying to avoid the spread operator (not ES5)
      var gen = fn.apply(self, args as any as Args);
      function _next(value: Awaited<TYield> | undefined) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err: unknown) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}
