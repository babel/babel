// @flow

/**
 * Add parens to a node if it's needed.
 */
export default function inheritParens<T: Object>(child: T, parent: Object): T {
  if (parent.extra && parent.extra.parenthesized) {
    if (!child.extra) {
      child.extra = {};
    }
    child.extra.parenthesized = true;
    child.extra.parenStart = parent.extra.parenStart;
  }
  return child;
}
