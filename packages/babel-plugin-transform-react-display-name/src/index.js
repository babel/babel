import path from "path";

export default function ({ types: t }) {
  function addDisplayName(id, call) {
    let props = call.arguments[0].properties;
    let safe = true;

    for (let i = 0; i < props.length; i++) {
      let prop = props[i];
      let key = t.toComputedKey(prop);
      if (t.isLiteral(key, { value: "displayName" })) {
        safe = false;
        break;
      }
    }

    if (safe) {
      props.unshift(t.objectProperty(t.identifier("displayName"), t.stringLiteral(id)));
    }
  }

  let isCreateClassCallExpression = t.buildMatchMemberExpression("React.createClass");

  function isCreateClass(node) {
    if (!node || !t.isCallExpression(node)) return false;

    // not React.createClass call member object
    if (!isCreateClassCallExpression(node.callee)) return false;

    // no call arguments
    let args = node.arguments;
    if (args.length !== 1) return false;

    // first node arg is not an object
    let first = args[0];
    if (!t.isObjectExpression(first)) return false;

    return true;
  }

  return {
    visitor: {
      ExportDefaultDeclaration({ node }, state) {
        if (isCreateClass(node.declaration)) {
          let displayName = state.file.opts.basename;

          // ./{module name}/index.js
          if (displayName === "index") {
            displayName = path.basename(path.dirname(state.file.opts.filename));
          }

          addDisplayName(displayName, node.declaration);
        }
      },

      "AssignmentExpression|ObjectProperty|VariableDeclarator"({ node }) {
        let left, right;

        if (t.isAssignmentExpression(node)) {
          left = node.left;
          right = node.right;
        } else if (t.isObjectProperty(node)) {
          left = node.key;
          right = node.value;
        } else if (t.isVariableDeclarator(node)) {
          left = node.id;
          right = node.init;
        }

        if (t.isMemberExpression(left)) {
          left = left.property;
        }

        if (t.isIdentifier(left) && isCreateClass(right)) {
          addDisplayName(left.name, right);
        }
      }
    }
  };
}
