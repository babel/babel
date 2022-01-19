export interface VirtualTypeAliases {
  BindingIdentifier: t.Identifier;
  BlockScoped: t.Node;
  ExistentialTypeParam: t.ExistsTypeAnnotation;
  Expression: t.Expression;
  Flow: t.Flow | t.ImportDeclaration | t.ExportDeclaration | t.ImportSpecifier;
  ForAwaitStatement: t.ForOfStatement;
  Generated: t.Node;
  NumericLiteralTypeAnnotation: t.NumberLiteralTypeAnnotation;
  Pure: t.Node;
  Referenced: t.Node;
  ReferencedIdentifier: t.Identifier | t.JSXIdentifier;
  ReferencedMemberExpression: t.MemberExpression;
  RestProperty: t.RestElement;
  Scope: t.Scopable | t.Pattern;
  SpreadProperty: t.RestElement;
  Statement: t.Statement;
  User: t.Node;
  Var: t.VariableDeclaration;
}

type NodeTypes = t.Node["type"] | t.Comment["type"] | keyof t.Aliases;

export type Wrapper = {
  types?: NodeTypes[];
  checkPath?(path: NodePath): boolean;
};

export const ReferencedIdentifier: Wrapper = {
  types: ["Identifier", "JSXIdentifier"],
  checkPath: path => path.isReferencedIdentifier(),
};

export const ReferencedMemberExpression: Wrapper = {
  types: ["MemberExpression"],
  checkPath: path => path.isReferencedMemberExpression(),
};

export const BindingIdentifier: Wrapper = {
  types: ["Identifier"],
  checkPath: path => path.isBindingIdentifier(),
};

export const Statement: Wrapper = {
  types: ["Statement"],
  checkPath: path => path.isStatement(),
};

export const Expression: Wrapper = {
  types: ["Expression"],
  checkPath: path => path.isExpression(),
};

export const Scope: Wrapper = {
  // When pattern is inside the function params, it is a scope
  types: ["Scopable", "Pattern"],
  checkPath: path => path.isScope(),
};

export const Referenced: Wrapper = {
  checkPath: path => path.isReferenced(),
};

export const BlockScoped: Wrapper = {
  checkPath: path => path.isBlockScoped(),
};

export const Var: Wrapper = {
  types: ["VariableDeclaration"],
  checkPath: path => path.isVar(),
};

export const User: Wrapper = {
  checkPath: path => path.isUser(),
};

export const Generated: Wrapper = {
  checkPath: path => path.isGenerated(),
};

export const Pure: Wrapper = {
  checkPath: path => path.isPure(),
};

export const Flow: Wrapper = {
  types: ["Flow", "ImportDeclaration", "ExportDeclaration", "ImportSpecifier"],
  checkPath: path => path.isFlow(),
};

// TODO: 7.0 Backwards Compat
export const RestProperty: Wrapper = {
  types: ["RestElement"],
  checkPath: path => path.isRestProperty(),
};

export const SpreadProperty: Wrapper = {
  types: ["RestElement"],
  checkPath: path => path.isSpreadProperty(),
};

export const ExistentialTypeParam: Wrapper = {
  types: ["ExistsTypeAnnotation"],
};

export const NumericLiteralTypeAnnotation: Wrapper = {
  types: ["NumberLiteralTypeAnnotation"],
};

export const ForAwaitStatement: Wrapper = {
  types: ["ForOfStatement"],
  checkPath: path => path.isForAwaitStatement(),
};
