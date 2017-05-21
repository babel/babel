function _objectWithoutProperties(obj, keys) { var target = {}; var objKeys = Object.keys(obj); if (Object.getOwnPropertySymbols) { objKeys = objKeys.concat(Object.getOwnPropertySymbols(obj)); } for (var i = 0; i < objKeys.length; i++) { key = objKeys[i]; if (!Object.prototype.propertyIsEnumerable.call(obj, key)) continue; if (keys.indexOf(key) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, key)) continue; target[key] = obj[key]; } return target; }

function render(_ref) {
  let text = _ref.text,
      className = _ref.className,
      id = _ref.id,
      props = _objectWithoutProperties(_ref, ["text", "className", "id"]);

  return () => <Component text={text} className={className} id={id} {...props} />;
}