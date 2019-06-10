import Binding from "../binding";
import splitExportDeclaration from "@babel/helper-split-export-declaration";
import * as t from "@babel/types";

const renameVisitor = {
  ReferencedIdentifier({ node }, state) {
    if (node.name === state.oldName) {
      node.name = state.newName;
    }
  },

  Scope(path, state) {
    if (
      !path.scope.bindingIdentifierEquals(
        state.oldName,
        state.binding.identifier,
      )
    ) {
      path.skip();
    }
  },

  "AssignmentExpression|Declaration"(path, state) {
    const ids = path.getOuterBindingIdentifiers();

    for (const name in ids) {
      if (name === state.oldName) ids[name].name = state.newName;
    }
  },
};

function isSafeBinding(scope, node) {
  if (!scope.hasOwnBinding(node.name)) return true;
  const { kind } = scope.getOwnBinding(node.name);
  return kind === "param" || kind === "local";
}

const outerBindingVisitor = {
  ReferencedIdentifier(path, state) {
    const { node } = path;
    if (node.name === state.oldName && !isSafeBinding(state.scope, node)) {
      state.paramDefaultOuterBinding = true;
      path.stop();
    }
  },
  Scope(path) {
    path.skip();
  },
};

const assignmentPatternVisitor = {
  AssignmentPattern(path, state) {
    state.assignmentPatternPath = path;
    path.stop();
  },
  Scope(path) {
    path.skip();
  },
};

export default class Renamer {
  constructor(binding: Binding, oldName: string, newName: string) {
    this.newName = newName;
    this.oldName = oldName;
    this.binding = binding;
  }

  oldName: string;
  newName: string;
  binding: Binding;

  maybeConvertFromExportDeclaration(parentDeclar) {
    const maybeExportDeclar = parentDeclar.parentPath;

    if (!maybeExportDeclar.isExportDeclaration()) {
      return;
    }

    if (
      maybeExportDeclar.isExportDefaultDeclaration() &&
      !maybeExportDeclar.get("declaration").node.id
    ) {
      return;
    }

    splitExportDeclaration(maybeExportDeclar);
  }

  maybeConvertFromClassFunctionDeclaration(path) {
    return; // TODO

    // retain the `name` of a class/function declaration

    if (!path.isFunctionDeclaration() && !path.isClassDeclaration()) return;
    if (this.binding.kind !== "hoisted") return;

    path.node.id = t.identifier(this.oldName);
    path.node._blockHoist = 3;

    path.replaceWith(
      t.variableDeclaration("let", [
        t.variableDeclarator(
          t.identifier(this.newName),
          t.toExpression(path.node),
        ),
      ]),
    );
  }

  maybeConvertFromClassFunctionExpression(path) {
    return; // TODO

    // retain the `name` of a class/function expression

    if (!path.isFunctionExpression() && !path.isClassExpression()) return;
    if (this.binding.kind !== "local") return;

    path.node.id = t.identifier(this.oldName);

    this.binding.scope.parent.push({
      id: t.identifier(this.newName),
    });

    path.replaceWith(
      t.assignmentExpression("=", t.identifier(this.newName), path.node),
    );
  }

  parameterDefaultHasOuterBinding(path, state) {
    const { oldName, scope } = state;
    const params = path.get("params");
    for (let i = 0; i < params.length; i++) {
      const param = params[i];
      if (param.isAssignmentPattern()) {
        state.assignmentPatternPath = param;
      } else {
        param.traverse(assignmentPatternVisitor, state);
      }
      if (state.assignmentPatternPath) {
        const right = state.assignmentPatternPath.get("right");
        if (!state.paramDefaultOuterBinding) {
          if (
            right.isIdentifier() &&
            right.node.name === oldName &&
            !isSafeBinding(scope, right.node)
          ) {
            state.paramDefaultOuterBinding = true;
            break;
          } else {
            right.traverse(outerBindingVisitor, state);
          }
        }
      }
    }
    return state.paramDefaultOuterBinding;
  }

  rename(block?) {
    const { binding, oldName, newName } = this;
    const { scope, path } = binding;

    const parentDeclar = path.find(
      path =>
        path.isDeclaration() ||
        path.isFunctionExpression() ||
        path.isClassExpression(),
    );
    if (parentDeclar) {
      const bindingIds = parentDeclar.getOuterBindingIdentifiers();
      if (bindingIds[oldName] === binding.identifier) {
        // When we are renaming an exported identifier, we need to ensure that
        // the exported binding keeps the old name.
        this.maybeConvertFromExportDeclaration(parentDeclar);
      }
    }

    if (
      scope.path.isFunction() &&
      this.parameterDefaultHasOuterBinding(scope.path, { scope, oldName })
    ) {
      scope.traverse(block || scope.block.body, renameVisitor, this);
    } else {
      scope.traverse(block || scope.block, renameVisitor, this);
    }

    if (!block) {
      scope.removeOwnBinding(oldName);
      scope.bindings[newName] = binding;
      this.binding.identifier.name = newName;
    }

    if (binding.type === "hoisted") {
      // https://github.com/babel/babel/issues/2435
      // todo: hoist and convert function to a let
    }

    if (parentDeclar) {
      this.maybeConvertFromClassFunctionDeclaration(parentDeclar);
      this.maybeConvertFromClassFunctionExpression(parentDeclar);
    }
  }
}
