var _loop = function (_index) {
  _index++;
  () => _index;
  index = _index;
};
for (var index = 0; index < 10; index++) {
  _loop(index);
}
