% Enforces that all workspaces depend on other workspaces using `workspace:^`
gen_enforced_dependency(WorkspaceCwd, DependencyIdent, 'workspace:^', DependencyType) :-
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, DependencyRange, DependencyType),
  % Only consider dependency ranges that start with 'workspace:'
  atom_concat('workspace:', _, DependencyRange),
  % Only consider 'dependencies' and 'devDependencies'
  (DependencyType = 'dependencies'; DependencyType = 'devDependencies').

% Enforces the license in all public workspaces while removing it from private workspaces
gen_enforced_field(WorkspaceCwd, 'license', 'MIT') :-
  \+ workspace_field(WorkspaceCwd, 'private', true).
gen_enforced_field(WorkspaceCwd, 'license', null) :-
  workspace_field(WorkspaceCwd, 'private', true).

% Enforces the repository field for all public workspaces while removing it from private workspaces
gen_enforced_field(WorkspaceCwd, 'repository.type', 'git') :-
  \+ workspace_field(WorkspaceCwd, 'private', true).
gen_enforced_field(WorkspaceCwd, 'repository.url', 'https://github.com/babel/babel.git') :-
  \+ workspace_field(WorkspaceCwd, 'private', true).
gen_enforced_field(WorkspaceCwd, 'repository.directory', WorkspaceCwd) :-
  \+ workspace_field(WorkspaceCwd, 'private', true).
gen_enforced_field(WorkspaceCwd, 'repository', null) :-
  workspace_field(WorkspaceCwd, 'private', true).

% Enforces 'publishConfig.access' is set to public for public workspaces while removing it from private workspaces
gen_enforced_field(WorkspaceCwd, 'publishConfig.access', 'public') :-
  \+ workspace_field(WorkspaceCwd, 'private', true).
gen_enforced_field(WorkspaceCwd, 'publishConfig.access', null) :-
  workspace_field(WorkspaceCwd, 'private', true).

% Enforces the engines.node field for all workspaces except '@babel/eslint*'
% TODO(Babel 8): Enforce '^18.16.0 || >=20.0.0' for al workspaces
gen_enforced_field(WorkspaceCwd, 'engines.node', '>=6.9.0') :-
  \+ workspace_field(WorkspaceCwd, 'private', true),
  % Get the workspace name
  workspace_ident(WorkspaceCwd, WorkspaceIdent),
  % Exempt from the rule as it supports '>=6.0.0'. TODO: remove with the next major
  WorkspaceIdent \= '@babel/parser',
  % Skip '@babel/eslint*' workspaces. TODO: remove with the next major
  \+ atom_concat('@babel/eslint', _, WorkspaceIdent).

% Enforces the engines.node field for '@babel/eslint*' workspaces
% TODO: remove with the next major
gen_enforced_field(WorkspaceCwd, 'engines.node', '^10.13.0 || ^12.13.0 || >=14.0.0') :-
  \+ workspace_field(WorkspaceCwd, 'private', true),
  % Get the workspace name
  workspace_ident(WorkspaceCwd, WorkspaceIdent),
  % Only target '@babel/eslint*' workspaces
  atom_concat('@babel/eslint', _, WorkspaceIdent).

% (Babel 8) Enforces the engines.node field for all workspaces except private ones
gen_enforced_field(WorkspaceCwd, 'conditions.BABEL_8_BREAKING.0.engines.node', '^16.20.0 || ^18.16.0 || >=20.0.0') :-
  \+ workspace_field(WorkspaceCwd, 'private', true).

% Ensure that the BABEL_8_BREAKING condition has both 'yes' and 'no' cases
gen_enforced_field(WorkspaceCwd, 'conditions.BABEL_8_BREAKING.1', {}) :-
  workspace_field(WorkspaceCwd, 'conditions.BABEL_8_BREAKING.0', _),
  \+ workspace_field(WorkspaceCwd, 'conditions.BABEL_8_BREAKING.1', _).

% Removes the 'engines.node' field from private workspaces
gen_enforced_field(WorkspaceCwd, 'engines.node', null) :-
  workspace_field(WorkspaceCwd, 'private', true).

% Enforces the author field to be consistent
gen_enforced_field(WorkspaceCwd, 'author', 'The Babel Team (https://babel.dev/team)') :-
  \+ workspace_field(WorkspaceCwd, 'private', true).
gen_enforced_field(WorkspaceCwd, 'author', null) :-
  workspace_field(WorkspaceCwd, 'private', true).

% Enforces the main and types field to start with ./
gen_enforced_field(WorkspaceCwd, FieldName, ExpectedValue) :-
  % Fields the rule applies to
  member(FieldName, ['main', 'types']),
  % Get current value
  workspace_field(WorkspaceCwd, FieldName, CurrentValue),
  % Must not start with ./ already
  \+ atom_concat('./', _, CurrentValue),
  % Store './' + CurrentValue in ExpectedValue
  atom_concat('./', CurrentValue, ExpectedValue).

% Enforces that a dependency doesn't appear in both `dependencies` and `devDependencies`
gen_enforced_dependency(WorkspaceCwd, DependencyIdent, null, 'devDependencies') :-
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, _, 'devDependencies'),
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, _, 'dependencies').

% Enforces `exports` to be consistent
gen_enforced_field(WorkspaceCwd, 'exports', '{ ".": "./lib/index.js", "./package.json": "./package.json" }') :-
  \+ workspace_field(WorkspaceCwd, 'private', true),
  % Exclude packages with more complex `exports`
  workspace_ident(WorkspaceCwd, WorkspaceIdent),
  WorkspaceIdent \= '@babel/compat-data',
  WorkspaceIdent \= '@babel/helper-plugin-test-runner', % TODO: Remove in Babel 8
  WorkspaceIdent \= '@babel/parser',
  WorkspaceIdent \= '@babel/plugin-transform-react-jsx', % TODO: Remove in Babel 8
  WorkspaceIdent \= '@babel/standalone',
  WorkspaceIdent \= '@babel/types', % @babel/types has types exports
  \+ atom_concat('@babel/eslint-', _, WorkspaceIdent),
  \+ atom_concat('@babel/runtime', _, WorkspaceIdent).

% Enforces the type field to be set
gen_enforced_field(WorkspaceCwd, 'type', 'commonjs') :-
  \+ workspace_field(WorkspaceCwd, 'type', 'module').

% Enforces a default 'conditions', unless it's already specified
gen_enforced_field(WorkspaceCwd, 'conditions', '{ "USE_ESM": [{ "type": "module" }, null] }') :-
  \+ workspace_field(WorkspaceCwd, 'private', true),
  \+ workspace_field(WorkspaceCwd, 'conditions', _),
  \+ workspace_field(WorkspaceCwd, 'main', './lib/index.cjs'),
  % Exclude some packages
  workspace_ident(WorkspaceCwd, WorkspaceIdent),
  WorkspaceIdent \= '@babel/compat-data'.

% Enforces that @babel/runtime-corejs2 must depend on core-js 2
gen_enforced_dependency(WorkspaceCwd, 'core-js', '^2.6.12', DependencyType) :-
  % Get the workspace name
  workspace_ident(WorkspaceCwd, WorkspaceIdent),
  % Only consider 'dependencies'
  (DependencyType = 'dependencies'),
  % The rule works for @babel/runtime-corejs2 only
  (WorkspaceIdent = '@babel/runtime-corejs2').
