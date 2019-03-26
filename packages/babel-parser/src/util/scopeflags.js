// @flow

// Each scope gets a bitset that may contain these flags
// prettier-ignore
export const SCOPE_OTHER        = 0b000000000,
             SCOPE_PROGRAM      = 0b000000001,
             SCOPE_FUNCTION     = 0b000000010,
             SCOPE_ASYNC        = 0b000000100,
             SCOPE_GENERATOR    = 0b000001000,
             SCOPE_ARROW        = 0b000010000,
             SCOPE_SIMPLE_CATCH = 0b000100000,
             SCOPE_SUPER        = 0b001000000,
             SCOPE_DIRECT_SUPER = 0b010000000,
             SCOPE_CLASS        = 0b100000000,
             SCOPE_VAR = SCOPE_PROGRAM | SCOPE_FUNCTION;

export type ScopeFlags =
  | typeof SCOPE_OTHER
  | typeof SCOPE_PROGRAM
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

// prettier-ignore
export const BIND_KIND_VALUE          = 0b0000_00000_01,
             BIND_KIND_TYPE           = 0b0000_00000_10,
             // Used in checkLVal and declareName to determine the type of a binding
             BIND_SCOPE_VAR           = 0b0000_00001_00, // Var-style binding
             BIND_SCOPE_LEXICAL       = 0b0000_00010_00, // Let- or const-style binding
             BIND_SCOPE_FUNCTION      = 0b0000_00100_00, // Function declaration
             BIND_SCOPE_SIMPLE_CATCH  = 0b0000_01000_00, // Simple (identifier pattern) catch binding
             BIND_SCOPE_OUTSIDE       = 0b0000_10000_00, // Special case for function names as bound inside the function
             // Misc flags
             BIND_FLAGS_CLASS         = 0b0001_00000_00,
             BIND_FLAGS_SCOPE_OUTSIDE = 0b0010_00000_00,
             BIND_FLAGS_SIMPLE_CATCH  = 0b0100_00000_00,
             BIND_FLAGS_TS_ENUM       = 0b1000_00000_00;

// prettier-ignore
/*                             =    is value?    |    is type?    |      scope          |    misc flags    */
export const BIND_CLASS        = BIND_KIND_VALUE | BIND_KIND_TYPE | BIND_SCOPE_LEXICAL  | BIND_FLAGS_CLASS  ,
             BIND_LEXICAL      = BIND_KIND_VALUE | 0              | BIND_SCOPE_LEXICAL  | 0                 ,
             BIND_VAR          = BIND_KIND_VALUE | 0              | BIND_SCOPE_VAR      | 0                 ,
             BIND_FUNCTION     = BIND_KIND_VALUE | 0              | BIND_SCOPE_FUNCTION | 0                 ,
             BIND_OUTSIDE      = BIND_KIND_VALUE | 0              | BIND_SCOPE_OUTSIDE  | 0                 ,
             BIND_TS_INTERFACE = 0               | BIND_KIND_TYPE | 0                   | BIND_FLAGS_CLASS  ,
             BIND_TS_TYPE      = 0               | BIND_KIND_TYPE | 0                   | 0                 ,
             BIND_TS_ENUM      = BIND_KIND_VALUE | BIND_KIND_TYPE | BIND_SCOPE_LEXICAL  | BIND_FLAGS_TS_ENUM,

             BIND_SIMPLE_CATCH = BIND_LEXICAL  | BIND_FLAGS_SIMPLE_CATCH,
             BIND_NONE         = 0;

export type BindingTypes =
  | typeof BIND_NONE
  | typeof BIND_VAR
  | typeof BIND_LEXICAL
  | typeof BIND_CLASS
  | typeof BIND_FUNCTION
  | typeof BIND_SIMPLE_CATCH
  | typeof BIND_OUTSIDE
  | typeof BIND_TS_INTERFACE
  | typeof BIND_TS_TYPE
  | typeof BIND_TS_ENUM;
