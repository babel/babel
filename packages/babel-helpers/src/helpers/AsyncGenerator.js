/* @minVersion 7.0.0-beta.0 */

import OverloadYield from "OverloadYield";

export default function AsyncGenerator(gen) {
  var front, back;

  function send(key, arg) {
    return new Promise(function (resolve, reject) {
      var request = {
        key: key,
        arg: arg,
        resolve: resolve,
        reject: reject,
        next: null,
      };

      if (back) {
        back = back.next = request;
      } else {
        front = back = request;
        resume(key, arg);
      }
    });
  }

  function resume(key, arg) {
    try {
      var result = gen[key](arg);
      var value = result.value;
      var overloaded = value instanceof OverloadYield;

      Promise.resolve(overloaded ? value.v : value).then(
        function (arg) {
          if (overloaded) {
            // Overloaded yield requires calling into the generator twice:
            //  - first we get the iterator result wrapped in a promise
            //    (the gen[key](arg) call above)
            //  - then we await it (the Promise.resolve call above)
            //  - then we give the result back to the iterator, so that it can:
            //    * if it was an await, use its result
            //    * if it was a yield*, possibly return the `done: true` signal
            //      so that yield* knows that the iterator is finished.
            //      This needs to happen in the second call, because in the
            //      first one `done: true` was hidden in the promise and thus
            //      not visible to the (sync) yield*.
            //      The other part of this implementation is in asyncGeneratorDelegate.
            var nextKey = key === "return" ? "return" : "next";
            if (!value.k || arg.done) {
              // await or end of yield*
              return resume(nextKey, arg);
            } else {
              // yield*, not done
              arg = gen[nextKey](arg).value;
            }
          }

          settle(result.done ? "return" : "normal", arg);
        },
        function (err) {
          resume("throw", err);
        },
      );
    } catch (err) {
      settle("throw", err);
    }
  }

  function settle(type, value) {
    switch (type) {
      case "return":
        front.resolve({ value: value, done: true });
        break;
      case "throw":
        front.reject(value);
        break;
      default:
        front.resolve({ value: value, done: false });
        break;
    }

    front = front.next;
    if (front) {
      resume(front.key, front.arg);
    } else {
      back = null;
    }
  }

  this._invoke = send;

  // Hide "return" method if generator return is not supported
  if (typeof gen.return !== "function") {
    this.return = undefined;
  }
}

AsyncGenerator.prototype[
  (typeof Symbol === "function" && Symbol.asyncIterator) || "@@asyncIterator"
] = function () {
  return this;
};

AsyncGenerator.prototype.next = function (arg) {
  return this._invoke("next", arg);
};
AsyncGenerator.prototype.throw = function (arg) {
  return this._invoke("throw", arg);
};
AsyncGenerator.prototype.return = function (arg) {
  return this._invoke("return", arg);
};
