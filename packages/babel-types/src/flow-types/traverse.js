// @flow
export type TraversalAncestors<T: BabelNode> = Array<{
  node: T,
  key: string,
  index?: number,
}>;
export type TraversalHandler<T: BabelNode, S: Object> = (
  T,
  TraversalAncestors<T>,
  S,
) => void;
export type TraversalHandlers<T: BabelNode, S: Object> = {
  enter?: TraversalHandler<T, S>,
  exit?: TraversalHandler<T, S>,
};
