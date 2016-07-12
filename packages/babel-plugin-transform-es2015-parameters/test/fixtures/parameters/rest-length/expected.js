var t = function (f) {
  arguments.length <= 1 ? undefined : arguments[1];
  arguments.length <= (arguments.length <= 1 ? 0 : arguments.length - 1) - 1 + 1 ? undefined : arguments[(arguments.length <= 1 ? 0 : arguments.length - 1) - 1 + 1];
};

function t(f) {
  for (var _len = arguments.length, items = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    items[_key - 1] = arguments[_key];
  }

  items;
  items[0];
  items[items.length - 1];
}