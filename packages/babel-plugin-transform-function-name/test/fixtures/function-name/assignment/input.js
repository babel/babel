var i = function () {
  i = 5;
};

var j = function () {
  ({ j } = 5);
  ({ y: j } = 5);
  ;
};
