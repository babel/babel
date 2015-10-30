var some = function () {
  let count = arguments.length <= 0 || arguments[0] === undefined ? "30" : arguments[0];

  console.log("count", count);
};

var collect = function () {
  let since = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  let userid = arguments[1];

  console.log(userid);
};
