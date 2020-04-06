import path from "path";

const REL_PATH_REGEX = /^\.{1,2}/;

function isRelativePath(filePath) {
  return REL_PATH_REGEX.test(filePath);
}

function normalizeSrcExt(source) {
  return !path.extname(source) ? `${source}.js` : source;
}

function isErrorModule(targetModulePath, currentFilePath, src) {
  if (isRelativePath(src)) {
    return (
      path.normalize(targetModulePath) ===
      path.normalize(
        normalizeSrcExt(path.resolve(path.dirname(currentFilePath), src)),
      )
    );
  }

  return targetModulePath === src;
}

function findIdNode(node) {
  if (node.type === "Identifier") {
    return node;
  }

  if (node.type === "MemberExpression" && node.object.type === "Identifier") {
    return node.object;
  }

  return null;
}

function findReference(scope, node) {
  let currScope = scope;

  while (currScope) {
    const ref = currScope.set.get(node.name);

    if (ref) {
      return ref;
    }

    currScope = currScope.upper;
  }

  return null;
}

function referencesImportedBinding(node, scope, bindings) {
  const ref = findReference(scope, node);

  if (ref) {
    const topLevelDef = ref.defs[0];

    if (topLevelDef.type === "ImportBinding") {
      const defNode = topLevelDef.node;

      for (const spec of bindings) {
        if (
          spec.loc.start === defNode.loc.start &&
          spec.loc.end === defNode.loc.end
        ) {
          return true;
        }
      }
    }
  }

  return false;
}

export default {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "enforce @babel/parser's error messages to be consolidated in one module",
    },
    schema: [
      {
        type: "object",
        properties: {
          errorModule: { type: "string" },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      mustBeImported: 'Error messages must be imported from "{{errorModule}}".',
    },
  },
  create({ options, report, getFilename, getScope }) {
    const [{ errorModule } = {}] = options;
    const filename = getFilename();
    const importedBindings = new Set();

    return {
      // Check imports up front so that we don't have to check them for every ThrowStatement.
      ImportDeclaration(node) {
        if (isErrorModule(errorModule, filename, node.source.value)) {
          for (const spec of node.specifiers) {
            importedBindings.add(spec);
          }
        }
      },
      "ThrowStatement > CallExpression[callee.type='MemberExpression']"(node) {
        if (
          node.callee.object.type !== "ThisExpression" ||
          node.callee.property.name !== "raise"
        ) {
          return;
        }

        // Ignore malformed `this.raise()` calls.
        if (node.arguments.length < 2) {
          return;
        }

        const [, errorMsgNode] = node.arguments;
        const nodeToCheck = findIdNode(errorMsgNode);

        if (
          nodeToCheck &&
          referencesImportedBinding(nodeToCheck, getScope(), importedBindings)
        ) {
          return;
        }

        report({
          node: errorMsgNode,
          messageId: "mustBeImported",
          data: { errorModule },
        });
      },
    };
  },
};
