var x = function (foo, ...bar) {
  console.log(bar);
};

var y = function (foo, ...bar) {
  var x = function z(bar) {
    bar[1] = 5;
  };
};

var b = function (x, y, ...args) {
  console.log(args[0]);
  args.pop();
  console.log(args[1]);
};

var z = function (foo, ...bar) {
  var x = function () {
    bar[1] = 5;
  };
};

var a = function (foo, ...bar) {
  return bar.join(",");
};

var b = function (foo, ...bar) {
  var join = "join";
  return bar[join];
};
