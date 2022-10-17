/**
 * This adds {fileName, lineNumber, columnNumber} annotations to JSX tags.
 *
 * NOTE: lineNumber and columnNumber are both 1-based.
 *
 * == JSX Literals ==
 *
 * <sometag />
 *
 * becomes:
 *
 * var __jsxFileName = 'this/file.js';
 * <sometag __source={{fileName: __jsxFileName, lineNumber: 10, columnNumber: 1}}/>
 */
import { declare } from "@babel/helper-plugin-utils";
import { types as t, template } from "@babel/core";

const TRACE_ID = "__source";
const FILE_NAME_VAR = "_jsxFileName";

const createNodeFromNullish = <T, N extends t.Node>(
  val: T | null,
  fn: (val: T) => N,
): N | t.NullLiteral => (val == null ? t.nullLiteral() : fn(val));

type State = {
  fileNameIdentifier: t.Identifier;
};
export default declare<State>(api => {
  api.assertVersion(7);

  function makeTrace(
    fileNameIdentifier: t.Identifier,
    { line, column }: { line: number; column: number },
  ) {
    const fileLineLiteral = createNodeFromNullish(line, t.numericLiteral);
    const fileColumnLiteral = createNodeFromNullish(column, c =>
      // c + 1 to make it 1-based instead of 0-based.
      t.numericLiteral(c + 1),
    );

    return template.expression.ast`{
      fileName: ${fileNameIdentifier},
      lineNumber: ${fileLineLiteral},
      columnNumber: ${fileColumnLiteral},
    }`;
  }

  const isSourceAttr = (attr: t.Node) =>
    t.isJSXAttribute(attr) && attr.name.name === TRACE_ID;

  return {
    name: "transform-react-jsx-source",
    visitor: {
      JSXOpeningElement(path, state) {
        const { node } = path;
        if (
          // the element was generated and doesn't have location information
          !node.loc ||
          // Already has __source
          path.node.attributes.some(isSourceAttr)
        ) {
          return;
        }

        if (!state.fileNameIdentifier) {
          const fileNameId = path.scope.generateUidIdentifier(FILE_NAME_VAR);
          state.fileNameIdentifier = fileNameId;

          path.scope.getProgramParent().push({
            id: fileNameId,
            init: t.stringLiteral(state.filename || ""),
          });
        }

        node.attributes.push(
          t.jsxAttribute(
            t.jsxIdentifier(TRACE_ID),
            t.jsxExpressionContainer(
              makeTrace(t.cloneNode(state.fileNameIdentifier), node.loc.start),
            ),
          ),
        );
      },
    },
  };
});
