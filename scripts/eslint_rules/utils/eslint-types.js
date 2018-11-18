/*:: // ESLint types

type Node = { type: string, [string]: any };

type Definition = {
  type: "ImportedBinding",
  name: Node,
  node: Node,
  parent: Node,
};

type Variable = {
  defs: Definition[],
};

type Scope = {
  set: Map<string, Variable>,
  upper: ?Scope,
};

type Context = {
  report(options: {
    node: Node,
    message: string,
    fix?: (fixer: Fixer) => ?Fixer,
  }): void,

  getScope(): Scope,
};

type Fixer = {
  replaceText(node: Node, replacement: string): Fixer,
};
*/
