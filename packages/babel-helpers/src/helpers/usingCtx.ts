/* @minVersion 7.23.9 */

type Stack =
  | {
      v: Disposable | AsyncDisposable;
      d: null | undefined | DisposeLike;
      a: boolean;
    }
  | {
      d: null | undefined;
      a: true;
    };

type DisposeLike = () => void | PromiseLike<void>;

interface UsingCtxReturn {
  e: object;
  u: (value: Disposable | null | undefined) => Disposable | null | undefined;
  a: (
    value: AsyncDisposable | Disposable | null | undefined,
  ) => AsyncDisposable | Disposable | null | undefined;
  d: DisposeLike;
}

export default function _usingCtx(): UsingCtxReturn {
  var _disposeSuppressedError =
      typeof SuppressedError === "function"
        ? SuppressedError
        : (function (error: Error, suppressed: Error) {
            var err = new Error() as SuppressedError;
            err.name = "SuppressedError";
            err.error = error;
            err.suppressed = suppressed;
            return err;
          } as SuppressedErrorConstructor),
    empty = {},
    stack: Stack[] = [];
  function using(
    isAwait: true,
    value: AsyncDisposable | Disposable | null | undefined,
  ): AsyncDisposable | Disposable | null | undefined;
  function using(
    isAwait: false,
    value: Disposable | null | undefined,
  ): Disposable | null | undefined;
  function using(
    isAwait: boolean,
    value: AsyncDisposable | Disposable | null | undefined,
  ): AsyncDisposable | Disposable | null | undefined {
    if (value != null) {
      if (Object(value) !== value) {
        throw new TypeError(
          "using declarations can only be used with objects, functions, null, or undefined.",
        );
      }
      // core-js-pure uses Symbol.for for polyfilling well-known symbols
      if (isAwait) {
        // value can either be an AsyncDisposable or a Disposable
        // Try AsyncDisposable first
        var dispose: DisposeLike | null | undefined = (
          value as AsyncDisposable
        )[Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")];
      }
      if (dispose == null) {
        dispose = (value as Disposable)[
          Symbol.dispose || Symbol.for("Symbol.dispose")
        ];
      }
      if (typeof dispose !== "function") {
        throw new TypeError(`Property [Symbol.dispose] is not a function.`);
      }
      stack.push({ v: value, d: dispose, a: isAwait });
    } else if (isAwait) {
      // provide the nullish `value` as `d` for minification gain
      stack.push({ d: value, a: isAwait });
    }
    return value;
  }
  return {
    // error
    e: empty,
    // using
    u: using.bind(null, false),
    // await using
    // full generic signature to avoid type widening
    a: using.bind<
      null,
      [true],
      [AsyncDisposable | Disposable | null | undefined],
      AsyncDisposable | Disposable | null | undefined
    >(null, true),
    // dispose
    d: function () {
      var error = this.e;

      function next(): Promise<void> | void {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        while ((resource = stack.pop())) {
          try {
            var resource,
              disposalResult = resource.d && resource.d.call(resource.v);
            if (resource.a) {
              return Promise.resolve(disposalResult).then(next, err);
            }
          } catch (e) {
            return err(e as Error);
          }
        }
        if (error !== empty) throw error;
      }

      function err(e: Error): Promise<void> | void {
        error = error !== empty ? new _disposeSuppressedError(e, error) : e;

        return next();
      }

      return next();
    },
  } satisfies UsingCtxReturn;
}
