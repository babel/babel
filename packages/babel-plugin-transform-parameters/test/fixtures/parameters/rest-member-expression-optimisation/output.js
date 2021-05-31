var t = function () {
  var x = arguments.length <= 0 ? undefined : arguments[0];
  var y = arguments.length <= 1 ? undefined : arguments[1];
};

function t() {
  var x = arguments.length <= 0 ? undefined : arguments[0];
  var y = arguments.length <= 1 ? undefined : arguments[1];
}

function t() {
  var a = [];

  for (var i = 0; i < arguments.length; i++) {
    a.push(i);
  }

  return a;
} // https://github.com/babel/babel/pull/2833#issuecomment-166039291


function t() {
  for (var i = 0; i < arguments.length; i++) {
    return i < 0 || arguments.length <= i ? undefined : arguments[i];
  }
}
