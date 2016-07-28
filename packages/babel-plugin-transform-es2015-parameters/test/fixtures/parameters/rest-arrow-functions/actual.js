var concat = (...arrs) => {
  var x = arrs[0];
  var y = arrs[1];
};

var somefun = function () {
  let get2ndArg = (a, b, ...args1) => {
    var _b = args1[0];
    let somef = (x, y, z, ...args2) => {
      var _a = args2[0];
    };
    let somefg = (c, d, e, f, ...args3) => {
      var _a = args3[0];
    };
    var _d = args1[1];
  };
  let get3rdArg = (...args) => args[2];
}

function demo1(...args) {
  return (i) => {
    return args[i+0];
  };
}

var x = (...rest) => {
  if (noNeedToWork) return 0;
  return rest;
};

var innerclassproperties = (...args) => (
  class {
    static args = args;
    args = args;
  }
);