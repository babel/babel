import type * as t from "@babel/types";
import type { NodePath } from "./index";
import type { VirtualTypeAliases } from "./path/lib/virtual-types";

export type VisitPhase = "enter" | "exit";

type VisitNodeObject<S, P extends t.Node> = {
  [K in VisitPhase]?: VisitNodeFunction<S, P>;
};

export type ExplVisitNode<S, P extends t.Node> = {
  [K in VisitPhase]?: VisitNodeFunction<S, P>[];
};

export type ExplodedVisitor<S = unknown> = ExplVisitNode<S, t.Node> & {
  [Type in t.Node["type"]]?: ExplVisitNode<S, Extract<t.Node, { type: Type }>>;
} & { _exploded: true; _verified: true };

export type Visitor<S = unknown> =
  | (VisitNodeObject<S, t.Node> & {
      [Type in t.Node["type"]]?: VisitNode<S, Extract<t.Node, { type: Type }>>;
    } & {
      [K in keyof t.Aliases]?: VisitNode<S, t.Aliases[K]>;
    } & {
      [K in keyof VirtualTypeAliases]?: VisitNode<S, VirtualTypeAliases[K]>;
    } & {
      // Babel supports `NodeTypesWithoutComment | NodeTypesWithoutComment | ... ` but it is
      // too complex for TS. So we type it as a general visitor only if the key contains `|`
      // this is good enough for non-visitor traverse options e.g. `noScope`
      [k: `${string}|${string}`]: VisitNode<S, t.Node>;
    })
  | ExplodedVisitor<S>;

export type VisitNode<S, P extends t.Node> =
  | VisitNodeFunction<S, P>
  | VisitNodeObject<S, P>;

export type VisitNodeFunction<S, P extends t.Node> = (
  this: S,
  path: NodePath<P>,
  state: S,
) => void;
