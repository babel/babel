% Enforces that all workspaces depend on other workspaces using `workspace:*` in devDependencies
gen_enforced_dependency(WorkspaceCwd, DependencyIdent, 'workspace:*', 'devDependencies') :-
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, DependencyRange, 'devDependencies'),
  % Only consider dependency ranges that start with 'workspace:'
  atom_concat('workspace:', _, DependencyRange).
