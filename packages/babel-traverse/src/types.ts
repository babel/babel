import type * as t from "@babel/types";
import type { NodePath } from "./index.ts";
import type { VirtualTypeAliases } from "./path/lib/virtual-types.ts";
import type {
  ExplVisitorBase,
  VisitorBaseNodes,
  VisitorBaseAliases,
} from "./generated/visitor-types.d.ts";

export type VisitPhase = "enter" | "exit";

interface VisitNodeObject<S, P extends t.Node> {
  enter?: VisitNodeFunction<S, P>;
  exit?: VisitNodeFunction<S, P>;
}

export interface ExplVisitNode<S, P extends t.Node> {
  enter?: VisitNodeFunction<S, P>[];
  exit?: VisitNodeFunction<S, P>[];
}

export interface ExplodedVisitor<S = unknown>
  extends ExplVisitorBase<S>,
    ExplVisitNode<S, t.Node> {
  _exploded: true;
  _verified: true;
}

// TODO: Assert that the keys of this are the keys of VirtualTypeAliases without
// the keys of VisitorBaseNodes and VisitorBaseAliases
// prettier-ignore
interface VisitorVirtualAliases<S> {
  BindingIdentifier?: VisitNode<S, VirtualTypeAliases["BindingIdentifier"]>;
  BlockScoped?: VisitNode<S, VirtualTypeAliases["BlockScoped"]>;
  ExistentialTypeParam?: VisitNode<S, VirtualTypeAliases["ExistentialTypeParam"]>;
  Expression?: VisitNode<S, VirtualTypeAliases["Expression"]>;
  //Flow?: VisitNode<S, VirtualTypeAliases["Flow"]>;
  ForAwaitStatement?: VisitNode<S, VirtualTypeAliases["ForAwaitStatement"]>;
  Generated?: VisitNode<S, VirtualTypeAliases["Generated"]>;
  NumericLiteralTypeAnnotation?: VisitNode<S, VirtualTypeAliases["NumericLiteralTypeAnnotation"]>;
  Pure?: VisitNode<S, VirtualTypeAliases["Pure"]>;
  Referenced?: VisitNode<S, VirtualTypeAliases["Referenced"]>;
  ReferencedIdentifier?: VisitNode<S, VirtualTypeAliases["ReferencedIdentifier"]>;
  ReferencedMemberExpression?: VisitNode<S, VirtualTypeAliases["ReferencedMemberExpression"]>;
  //RestProperty?: VisitNode<S, VirtualTypeAliases["RestProperty"]>;
  Scope?: VisitNode<S, VirtualTypeAliases["Scope"]>;
  //SpreadProperty?: VisitNode<S, VirtualTypeAliases["SpreadProperty"]>;
  Statement?: VisitNode<S, VirtualTypeAliases["Statement"]>;
  User?: VisitNode<S, VirtualTypeAliases["User"]>;
  Var?: VisitNode<S, VirtualTypeAliases["Var"]>;
}

// TODO: Do not export this? Or give it a better name?
export interface VisitorBase<S>
  extends VisitNodeObject<S, t.Node>,
    VisitorBaseNodes<S>,
    VisitorBaseAliases<S>,
    VisitorVirtualAliases<S> {
  // Babel supports `NodeTypesWithoutComment | NodeTypesWithoutComment | ... ` but it is
  // too complex for TS. So we type it as a general visitor only if the key contains `|`
  // this is good enough for non-visitor traverse options e.g. `noScope`
  [k: `${string}|${string}`]: VisitNode<S, t.Node>;
}

export type Visitor<S = unknown> = VisitorBase<S> | ExplodedVisitor<S>;

export type VisitNode<S, P extends t.Node> =
  | VisitNodeFunction<S, P>
  | VisitNodeObject<S, P>;

export type VisitNodeFunction<S, P extends t.Node> = (
  this: S,
  path: NodePath<P>,
  state: S,
) => void;
