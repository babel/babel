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
import { type PluginPass, types as t } from "@babel/core";
import type { Visitor } from "@babel/traverse";

const TRACE_ID = "__source";
const FILE_NAME_VAR = "_jsxFileName";

type State = {
  fileNameIdentifier: t.Identifier;
};
export default declare<State>(api => {
  api.assertVersion(7);

  function makeTrace(
    fileNameIdentifier: t.Identifier,
    lineNumber: number,
    column0Based: number,
  ) {
    const fileLineLiteral =
      lineNumber != null ? t.numericLiteral(lineNumber) : t.nullLiteral();
    const fileColumnLiteral =
      column0Based != null
        ? t.numericLiteral(column0Based + 1)
        : t.nullLiteral();
    const fileNameProperty = t.objectProperty(
      t.identifier("fileName"),
      fileNameIdentifier,
    );
    const lineNumberProperty = t.objectProperty(
      t.identifier("lineNumber"),
      fileLineLiteral,
    );
    const columnNumberProperty = t.objectProperty(
      t.identifier("columnNumber"),
      fileColumnLiteral,
    );
    return t.objectExpression([
      fileNameProperty,
      lineNumberProperty,
      columnNumberProperty,
    ]);
  }

  const visitor: Visitor<State & PluginPass> = {
    JSXOpeningElement(path, state) {
      const id = t.jsxIdentifier(TRACE_ID);
      const location = (path.container as t.JSXElement).openingElement.loc;
      if (!location) {
        // the element was generated and doesn't have location information
        return;
      }

      const attributes = (path.container as t.JSXElement).openingElement
        .attributes;
      for (let i = 0; i < attributes.length; i++) {
        // @ts-expect-error .name is not defined in JSXSpreadElement
        const name = attributes[i].name as t.JSXAttribute["name"] | void;
        // @ts-expect-error TS can not narrow down optional chain
        if (name?.name === TRACE_ID) {
          // The __source attribute already exists
          return;
        }
      }

      if (!state.fileNameIdentifier) {
        const fileName = state.filename || "";

        const fileNameIdentifier =
          path.scope.generateUidIdentifier(FILE_NAME_VAR);
        const scope = path.hub.getScope();
        if (scope) {
          scope.push({
            id: fileNameIdentifier,
            init: t.stringLiteral(fileName),
          });
        }
        state.fileNameIdentifier = fileNameIdentifier;
      }

      const trace = makeTrace(
        t.cloneNode(state.fileNameIdentifier),
        location.start.line,
        location.start.column,
      );
      attributes.push(t.jsxAttribute(id, t.jsxExpressionContainer(trace)));
    },
  };

  return {
    name: "transform-react-jsx-source",
    visitor,
  };
});
