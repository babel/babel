import path from "path";

const REL_PATH_REGEX = /^\.{1,2}/;

function isRelativePath(filePath) {
  return REL_PATH_REGEX.test(filePath);
}

function normalizeSrcExt(source) {
  return !path.extname(source) ? `${source}.js` : source;
}

function resolveErrorModule(errorModule, currentFilePath) {
  return isRelativePath(errorModule)
    ? path.resolve(path.dirname(currentFilePath), normalizeSrcExt(errorModule))
    : errorModule;
}

function isCurrentFileErrorModule(errorModule, currentFilePath) {
  return (
    path.normalize(currentFilePath) ===
    path.normalize(
      path.resolve(resolveErrorModule(errorModule, currentFilePath)),
    )
  );
}

function isSourceErrorModule(targetModulePath, currentFilePath, src) {
  return (
    path.normalize(resolveErrorModule(targetModulePath, currentFilePath)) ===
    path.normalize(resolveErrorModule(src, currentFilePath))
  );
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
        required: ["errorModule"],
      },
    ],
    messages: {
      mustBeImported: 'Error messages must be imported from "{{errorModule}}".',
    },
  },
  create({ options, report, getFilename, getScope }) {
    const [{ errorModule = "" } = {}] = options;
    const filename = getFilename();
    const importedBindings = new Set();

    if (
      // Do not run check if errorModule config option is not given.
      !errorModule.length ||
      // Do not check the target error module file.
      isCurrentFileErrorModule(errorModule, filename)
    ) {
      return {};
    }

    return {
      // Check imports up front so that we don't have to check them for every ThrowStatement.
      ImportDeclaration(node) {
        if (isSourceErrorModule(errorModule, filename, node.source.value)) {
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
