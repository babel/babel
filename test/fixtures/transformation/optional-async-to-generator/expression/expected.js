"use strict";

var _asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);

    return new Promise(function (resolve, reject) {
      function step(getNext) {
        var next;
        try {
          next = getNext();
        } catch (e) {
          reject(e);

          return;
        }
        if (next.done) {
          resolve(next.value);

          return;
        }
        Promise.resolve(next.value).then(function (v) {
          step(function () {
            return gen.next(v);
          });
        }, function (e) {
          step(function () {
            return gen["throw"](e);
          });
        });
      }

      step(function () {
        return gen.next();
      });
    });
  };
};

var foo = _asyncToGenerator(function* () {
  var wat = yield bar();
});
