import type Binding from "../binding";
import splitExportDeclaration from "@babel/helper-split-export-declaration";
import * as t from "@babel/types";
import type { NodePath, Visitor } from "../..";
import { requeueComputedKeyAndDecorators } from "@babel/helper-environment-visitor";

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
      path.skip();
      if (path.isMethod()) {
        requeueComputedKeyAndDecorators(path);
      }
    }
  },

  "AssignmentExpression|Declaration|VariableDeclarator"(
    path: NodePath<t.AssignmentPattern | t.Declaration | t.VariableDeclarator>,
    state,
  ) {
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

  maybeConvertFromExportDeclaration(parentDeclar: NodePath) {
    const maybeExportDeclar = parentDeclar.parentPath;

    if (!maybeExportDeclar.isExportDeclaration()) {
      return;
    }

    if (maybeExportDeclar.isExportDefaultDeclaration()) {
      const { declaration } = maybeExportDeclar.node;
      if (t.isDeclaration(declaration) && !declaration.id) {
        return;
      }
    }

    if (maybeExportDeclar.isExportAllDeclaration()) {
      return;
    }

    splitExportDeclaration(
      maybeExportDeclar as NodePath<
        Exclude<t.ExportDeclaration, t.ExportAllDeclaration>
      >,
    );
  }

  maybeConvertFromClassFunctionDeclaration(path: NodePath) {
    return path; // TODO

    // // retain the `name` of a class/function declaration

    // if (!path.isFunctionDeclaration() && !path.isClassDeclaration()) return;
    // if (this.binding.kind !== "hoisted") return;

    // path.node.id = identifier(this.oldName);
    // path.node._blockHoist = 3;

    // path.replaceWith(
    //   variableDeclaration("let", [
    //     variableDeclarator(identifier(this.newName), toExpression(path.node)),
    //   ]),
    // );
  }

  maybeConvertFromClassFunctionExpression(path: NodePath) {
    return path; // TODO

    // // retain the `name` of a class/function expression

    // if (!path.isFunctionExpression() && !path.isClassExpression()) return;
    // if (this.binding.kind !== "local") return;

    // path.node.id = identifier(this.oldName);

    // this.binding.scope.parent.push({
    //   id: identifier(this.newName),
    // });

    // path.replaceWith(
    //   assignmentExpression("=", identifier(this.newName), path.node),
    // );
  }

  rename(block?: t.Pattern | t.Scopable) {
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
      this.maybeConvertFromClassFunctionDeclaration(path);
      this.maybeConvertFromClassFunctionExpression(path);
    }
  }
}
