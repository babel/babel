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
gen_enforced_dependency(WorkspaceCwd, 'core-js', '^2.6.12', 'dependencies') :-
  % Get the workspace name
  % The rule works for @babel/runtime-corejs2 only
  workspace_ident(WorkspaceCwd, '@babel/runtime-corejs2').

% Enforces that @babel/helper-* must peer-depend on @babel/core if they depend on @babel/traverse
gen_enforced_dependency(WorkspaceCwd, '@babel/core', '^7.0.0', 'peerDependencies') :-
  % Get the workspace name
  workspace_ident(WorkspaceCwd, WorkspaceIdent),
  atom_concat('@babel/helper-', _, WorkspaceIdent),
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, _, 'dependencies'),
  (DependencyIdent = '@babel/traverse').

% Enforces that @babel/helper-* must not depend on @babel/traverse, @babel/template, @babel/types if they peer-depend on @babel/core
gen_enforced_dependency(WorkspaceCwd, DependencyIdent, null, 'dependencies') :-
  % Get the workspace name
  workspace_ident(WorkspaceCwd, WorkspaceIdent),
  atom_concat('@babel/helper-', _, WorkspaceIdent),
  workspace_has_dependency(WorkspaceCwd, '@babel/core', _, 'peerDependencies'),
  member(DependencyIdent, ['@babel/template', '@babel/traverse', '@babel/types']).

% Enforces that @babel/core must not be in dependency for most packages
gen_enforced_dependency(WorkspaceCwd, '@babel/core', null, 'dependencies') :-
  % Get the workspace name
  workspace_ident(WorkspaceCwd, WorkspaceIdent),
  % Exclude some packages
  \+ member(WorkspaceIdent, ['@babel/eslint-shared-fixtures', '@babel/eslint-tests', '@babel/helper-transform-fixture-test-runner']).

% Enforces that @babel/core should be in devDependencies if a package peer-depends on @babel/core and it does not list @babel/core in dependencies. Doing so will ensure that they are linked to an ESM @babel/core build in the e2e ESM tests.
gen_enforced_dependency(WorkspaceCwd, '@babel/core', 'workspace:^', 'devDependencies') :-
  workspace_has_dependency(WorkspaceCwd, '@babel/core', _, 'peerDependencies'),
  \+ workspace_has_dependency(WorkspaceCwd, '@babel/core', _, 'dependencies').
