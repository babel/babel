import Binding from "../binding";
import splitExportDeclaration from "@babel/helper-split-export-declaration";
import {
  VISITOR_KEYS,
  assignmentExpression,
  identifier,
  toExpression,
  variableDeclaration,
  variableDeclarator,
} from "@babel/types";
import type { Visitor } from "../../types";

const renameVisitor: Visitor<Renamer> = {
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
      skipAllButComputedMethodKey(path);
    }
  },

  "AssignmentExpression|Declaration|VariableDeclarator"(path, state) {
    if (path.isVariableDeclaration()) return;
    const ids = path.getOuterBindingIdentifiers();

    for (const name in ids) {
      if (name === state.oldName) ids[name].name = state.newName;
    }
  },
};

export default class Renamer {
  constructor(binding: Binding, oldName: string, newName: string) {
    this.newName = newName;
    this.oldName = oldName;
    this.binding = binding;
  }

  declare oldName: string;
  declare newName: string;
  declare binding: Binding;

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

    // eslint-disable-next-line no-unreachable
    if (!path.isFunctionDeclaration() && !path.isClassDeclaration()) return;
    if (this.binding.kind !== "hoisted") return;

    path.node.id = identifier(this.oldName);
    path.node._blockHoist = 3;

    path.replaceWith(
      variableDeclaration("let", [
        variableDeclarator(identifier(this.newName), toExpression(path.node)),
      ]),
    );
  }

  maybeConvertFromClassFunctionExpression(path) {
    return; // TODO

    // retain the `name` of a class/function expression

    // eslint-disable-next-line no-unreachable
    if (!path.isFunctionExpression() && !path.isClassExpression()) return;
    if (this.binding.kind !== "local") return;

    path.node.id = identifier(this.oldName);

    this.binding.scope.parent.push({
      id: identifier(this.newName),
    });

    path.replaceWith(
      assignmentExpression("=", identifier(this.newName), path.node),
    );
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

    const blockToTraverse = block || scope.block;
    if (blockToTraverse?.type === "SwitchStatement") {
      // discriminant is not part of current scope, should be skipped.
      blockToTraverse.cases.forEach(c => {
        scope.traverse(c, renameVisitor, this);
      });
    } else {
      scope.traverse(blockToTraverse, renameVisitor, this);
    }

    if (!block) {
      scope.removeOwnBinding(oldName);
      scope.bindings[newName] = binding;
      this.binding.identifier.name = newName;
    }

    if (parentDeclar) {
      this.maybeConvertFromClassFunctionDeclaration(parentDeclar);
      this.maybeConvertFromClassFunctionExpression(parentDeclar);
    }
  }
}

function skipAllButComputedMethodKey(path) {
  // If the path isn't method with computed key, just skip everything.
  if (!path.isMethod() || !path.node.computed) {
    path.skip();
    return;
  }

  // So it's a method with a computed key. Make sure to skip every other key the
  // traversal would visit.
  const keys = VISITOR_KEYS[path.type];
  for (const key of keys) {
    if (key !== "key") path.skipKey(key);
  }
}
