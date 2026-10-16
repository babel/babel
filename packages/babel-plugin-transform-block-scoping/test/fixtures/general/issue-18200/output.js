var arr = {};
var _loop = function () {
  for (var x = (arr[i] = function () {
    return x;
  }, i); false;);
};
for (var i = 0; i < 2; i++) {
  _loop();
}
expect(arr[0]()).toBe(0);
expect(arr[1]()).toBe(1);
