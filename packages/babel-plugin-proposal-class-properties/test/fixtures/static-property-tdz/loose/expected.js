function _classNameTDZError(name) { throw new Error("Class \"" + name + "\" cannot be referenced in computed property keys."); }

class C {}

var _ref = (_classNameTDZError("C"), C) + 3;

C[_ref] = 3;
