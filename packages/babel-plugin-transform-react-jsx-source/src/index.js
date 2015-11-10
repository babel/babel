
 /**
 * This adds {fileName, lineNumber} annotations to React component definitions
 * and to jsx tag literals.
 *
 *
 * == JSX Literals ==
 *
 * <sometag />
 *
 * becomes:
 *
 * <sometag __source={{fileName: 'this/file.js', lineNumber: 10}}/>
 */


import path from "path";

const TRACE_ID = "__source";

export default function ({ types: t }) {
  function objectToAst(object) {
    const properties = Object.keys(object).map((attr) => {
      let value;
      switch(typeof object[attr]) {
        case "number": value = t.numericLiteral(object[attr]); break;
        default: value = t.stringLiteral(object[attr].toString());
      }
      return t.objectProperty(t.identifier(attr), value);
    });
    return t.objectExpression(properties);
  }

  function makeTrace(fileName, lineNumber) {
    return objectToAst({
      fileName,
      lineNumber,
    });
  }

  let visitor = {
    JSXOpeningElement(node, state) {
      const id = t.jSXIdentifier(TRACE_ID);
      const fileName = state.file.log.filename !== "unknown" 
        ? path.relative(__dirname, state.file.log.filename) 
        : null;
      const trace = makeTrace(fileName, node.container.openingElement.loc.start.line);

      node.container.openingElement.attributes.push(t.jSXAttribute(id, t.jSXExpressionContainer(trace)));
    }
  };

  return {
    visitor
  };
}
