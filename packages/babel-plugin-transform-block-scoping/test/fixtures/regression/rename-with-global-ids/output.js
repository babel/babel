// https://github.com/babel/babel/pull/15361

function fooBar(arrayOfThings) {
  var _loop = function () {
    var thing = arrayOfThings[_index];
    var someMapObj = {};
    var arrow = x => someMapObj;
    arrow(0);
  };
  for (var _index = 0; _index < arrayOfThings.length; _index++) {
    _loop();
  }
}
fooBar([1, 2, 3]);
