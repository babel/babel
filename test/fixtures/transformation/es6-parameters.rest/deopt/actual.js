var x = function (foo, ...bar) {
  console.log(bar);
};

var y = function (foo, ...bar) {
  var x = function z(bar) {
    bar[1] = 5;
  };
};

var z = function (foo, ...bar) {
    var x = function () {
        bar[1] = 5;
    };
};
