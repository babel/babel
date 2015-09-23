export default function ({ types: t }) {
  var JSX_ANNOTATION_REGEX = /^\*\s*@jsx\s+([^\s]+)/;

  var visitor = require("babel-plugin-builder-react-jsx")(t, {
    pre(state) {
      var tagName = state.tagName;
      var args    = state.args;
      if (t.react.isCompatTag(tagName)) {
        args.push(t.stringLiteral(tagName));
      } else {
        args.push(state.tagExpr);
      }
    },

    post(state, file) {
      state.callee = file.get("jsxIdentifier");
    }
  });

  visitor.Program = function (path, file) {
    var id = "React.createElement"; // todo: jsxPragma;

    for (var i = 0; i < file.ast.comments.length; i++) {
      var comment = file.ast.comments[i];
      var matches = JSX_ANNOTATION_REGEX.exec(comment.value);
      if (matches) {
        id = matches[1];
        if (id === "React.DOM") {
          throw file.buildCodeFrameError(comment, "The @jsx React.DOM pragma has been deprecated as of React 0.12");
        } else {
          break;
        }
      }
    }

    file.set("jsxIdentifier", id.split(".").map(t.identifier).reduce(function (object, property) {
      return t.memberExpression(object, property);
    }));
  };

  return { visitor };
}
