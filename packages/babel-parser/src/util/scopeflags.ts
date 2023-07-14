// Each scope gets a bitset that may contain these flags
export const enum ScopeFlag {
  OTHER = 0b000000000,
  PROGRAM = 0b000000001,
  FUNCTION = 0b000000010,
  ARROW = 0b000000100,
  SIMPLE_CATCH = 0b000001000,
  SUPER = 0b000010000,
  DIRECT_SUPER = 0b000100000,
  CLASS = 0b001000000,
  STATIC_BLOCK = 0b010000000,
  TS_MODULE = 0b100000000,
  VAR = PROGRAM | FUNCTION | STATIC_BLOCK | TS_MODULE,
}

// These flags are meant to be _only_ used inside the Scope class (or subclasses).
// prettier-ignore
export const BIND_KIND_VALUE            = 0b0000000_0000_01,
             BIND_KIND_TYPE             = 0b0000000_0000_10,
             // Used in checkLVal and declareName to determine the type of a binding
             BIND_SCOPE_VAR             = 0b0000000_0001_00, // Var-style binding
             BIND_SCOPE_LEXICAL         = 0b0000000_0010_00, // Let- or const-style binding
             BIND_SCOPE_FUNCTION        = 0b0000000_0100_00, // Function declaration
             BIND_SCOPE_OUTSIDE         = 0b0000000_1000_00, // Special case for function names as
                                                   // bound inside the function
             // Misc flags
             BIND_FLAGS_NONE            = 0b00000001_0000_00,
             BIND_FLAGS_CLASS           = 0b00000010_0000_00,
             BIND_FLAGS_TS_ENUM         = 0b00000100_0000_00,
             BIND_FLAGS_TS_CONST_ENUM   = 0b00001000_0000_00,
             BIND_FLAGS_TS_EXPORT_ONLY  = 0b00010000_0000_00,
             BIND_FLAGS_FLOW_DECLARE_FN = 0b00100000_0000_00,
             BIND_FLAGS_TS_IMPORT       = 0b01000000_0000_00,
             // Whether "let" should be allowed in bound names in sloppy mode
             BIND_FLAGS_NO_LET_IN_LEXICAL = 0b10000000_0000_00;

// These flags are meant to be _only_ used by Scope consumers
// prettier-ignore
/*                              =    is value?    |    is type?    |      scope          |    misc flags    */
export const BIND_CLASS         = BIND_KIND_VALUE | BIND_KIND_TYPE | BIND_SCOPE_LEXICAL  | BIND_FLAGS_CLASS|BIND_FLAGS_NO_LET_IN_LEXICAL,
             BIND_LEXICAL       = BIND_KIND_VALUE | 0              | BIND_SCOPE_LEXICAL  | BIND_FLAGS_NO_LET_IN_LEXICAL,
             BIND_CATCH_PARAM   = BIND_KIND_VALUE | 0              | BIND_SCOPE_LEXICAL  | 0                 ,
             BIND_VAR           = BIND_KIND_VALUE | 0              | BIND_SCOPE_VAR      | 0                 ,
             BIND_FUNCTION      = BIND_KIND_VALUE | 0              | BIND_SCOPE_FUNCTION | 0                 ,
             BIND_TS_INTERFACE  = 0               | BIND_KIND_TYPE | 0                   | BIND_FLAGS_CLASS  ,
             BIND_TS_TYPE       = 0               | BIND_KIND_TYPE | 0                   | 0                 ,
             BIND_TS_ENUM       = BIND_KIND_VALUE | BIND_KIND_TYPE | BIND_SCOPE_LEXICAL  | BIND_FLAGS_TS_ENUM|BIND_FLAGS_NO_LET_IN_LEXICAL,
             BIND_TS_AMBIENT    = 0               | 0              | 0            | BIND_FLAGS_TS_EXPORT_ONLY,
             // These bindings don't introduce anything in the scope. They are used for assignments and
             // function expressions IDs.
             BIND_NONE          = 0               | 0              | 0                   | BIND_FLAGS_NONE          ,
             BIND_OUTSIDE       = BIND_KIND_VALUE | 0              | 0                   | BIND_FLAGS_NONE          ,

             BIND_TS_CONST_ENUM = BIND_TS_ENUM    | BIND_FLAGS_TS_CONST_ENUM                                        ,
             BIND_TS_NAMESPACE  = 0               | 0              | 0                   | BIND_FLAGS_TS_EXPORT_ONLY,
             BIND_TS_TYPE_IMPORT= 0               | BIND_KIND_TYPE | 0                   | BIND_FLAGS_TS_IMPORT     ,

             BIND_FLOW_DECLARE_FN = BIND_FLAGS_FLOW_DECLARE_FN;

export type BindingTypes =
  | typeof BIND_NONE
  | typeof BIND_OUTSIDE
  | typeof BIND_VAR
  | typeof BIND_LEXICAL
  | typeof BIND_CLASS
  | typeof BIND_FUNCTION
  | typeof BIND_TS_INTERFACE
  | typeof BIND_TS_TYPE
  | typeof BIND_TS_ENUM
  | typeof BIND_TS_AMBIENT
  | typeof BIND_TS_NAMESPACE;

export const enum ClassElementType {
  OTHER = 0,
  FLAG_STATIC = 0b1_00,
  KIND_GETTER = 0b0_10,
  KIND_SETTER = 0b0_01,
  KIND_ACCESSOR = KIND_GETTER | KIND_SETTER,

  STATIC_GETTER = FLAG_STATIC | KIND_GETTER,
  STATIC_SETTER = FLAG_STATIC | KIND_SETTER,
  INSTANCE_GETTER = KIND_GETTER,
  INSTANCE_SETTER = KIND_SETTER,
}
