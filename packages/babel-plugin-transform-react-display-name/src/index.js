import { declare } from "@babel/helper-plugin-utils";
import path from "path";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(7);

  function addDisplayName(id, call) {
    const props = call.arguments[0].properties;
    let safe = true;

    for (let i = 0; i < props.length; i++) {
      const prop = props[i];
      const key = t.toComputedKey(prop);
      if (t.isLiteral(key, { value: "displayName" })) {
        safe = false;
        break;
      }
    }

    if (safe) {
      props.unshift(
        t.objectProperty(t.identifier("displayName"), t.stringLiteral(id)),
      );
    }
  }

  const isCreateClassCallExpression = t.buildMatchMemberExpression(
    "React.createClass",
  );
  const isCreateClassAddon = callee => callee.name === "createReactClass";

  function isCreateClass(node) {
    if (!node || !t.isCallExpression(node)) return false;

    // not createReactClass nor React.createClass call member object
    if (
      !isCreateClassCallExpression(node.callee) &&
      !isCreateClassAddon(node.callee)
    ) {
      return false;
    }

    // no call arguments
    const args = node.arguments;
    if (args.length !== 1) return false;

    // first node arg is not an object
    const first = args[0];
    if (!t.isObjectExpression(first)) return false;

    return true;
  }

  function isReactLazy(node) {
    if (!node || !t.isCallExpression(node)) return false;

    if (!t.matchesPattern(node.callee, "React.lazy")) {
      return false;
    }

    return true;
  }

  function displayNameFromFilename(filename) {
    if (!filename) {
      return null;
    }

    let displayName = path.basename(filename, path.extname(filename));

    // ./{module name}/index.js
    if (displayName === "index") {
      displayName = path.basename(path.dirname(filename));
    }

    return displayName;
  }

  function displayNameFromAncestors(path) {
    let id;

    // crawl up the ancestry looking for possible candidates for displayName inference
    path.find(function(path) {
      if (path.isAssignmentExpression()) {
        id = path.node.left;
      } else if (path.isObjectProperty()) {
        id = path.node.key;
      } else if (path.isVariableDeclarator()) {
        id = path.node.id;
      } else if (path.isStatement()) {
        // we've hit a statement, we should stop crawling up
        return true;
      }

      // we've got an id! no need to continue
      if (id) return true;
    });

    // ensure that we have an identifier we can inherit from
    if (!id) return;

    // foo.bar -> bar
    if (t.isMemberExpression(id)) {
      id = id.property;
    }

    // identifiers are the only thing we can reliably get a name from
    if (t.isIdentifier(id)) {
      return id.name;
    }

    return null;
  }

  function transformLazyReference(idPath, state) {
    const callPath = idPath.parentPath;
    if (!callPath.isCallExpression() || idPath.key !== "callee") {
      return;
    }
    if (
      callPath.parentPath.parentPath &&
      callPath.parentPath.parentPath.isSequenceExpression()
    ) {
      return;
    }
    let displayName;
    if (
      callPath.parentPath.isExportDefaultDeclaration() &&
      callPath.key === "declaration"
    ) {
      displayName = displayNameFromFilename(state.filename);
    } else {
      displayName = displayNameFromAncestors(callPath);
    }
    if (!displayName) {
      let maybeImportCall, maybeImportFilename;
      if (
        callPath.node.arguments.length === 1 &&
        t.isArrowFunctionExpression(callPath.node.arguments[0])
      ) {
        maybeImportCall = callPath.node.arguments[0].body;
      }
      if (
        maybeImportCall &&
        t.isCallExpression(maybeImportCall) &&
        t.isImport(maybeImportCall.callee) &&
        maybeImportCall.arguments.length === 1
      ) {
        maybeImportFilename = maybeImportCall.arguments[0];
      }
      if (maybeImportFilename && t.isStringLiteral(maybeImportFilename)) {
        displayName = displayNameFromFilename(maybeImportFilename.value);
      }
    }
    if (!displayName) {
      return;
    }
    const { scope } = callPath;
    const id = scope.generateDeclaredUidIdentifier(displayName);
    scope.push({ id });
    callPath.replaceWith(
      t.sequenceExpression([
        t.assignmentExpression("=", id, callPath.node),
        t.assignmentExpression(
          "=",
          t.memberExpression(id, t.identifier("displayName"), false, false),
          t.stringLiteral(displayName),
        ),
        id,
      ]),
    );
  }

  return {
    name: "transform-react-display-name",

    visitor: {
      ImportSpecifier(path, state) {
        if (
          path.parent.source.value === "react" &&
          path.node.imported.name === "lazy"
        ) {
          const binding = path.scope.getBinding(path.node.local.name);
          for (const lazyIdPath of binding.referencePaths) {
            transformLazyReference(lazyIdPath, state);
          }
        }
      },

      ExportDefaultDeclaration(path, state) {
        const { node } = path;
        if (isCreateClass(node.declaration)) {
          const displayName =
            displayNameFromFilename(state.filename) || "unknown";

          addDisplayName(displayName, node.declaration);
        } else if (isReactLazy(node.declaration)) {
          transformLazyReference(path.get("declaration").get("callee"), state);
        }
      },

      CallExpression(path, state) {
        const { node } = path;
        if (isCreateClass(node)) {
          const displayName = displayNameFromAncestors(path);

          addDisplayName(displayName, node);
        } else if (isReactLazy(node)) {
          transformLazyReference(path.get("callee"), state);
        }
      },
    },
  };
});
