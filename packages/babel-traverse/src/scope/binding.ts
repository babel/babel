import type NodePath from "../path/index.ts";
import type * as t from "@babel/types";
import type Scope from "./index.ts";

export type BindingKind =
  | "var" /* var declarator */
  | "let" /* let declarator, class declaration id, catch clause parameters */
  | "const" /* const/using declarator */
  | "module" /* import specifiers */
  | "hoisted" /* function declaration id */
  | "param" /* function declaration parameters */
  | "local" /* function expression id, class expression id */
  | "unknown"; /* export specifiers */
/**
 * This class is responsible for a binding inside of a scope.
 *
 * It tracks the following:
 *
 *  * Node path.
 *  * Amount of times referenced by other nodes.
 *  * Paths to nodes that reassign or modify this binding.
 *  * The kind of binding. (Is it a parameter, declaration etc)
 */

export default class Binding {
  identifier: t.Identifier;
  scope: Scope;
  path: NodePath;
  kind: BindingKind;

  constructor({
    identifier,
    scope,
    path,
    kind,
  }: {
    identifier: t.Identifier;
    scope: Scope;
    path: NodePath;
    kind: BindingKind;
  }) {
    this.identifier = identifier;
    this.scope = scope;
    this.path = path;
    this.kind = kind;

    if ((kind === "var" || kind === "hoisted") && isInitInLoop(path)) {
      this.reassign(path);
    }

    this.clearValue();
  }

  constantViolations: Array<NodePath> = [];
  constant: boolean = true;

  referencePaths: Array<NodePath> = [];
  referenced: boolean = false;
  references: number = 0;

  declare hasDeoptedValue: boolean;
  declare hasValue: boolean;
  declare value: any;

  deoptValue() {
    this.clearValue();
    this.hasDeoptedValue = true;
  }

  setValue(value: any) {
    if (this.hasDeoptedValue) return;
    this.hasValue = true;
    this.value = value;
  }

  clearValue() {
    this.hasDeoptedValue = false;
    this.hasValue = false;
    this.value = null;
  }

  /**
   * Register a constant violation with the provided `path`.
   */

  reassign(path: NodePath) {
    this.constant = false;
    if (this.constantViolations.includes(path)) {
      return;
    }
    this.constantViolations.push(path);
  }

  /**
   * Increment the amount of references to this binding.
   */

  reference(path: NodePath) {
    if (this.referencePaths.includes(path)) {
      return;
    }
    this.referenced = true;
    this.references++;
    this.referencePaths.push(path);
  }

  /**
   * Decrement the amount of references to this binding.
   */

  dereference() {
    this.references--;
    this.referenced = !!this.references;
  }
}

function isInitInLoop(path: NodePath) {
  const isFunctionDeclarationOrHasInit =
    !path.isVariableDeclarator() || path.node.init;
  for (
    let { parentPath, key } = path;
    parentPath;
    { parentPath, key } = parentPath
  ) {
    if (parentPath.isFunctionParent()) return false;
    if (
      (key === "left" && parentPath.isForXStatement()) ||
      (isFunctionDeclarationOrHasInit && key === "body" && parentPath.isLoop())
    ) {
      return true;
    }
  }
  return false;
}
