function fn() {}

export default function () {}
var a = {
  fn() {},

  fn: function () {},
  [fn]: function () {},
  ["fn"]: function () {},
  [function () {}]: function () {},
  [() => {}]: function () {},

  [fn]() {},

  ["fn"]() {},

  [function () {}]() {},

  [() => {}]() {}

};

class b {
  fn() {}

  fn = function () {};
  [fn] = function () {};
  ["fn"] = function () {};
  [function () {}] = function () {};
  [() => {}] = function () {};

  [fn]() {}

  ["fn"]() {}

  [function () {}]() {}

  [() => {}]() {}

}

var aa = {
  fn: function a() {},
  [fn]: function a() {},
  ["fn"]: function a() {},
  [function () {}]: function a() {},
  [() => {}]: function a() {}
};

class bb {
  fn = function a() {};
  [fn] = function a() {};
  ["fn"] = function a() {};
  [function () {}] = function a() {};
  [() => {}] = function a() {};
}

var x = function fn() {};

var x = function () {};

(function fn() {});

var z = () => {};

var z = x => {};

var z = x => {};

var z = (x, y, z) => {};