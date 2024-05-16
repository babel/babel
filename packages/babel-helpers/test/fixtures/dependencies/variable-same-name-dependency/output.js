function _$_variableSameNameDependency_main() { let x = _$_variableSameNameDependency_dependency; return function (dep) { return x() + dep; }; }
function _$_variableSameNameDependency_dependency() {}
_$_variableSameNameDependency_main;
/*"main" metadata:    {
      globals: [],
      localBindingNames: [],
      exportBindingAssignments: [],
      exportPath: "body.0",
      exportName: "helper",
      dependencies: {"_$_variable-same-name-dependency_dependency":["body.0.declaration.body.body.0.declarations.0.init"]},
    }
  */
