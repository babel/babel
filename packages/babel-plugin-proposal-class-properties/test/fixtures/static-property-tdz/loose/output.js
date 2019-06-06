let _ref;

function _classNameTDZError(name) { throw new Error("Class \"" + name + "\" cannot be referenced in computed property keys."); }

_ref = (_classNameTDZError("C"), C) + 3;

class C {}

C[_ref] = 3;
