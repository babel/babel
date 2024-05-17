/* @minVersion 7.0.0-beta.0 */

function asyncGeneratorStep<T>(
  gen: Generator<T, any, unknown>,
  resolve: (value: T) => void,
  reject: (error: any) => void,
  _next: (value: T) => void,
  _throw: (err: any) => void,
  key: "next" | "throw",
  arg: T,
) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value as T);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

export default function _asyncToGenerator(fn: GeneratorFunction) {
  return function (this: any) {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args as any);
      function _next(value: any) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err: any) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}
