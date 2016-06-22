
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
 * <sometag __self={this} />
 */

const TRACE_ID = "__self";

export default function ({ types: t }) {
  let visitor = {
    JSXOpeningElement(node) {
      const id = t.jSXIdentifier(TRACE_ID);
      const trace = t.identifier("this");
      node.container.openingElement.attributes.push(t.jSXAttribute(id, t.jSXExpressionContainer(trace)));
    }
  };

  return {
    visitor
  };
}
