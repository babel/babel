var concat = (..._ref) => {
  let [...arrs] = [..._ref];

  var x = arrs[0];
  var y = arrs[1];
};

var somefun = function () {
  let get2ndArg = (a, b, ..._ref2) => {
    let [,, ...args1] = [,, ..._ref2];

    var _b = args1[0];
    let somef = (x, y, z, ..._ref3) => {
      let [,,, ...args2] = [,,, ..._ref3];

      var _a = args2[0];
    };
    let somefg = (c, d, e, f, ..._ref4) => {
      let [,,,, ...args3] = [,,,, ..._ref4];

      var _a = args3[0];
    };
    var _d = args1[1];
  };
  let get3rdArg = (..._ref5) => {
    let [...args] = [..._ref5];
    return args[2];
  };
};

function demo1(..._ref6) {
  let [...args] = [..._ref6];

  return i => {
    return args[i + 0];
  };
}

var x = (..._ref7) => {
  let [...rest] = [..._ref7];

  if (noNeedToWork) return 0;
  return rest;
};

var innerclassproperties = (..._ref8) => {
  var _class, _temp;

  let [...args] = [..._ref8];
  return _temp = _class = class {
    constructor() {
      this.args = args;
    }

  }, _class.args = args, _temp;
};