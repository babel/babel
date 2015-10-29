var some = function () {
  let count = arguments.length <= 0 || arguments[0] === undefined ? "30" : arguments[0];

  console.log("count", count);
};

some();
