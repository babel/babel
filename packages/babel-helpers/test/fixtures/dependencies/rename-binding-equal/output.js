let _foo = "main";

function _$_renameBindingEqual_main() { return _$_renameBindingEqual_dependency() + _foo; }

let foo = "dependency";

function _$_renameBindingEqual_dependency() { return foo; }

_$_renameBindingEqual_main;
