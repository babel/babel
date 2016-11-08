function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function render(_ref) {
  let text = _ref.text,
      className = _ref.className,
      id = _ref.id,
      props = _objectWithoutProperties(_ref, ["text", "className", "id"]);

  var _ref2 = <Component text={text} className={className} id={id} />;

  // intentionally ignoring props
  return () => _ref2;
}
