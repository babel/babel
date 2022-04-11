var _obj = obj;
a = _obj.a;
b = _obj.b;
c = babelHelpers.objectWithoutPropertiesLoose(_obj, ["a", "b"]);
_obj;
