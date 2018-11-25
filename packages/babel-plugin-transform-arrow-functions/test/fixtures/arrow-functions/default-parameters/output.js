var some = function () {
  let count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "30";
  console.log("count", count);
};

var collect = function () {
  let since = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  let userid = arguments.length > 1 ? arguments[1] : undefined;
  console.log(userid);
};
