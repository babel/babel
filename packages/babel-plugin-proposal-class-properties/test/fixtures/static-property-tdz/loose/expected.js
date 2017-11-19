class C {}

var _ref = (function () {
  throw new Error("Class cannot be referenced in computed property keys.");
}(), C) + 3;

C[_ref] = 3;
