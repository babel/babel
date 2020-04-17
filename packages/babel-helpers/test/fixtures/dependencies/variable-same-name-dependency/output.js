function _$_variableSameNameDependency_main() { let x = _$_variableSameNameDependency_dependency; return function (dep) { return x() + dep; }; }

function _$_variableSameNameDependency_dependency() {}

_$_variableSameNameDependency_main;
