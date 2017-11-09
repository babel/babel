/**
 * This adds a __self={this} JSX attribute to all JSX elements, which React will use
 * to generate some runtime warnings.
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
import { types as t } from "@babel/core";

import CACHE_KEY from "./_cache-key";
export { CACHE_KEY };

const TRACE_ID = "__self";

export default function() {
  const visitor = {
    JSXOpeningElement({ node }) {
      const id = t.jSXIdentifier(TRACE_ID);
      const trace = t.thisExpression();

      node.attributes.push(t.jSXAttribute(id, t.jSXExpressionContainer(trace)));
    },
  };

  return {
    cacheKey: CACHE_KEY,
    visitor,
  };
}
