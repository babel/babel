import jsx from "@babel/plugin-syntax-jsx";
import helper from "@babel/helper-builder-react-jsx";

export default function({ types: t }, options) {
  const pragma = options.pragma || "React.createElement";

  const JSX_ANNOTATION_REGEX = /\*?\s*@jsx\s+([^\s]+)/;

  const visitor = helper({
    pre(state) {
      const tagName = state.tagName;
      const args = state.args;
      if (t.react.isCompatTag(tagName)) {
        args.push(t.stringLiteral(tagName));
      } else {
        args.push(state.tagExpr);
      }
    },

    post(state, pass) {
      state.callee = pass.get("jsxIdentifier")();
    },
  });

  visitor.Program = function(path, state) {
    const { file } = state;

    let id = pragma;
    for (const comment of (file.ast.comments: Array<Object>)) {
      const matches = JSX_ANNOTATION_REGEX.exec(comment.value);
      if (matches) {
        id = matches[1];
        break;
      }
    }

    state.set("jsxIdentifier", () =>
      id
        .split(".")
        .map(name => t.identifier(name))
        .reduce((object, property) => t.memberExpression(object, property)),
    );
  };

  visitor.JSXAttribute = function(path) {
    if (t.isJSXElement(path.node.value)) {
      path.node.value = t.jSXExpressionContainer(path.node.value);
    }
  };

  return {
    inherits: jsx,
    visitor,
  };
}
