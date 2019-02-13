// @flow

// Each scope gets a bitset that may contain these flags
// prettier-ignore
export const SCOPE_TOP =          0b000000001,
             SCOPE_FUNCTION =     0b000000010,
             SCOPE_ASYNC =        0b000000100,
             SCOPE_GENERATOR =    0b000001000,
             SCOPE_ARROW =        0b000010000,
             SCOPE_SIMPLE_CATCH = 0b000100000,
             SCOPE_SUPER =        0b001000000,
             SCOPE_DIRECT_SUPER = 0b010000000,
             SCOPE_CLASS        = 0b100000000,
             SCOPE_VAR = SCOPE_TOP | SCOPE_FUNCTION;

export type ScopeFlags =
  | typeof SCOPE_TOP
  | typeof SCOPE_FUNCTION
  | typeof SCOPE_VAR
  | typeof SCOPE_ASYNC
  | typeof SCOPE_GENERATOR
  | typeof SCOPE_ARROW
  | typeof SCOPE_SIMPLE_CATCH
  | typeof SCOPE_SUPER
  | typeof SCOPE_DIRECT_SUPER
  | typeof SCOPE_CLASS;

export function functionFlags(isAsync: boolean, isGenerator: boolean) {
  return (
    SCOPE_FUNCTION |
    (isAsync ? SCOPE_ASYNC : 0) |
    (isGenerator ? SCOPE_GENERATOR : 0)
  );
}

// Used in checkLVal and declareName to determine the type of a binding
export const BIND_NONE = 0, // Not a binding
  BIND_VAR = 1, // Var-style binding
  BIND_LEXICAL = 2, // Let- or const-style binding
  BIND_FUNCTION = 3, // Function declaration
  BIND_SIMPLE_CATCH = 4, // Simple (identifier pattern) catch binding
  BIND_OUTSIDE = 5; // Special case for function names as bound inside the function

export type BindingTypes =
  | typeof BIND_NONE
  | typeof BIND_VAR
  | typeof BIND_LEXICAL
  | typeof BIND_FUNCTION
  | typeof BIND_SIMPLE_CATCH
  | typeof BIND_OUTSIDE;
