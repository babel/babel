var seattlers = function () {
  var _arr = [];
  customers.forEach(function (c) {
    if (c.city == "Seattle") {
      _arr.push({
        name: c.name,
        age: c.age
      });
    }
  });
  return _arr;
}();
