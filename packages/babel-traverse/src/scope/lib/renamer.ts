import type Binding from "../binding";
import splitExportDeclaration from "@babel/helper-split-export-declaration";
import * as t from "@babel/types";
import type { NodePath, Visitor } from "../..";
import { requeueComputedKeyAndDecorators } from "@babel/helper-environment-visitor";
import { traverseNode } from "../../traverse-node";
import { explode } from "../../visitors";
import type { Identifier } from "@babel/types";

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

  ObjectProperty({ node, scope }, state) {
    const { name } = node.key as Identifier;
    if (
      node.shorthand &&
      // In destructuring the identifier is already renamed by the
      // AssignmentExpression|Declaration|VariableDeclarator visitor,
      // while in object literals it's renamed later by the
      // ReferencedIdentifier visitor.
      (name === state.oldName || name === state.newName) &&
      // Ignore shadowed bindings
      scope.getBindingIdentifier(name) === state.binding.identifier
    ) {
      node.shorthand = false;
      if (node.extra?.shorthand) node.extra.shorthand = false;
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

  rename(/* Babel 7 - block?: t.Pattern | t.Scopable */) {
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

    const blockToTraverse = process.env.BABEL_8_BREAKING
      ? scope.block
      : (arguments[0] as t.Pattern | t.Scopable) || scope.block;
    traverseNode(
      blockToTraverse,
      explode(renameVisitor),
      scope,
      this,
      scope.path,
      // When blockToTraverse is a SwitchStatement, the discriminant
      // is not part of the current scope and thus should be skipped.
      { discriminant: true },
    );

    if (process.env.BABEL_8_BREAKING) {
      scope.removeOwnBinding(oldName);
      scope.bindings[newName] = binding;
      this.binding.identifier.name = newName;
    } else if (!arguments[0]) {
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
