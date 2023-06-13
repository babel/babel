import type NodePath from "../path";
import type * as t from "@babel/types";
import type Scope from "./index";

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

    if (
      (kind === "var" || kind === "hoisted") &&
      // https://github.com/rollup/rollup/issues/4654
      // Rollup removes the path argument from this call. Add an
      // unreachable IIFE (that rollup doesn't know is unreachable)
      // with side effects, to prevent it from messing up with arguments.
      // You can reproduce this with
      //   BABEL_8_BREAKING=true make prepublish-build
      isDeclaredInLoop(
        path ||
          (() => {
            throw new Error("Internal Babel error: unreachable ");
          })(),
      )
    ) {
      this.reassign(path);
    }

    this.clearValue();
  }

  constantViolations: Array<NodePath> = [];
  get constant(): boolean {
    return this.constantViolations.length === 0;
  }

  referencePaths: Array<NodePath> = [];
  get references(): number {
    return this.referencePaths.length;
  }
  get referenced(): boolean {
    return this.references !== 0;
  }

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
    if (this.constantViolations.indexOf(path) !== -1) {
      return;
    }
    this.constantViolations.push(path);
  }

  /**
   * Increment the amount of references to this binding.
   */

  reference(path: NodePath) {
    if (this.referencePaths.indexOf(path) !== -1) {
      return;
    }
    this.referencePaths.push(path);
  }

  /**
   * Decrement the amount of references to this binding.
   */

  dereference(path: NodePath) {
    const index = this.referencePaths.indexOf(path);
    if (index === -1) {
      return;
    }
    this.referencePaths.splice(index, 1);
  }
}

function isDeclaredInLoop(path: NodePath) {
  for (
    let { parentPath, key } = path;
    parentPath;
    { parentPath, key } = parentPath
  ) {
    if (parentPath.isFunctionParent()) return false;
    if (
      parentPath.isWhile() ||
      parentPath.isForXStatement() ||
      (parentPath.isForStatement() && key === "body")
    ) {
      return true;
    }
  }
  return false;
}
