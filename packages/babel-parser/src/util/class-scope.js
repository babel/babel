// @flow

import {
  CLASS_ELEMENT_KIND_ACCESSOR,
  CLASS_ELEMENT_FLAG_STATIC,
  type ClassElementTypes,
} from "./scopeflags";
import { Position } from "./location";
import { Errors } from "../parse-error";
import Tokenizer from "../tokenizer";

export class ClassScope {
  // A list of private named declared in the current class
  privateNames: Set<string> = new Set();

  // A list of private getters of setters without their counterpart
  loneAccessors: Map<string, ClassElementTypes> = new Map();

  // A list of private names used before being defined, mapping to
  // their position.
  undefinedPrivateNames: Map<string, Position> = new Map();
}

export default class ClassScopeHandler {
  parser: Tokenizer;
  stack: Array<ClassScope> = [];
  undefinedPrivateNames: Map<string, Position> = new Map();

  constructor(parser: Tokenizer) {
    this.parser = parser;
  }

  current(): ClassScope {
    return this.stack[this.stack.length - 1];
  }

  enter() {
    this.stack.push(new ClassScope());
  }

  exit() {
    const oldClassScope = this.stack.pop();

    // Migrate the usage of not yet defined private names to the outer
    // class scope, or raise an error if we reached the top-level scope.

    const current = this.current();

    // Array.from is needed because this is compiled to an array-like for loop
    for (const [name, loc] of Array.from(oldClassScope.undefinedPrivateNames)) {
      if (current) {
        if (!current.undefinedPrivateNames.has(name)) {
          current.undefinedPrivateNames.set(name, loc);
        }
      } else {
        this.parser.raise(Errors.InvalidPrivateFieldResolution, {
          at: loc,
          name,
        });
      }
    }
  }

  declarePrivateName(
    name: string,
    elementType: ClassElementTypes,
    loc: Position,
  ) {
    const { privateNames, loneAccessors, undefinedPrivateNames } =
      this.current();
    let redefined = privateNames.has(name);

    if (elementType & CLASS_ELEMENT_KIND_ACCESSOR) {
      const accessor = redefined && loneAccessors.get(name);
      if (accessor) {
        const oldStatic = accessor & CLASS_ELEMENT_FLAG_STATIC;
        const newStatic = elementType & CLASS_ELEMENT_FLAG_STATIC;

        const oldKind = accessor & CLASS_ELEMENT_KIND_ACCESSOR;
        const newKind = elementType & CLASS_ELEMENT_KIND_ACCESSOR;

        // The private name can be duplicated only if it is used by
        // two accessors with different kind (get and set), and if
        // they have the same placement (static or not).
        redefined = oldKind === newKind || oldStatic !== newStatic;

        if (!redefined) loneAccessors.delete(name);
      } else if (!redefined) {
        loneAccessors.set(name, elementType);
      }
    }

    if (redefined) {
      this.parser.raise(Errors.PrivateNameRedeclaration, { at: loc, name });
    }

    privateNames.add(name);
    undefinedPrivateNames.delete(name);
  }

  usePrivateName(name: string, loc: Position) {
    let classScope;
    for (classScope of this.stack) {
      if (classScope.privateNames.has(name)) return;
    }

    if (classScope) {
      classScope.undefinedPrivateNames.set(name, loc);
    } else {
      // top-level
      this.parser.raise(Errors.InvalidPrivateFieldResolution, {
        at: loc,
        name,
      });
    }
  }
}
