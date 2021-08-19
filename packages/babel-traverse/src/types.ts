import type * as t from "@babel/types";
import { NodePath } from "./index";
import { VirtualTypeAliases } from "./path/generated/virtual-types";

export type Visitor<S = {}> = VisitNodeObject<S, t.Node> &
  {
    [Type in t.Node["type"]]?: VisitNode<S, Extract<t.Node, { type: Type }>>;
  } &
  {
    [K in keyof t.Aliases]?: VisitNode<S, t.Aliases[K]>;
  } &
  {
    [K in keyof VirtualTypeAliases]?: VisitNode<S, VirtualTypeAliases[K]>;
  } & {
    [k: string]: VisitNode<S, t.Node>;
  };

export type VisitNode<S, P extends t.Node> =
  | VisitNodeFunction<S, P>
  | VisitNodeObject<S, P>;

export type VisitNodeFunction<S, P extends t.Node> = (
  this: S,
  path: NodePath<P>,
  state: S,
) => void;

export interface VisitNodeObject<S, P extends t.Node> {
  enter?: VisitNodeFunction<S, P>;
  exit?: VisitNodeFunction<S, P>;
}
