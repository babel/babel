import { declare } from "@babel/helper-plugin-utils";
import { types as t, type NodePath, type Scope } from "@babel/core";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0"));

  const surrogate = /[\ud800-\udfff]/g;
  const unicodeEscape = /(\\+)u\{([0-9a-fA-F]+)\}/g;

  function escape(code: number) {
    return "\\u" + code.toString(16).padStart(4, "0");
  }

  function replacer(match: string, backslashes: string, code: string) {
    if (backslashes.length % 2 === 0) {
      return match;
    }

    const char = String.fromCodePoint(parseInt(code, 16));
    const escaped = backslashes.slice(0, -1) + escape(char.charCodeAt(0));

    return char.length === 1 ? escaped : escaped + escape(char.charCodeAt(1));
  }

  function replaceUnicodeEscapes(str: string) {
    return str.replace(unicodeEscape, replacer);
  }

  function getUnicodeEscape(str: string) {
    let match;
    while ((match = unicodeEscape.exec(str))) {
      if (match[1].length % 2 === 0) continue;
      unicodeEscape.lastIndex = 0;
      return match[0];
    }
    return null;
  }

  function replaceSurrogates(name: string) {
    return name.replace(surrogate, c => {
      return `_u${c.charCodeAt(0).toString(16)}`;
    });
  }

  function renameBindings(scope: Scope) {
    for (const name of Object.keys(scope.bindings)) {
      const replaced = replaceSurrogates(name);
      if (name === replaced) continue;

      const binding = scope.bindings[name];
      const statement = binding.path.find(p => p.isStatement());
      if (
        binding.kind === "module" ||
        statement?.parentPath.isExportDeclaration()
      ) {
        continue;
      }

      // A class name is also bound inside the class, using the same node
      const newName =
        binding.identifier.name === name
          ? scope.generateUid(replaced)
          : binding.identifier.name;
      binding.identifier.name = newName;
      for (const ref of binding.referencePaths) {
        (ref.node as t.Identifier).name = newName;
      }
      for (const violation of binding.constantViolations) {
        const ids = violation.isAssignmentExpression()
          ? t.getAssignmentIdentifiers(violation.node)
          : violation.getOuterBindingIdentifiers();
        if (ids[name]) ids[name].name = newName;
      }
      scope.removeOwnBinding(name);
      scope.bindings[newName] = binding;
    }
  }

  return {
    name: "transform-unicode-escapes",
    manipulateOptions({ generatorOpts }) {
      // Babel 8 will enable jsesc minimal mode by default, which outputs
      // unescaped unicode string
      if (!generatorOpts.jsescOption) {
        generatorOpts.jsescOption = {};
      }
      generatorOpts.jsescOption.minimal ??= false;
    },
    visitor: api.traverse.explode({
      Program(path) {
        const names = [...path.scope.getProgramParent().referencesSet];
        if (names.every(name => replaceSurrogates(name) === name)) return;

        renameBindings(path.scope);
        path.traverse({
          Scope(path) {
            renameBindings(path.scope);
          },
        });
      },

      Identifier(path) {
        const { node, key } = path;
        const { name } = node;
        const replaced = replaceSurrogates(name);
        if (name === replaced) return;

        const str = t.inherits(t.stringLiteral(name), node);

        if (key === "key") {
          path.replaceWith(str);
          return;
        }

        const { parentPath, scope } = path;
        if (
          parentPath.isMemberExpression({ property: node }) ||
          parentPath.isOptionalMemberExpression({ property: node })
        ) {
          parentPath.node.computed = true;
          path.replaceWith(str);
          return;
        }

        const binding = scope.getBinding(name);
        if (binding) {
          scope.rename(name, scope.generateUid(replaced));
          return;
        }

        throw path.buildCodeFrameError(
          `Can't reference '${name}' as a bare identifier`,
        );
      },

      "StringLiteral|DirectiveLiteral"(
        path: NodePath<t.StringLiteral | t.DirectiveLiteral>,
      ) {
        const { node } = path;
        const { extra } = node;

        if (extra?.raw) extra.raw = replaceUnicodeEscapes(extra.raw as string);
      },

      TemplateElement(path) {
        const { node, parentPath } = path;
        const { value } = node;

        const firstEscape = getUnicodeEscape(value.raw);
        if (!firstEscape) return;

        const grandParent = parentPath.parentPath;
        if (grandParent.isTaggedTemplateExpression()) {
          throw path.buildCodeFrameError(
            `Can't replace Unicode escape '${firstEscape}' inside tagged template literals. You can enable '@babel/plugin-transform-template-literals' to compile them to classic strings.`,
          );
        }

        value.raw = replaceUnicodeEscapes(value.raw);
      },
    }),
  };
});
