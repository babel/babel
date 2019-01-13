import assert from "assert";
import { types as t } from "../../babel-core";

/**
 * Return a label for the statement.  If it doesn't yet have one, give it one.
 *
 * If passed null, do nothing and return null.
 */
function forceLabelStatement(path) {
  if (path === null) {
    return null;
  }
  assert(path.isStatement());
  if (path.parentPath.isLabeledStatement()) {
    return path.parentPath.node.label;
  }
  const label = path.scope.generateUidIdentifier("label");
  path.replaceWith(t.labeledStatement(label, path.node));
  return label;
}

/**
 * Get path of the statement an unlabelled `break` would refer to.
 *
 * If there is no such statement, return null.
 */
function findEnclosingBreakable(path) {
  // The ES spec helpfully points out:
  //     NOTE    A BreakableStatement is one that can be exited via an
  //             unlabelled BreakStatement.
  // https://tc39.github.io/ecma262/#sec-iteration-statements
  //
  // (Fun fact: a *labelled* BreakStatement, `break foo;`, can refer to
  // a label on any enclosing statement!  E.g.,
  //   l: { break l; console.error("unreachable") }; console.log("hello")
  // just prints "hello".  See
  //   https://tc39.github.io/ecma262/#sec-labelled-statements-runtime-semantics-labelledevaluation
  // .)
  //
  // And BreakableStatement means IterationStatement or SwitchStatement...
  // in Babel terms, Loop or SwitchStatement.
  while (path && !path.isFunction()) {
    if (path.isLoop() || path.isSwitchStatement()) {
      return path;
    }
    if (
      path.parentPath.isLabeledStatement() &&
      path.parentPath.node.body !== path.node
    ) {
      // There's been a modification at `path.parentPath` since
      // `path` was constructed, which could be from a previous
      // `forceLabelStatement`.  TODO this solution feels messy.
      path = path.parentPath.get("body");
      continue;
    }
    path = path.parentPath;
  }
  return null;
}

/**
 * Get path of the loop an unlabelled `continue` would refer to.
 *
 * If there is no such loop, return null.
 */
function findEnclosingLoop(path) {
  // Unlike `break`, `continue` applies only to loops (aka
  // IterationStatement in spec terms).  See the sections
  // linked in findEnclosingBreakable, and compare:
  //   https://tc39.github.io/ecma262/#sec-loopcontinues
  while (path && !path.isFunction()) {
    if (path.isLoop()) {
      return path;
    }
    if (
      path.parentPath.isLabeledStatement() &&
      path.parentPath.node.body !== path.node
    ) {
      // There's been a modification at `path.parentPath` since
      // `path` was constructed, which could be from a previous
      // `forceLabelStatement`.  TODO this solution feels messy.
      path = path.parentPath.get("body");
      continue;
    }
    path = path.parentPath;
  }
  return null;
}

/**
 * Rewrite any `break` and `continue` that would implicitly exit `outerPath`.
 *
 * Specifically: find each `break` or `continue` statement which doesn't
 * use a label, and doesn't refer to an enclosing loop or `switch` inside
 * this traversal (whose root must be `outerPath`.)  Add labels to those
 * statements to explicitly refer to the same enclosing loops/switches as
 * they do now.
 *
 * Also add labels to those enclosing loops/switches, as needed.
 */
export const labelRewriteVisitor = {
  Loop(path) {
    path.skip();
  },

  SwitchStatement: {
    enter(path, state) {
      state.switchDepth = (state.switchDepth || 0) + 1;
    },
    exit(path, state) {
      state.switchDepth--;
    },
  },

  BreakStatement(path, { outerPath, switchDepth }) {
    if (switchDepth > 0) {
      return;
    }
    if (path.node.label !== null) {
      return;
    }
    // TODO cache these
    const label = forceLabelStatement(findEnclosingBreakable(outerPath));
    if (label === null) {
      throw path.buildCodeFrameError("Illegal break statement");
    }
    path.node.label = label;
  },

  ContinueStatement(path, { outerPath }) {
    if (path.node.label !== null) {
      return;
    }
    const label = forceLabelStatement(findEnclosingLoop(outerPath));
    if (label === null) {
      throw path.buildCodeFrameError("Illegal continue statement");
    }
    path.node.label = label;
  },
};
