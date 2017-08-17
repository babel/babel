import Binding from "../binding";
import * as t from "babel-types";

const renameVisitor = {
  ReferencedIdentifier({ node }, state) {
    if (node.name === state.oldName) {
      node.name = state.newName;
    }
  },

  Scope(path, state) {
    if (!path.scope.bindingIdentifierEquals(state.oldName, state.binding.identifier)) {
      path.skip();
    }
  },

  "AssignmentExpression|Declaration"(path, state) {
    const ids = path.getOuterBindingIdentifiers();

    for (const name in ids) {
      if (name === state.oldName) ids[name].name = state.newName;
    }
  }
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
    const exportDeclar = parentDeclar.parentPath.isExportDeclaration() && parentDeclar.parentPath;
    if (!exportDeclar) return;

    // build specifiers that point back to this export declaration
    const isDefault = exportDeclar.isExportDefaultDeclaration();

    if (isDefault && (parentDeclar.isFunctionDeclaration() ||
        parentDeclar.isClassDeclaration()) && !parentDeclar.node.id) {
      // Ensure that default class and function exports have a name so they have a identifier to
      // reference from the export specifier list.
      parentDeclar.node.id = parentDeclar.scope.generateUidIdentifier("default");
    }

    const bindingIdentifiers = parentDeclar.getOuterBindingIdentifiers();
    const specifiers = [];

    for (const name in bindingIdentifiers) {
      const localName = name === this.oldName ? this.newName : name;
      const exportedName = isDefault ? "default" : name;
      specifiers.push(t.exportSpecifier(t.identifier(localName), t.identifier(exportedName)));
    }

    if (specifiers.length) {
      const aliasDeclar = t.exportNamedDeclaration(null, specifiers);

      // hoist to the top if it's a function
      if (parentDeclar.isFunctionDeclaration()) {
        aliasDeclar._blockHoist = 3;
      }

      exportDeclar.insertAfter(aliasDeclar);
      exportDeclar.replaceWith(parentDeclar.node);
    }
  }

  rename(block?) {
    const { binding, oldName, newName } = this;
    const { scope, path } = binding;

    const parentDeclar = path.find((path) => path.isDeclaration() || path.isFunctionExpression());
    if (parentDeclar) {
      this.maybeConvertFromExportDeclaration(parentDeclar);
    }

    scope.traverse(block || scope.block, renameVisitor, this);

    if (!block) {
      scope.removeOwnBinding(oldName);
      scope.bindings[newName] = binding;
      this.binding.identifier.name = newName;
    }

    if (binding.type === "hoisted") {
      // https://github.com/babel/babel/issues/2435
      // todo: hoist and convert function to a let
    }
  }
}
