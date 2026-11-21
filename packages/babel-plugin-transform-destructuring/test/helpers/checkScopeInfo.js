/**
 * Checks that the scope information maintained by the destructuring plugins
 * (without crawling the scope again) is the same as the one of a fresh crawl.
 * It must run after the other plugins: list it last.
 *
 * With `{ strict: false }`, it only checks that the declared bindings are
 * registered (which also gives a clearer error in strict mode): for fixtures
 * also running plugins that don't maintain the scope information exactly.
 */

function describeBinding(binding) {
  // Both the counts and the paths are compared: the same node registered
  // through a stale and a fresh path is only visible in the counts.
  return {
    kind: binding.kind,
    constant: binding.constant,
    references: binding.references,
    referencePaths: binding.referencePaths.slice(),
    violationPaths: binding.constantViolations.slice(),
    violations: binding.constantViolations.length,
  };
}

function snapshot(programPath) {
  const scopes = new Map();
  const record = scope => {
    const bindings = new Map();
    for (const name of Object.keys(scope.bindings)) {
      bindings.set(name, describeBinding(scope.bindings[name]));
    }
    scopes.set(scope, bindings);
  };
  record(programPath.scope);
  programPath.traverse({
    Scopable(path) {
      if (path.scope.path === path) record(path.scope);
    },
  });
  return scopes;
}

function describePath(path) {
  const { parentPath, node } = path;
  return `${parentPath ? parentPath.type + ">" : ""}${node.type}${
    node.loc ? `@${node.loc.start.line}:${node.loc.start.column}` : ""
  }`;
}

/** The paths of `a` whose node is not the node of a path of `b`. */
function onlyIn(a, b) {
  const nodes = new Set(b.map(path => path.node));
  return a.filter(path => !nodes.has(path.node)).map(describePath);
}

function pathsDiff(label, a, b) {
  const extra = onlyIn(a, b);
  const missing = onlyIn(b, a);
  if (!extra.length && !missing.length) return null;
  const parts = [
    extra.length && `extra ${extra.join(" ")}`,
    missing.length && `missing ${missing.join(" ")}`,
  ].filter(Boolean);
  return `${label}: ${parts.join(", ")}`;
}

function compare(before, after) {
  const errors = [];
  for (const [scope, bindings] of before) {
    const crawled = after.get(scope);
    const where = `${scope.path.type}${
      scope.path.node.loc ? ` (line ${scope.path.node.loc.start.line})` : ""
    }`;
    if (!crawled) {
      errors.push(`${where}: scope is gone after crawling`);
      continue;
    }
    for (const [name, info] of bindings) {
      const crawledInfo = crawled.get(name);
      if (!crawledInfo) {
        errors.push(`${where}: binding ${name} is gone after crawling`);
        continue;
      }
      const diffs = [];
      for (const key of ["kind", "constant", "references", "violations"]) {
        if (info[key] !== crawledInfo[key]) {
          diffs.push(`${key}: ${info[key]} (crawled: ${crawledInfo[key]})`);
        }
      }
      for (const [label, key] of [
        ["referencing nodes", "referencePaths"],
        ["assigning nodes", "violationPaths"],
      ]) {
        const diff = pathsDiff(label, info[key], crawledInfo[key]);
        if (diff) diffs.push(diff);
      }
      if (diffs.length) errors.push(`${where}: ${name}: ${diffs.join(", ")}`);
    }
    for (const name of crawled.keys()) {
      if (!bindings.has(name)) {
        errors.push(`${where}: binding ${name} is missing`);
      }
    }
  }
  return errors;
}

export default (api, { strict = true } = {}) => {
  return {
    visitor: {
      Program: {
        exit(programPath) {
          programPath.traverse({
            VariableDeclarator(path) {
              const names = Object.keys(path.getBindingIdentifiers());
              for (const name of names) {
                const b = path.scope.getBinding(name);
                if (!b) {
                  throw new Error(`No binding for ${name}`);
                }
              }
            },
          });

          if (!strict) return;
          const before = snapshot(programPath);
          programPath.scope.crawl();
          const errors = compare(before, snapshot(programPath));
          if (errors.length) {
            throw new Error(
              "The scope information differs from a fresh crawl:\n  " +
                errors.join("\n  "),
            );
          }
        },
      },
    },
  };
};
