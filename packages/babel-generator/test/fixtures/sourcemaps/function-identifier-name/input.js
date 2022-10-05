function fn() {}

export default function () {}

var a = {
  fn() {},
  fn:function() {},
  [fn]:function() {},
  ["fn"]:function() {},
  [function() {}]:function() {},
  [()=> {}]:function() {},
}

var x = function fn() {};
var y = function fn() {};

() => {};
x => {};
(x) => {};
(x, y, z) => {};
