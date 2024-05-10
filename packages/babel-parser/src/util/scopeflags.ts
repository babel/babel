// Each scope gets a bitset that may contain these flags
/* prettier-ignore */
export const enum ScopeFlag {
  OTHER        = 0b000000000,
  PROGRAM      = 0b000000001,
  FUNCTION     = 0b000000010,
  ARROW        = 0b000000100,
  SIMPLE_CATCH = 0b000001000,
  SUPER        = 0b000010000,
  DIRECT_SUPER = 0b000100000,
  CLASS        = 0b001000000,
  STATIC_BLOCK = 0b010000000,
  TS_MODULE    = 0b100000000,
  VAR          = PROGRAM | FUNCTION | STATIC_BLOCK | TS_MODULE,
}

/* prettier-ignore */
export const enum BindingFlag {
  // These flags are meant to be _only_ used inside the Scope class (or subclasses).
  KIND_VALUE             = 0b0000000_0000_01,
  KIND_TYPE              = 0b0000000_0000_10,
  // Used in checkLVal and declareName to determine the type of a binding
  SCOPE_VAR              = 0b0000000_0001_00, // Var-style binding
  SCOPE_LEXICAL          = 0b0000000_0010_00, // Let- or const-style binding
  SCOPE_FUNCTION         = 0b0000000_0100_00, // Function declaration
  SCOPE_OUTSIDE          = 0b0000000_1000_00, // Special case for function names as
  // bound inside the function
  // Misc flags
  FLAG_NONE              = 0b00000001_0000_00,
  FLAG_CLASS             = 0b00000010_0000_00,
  FLAG_TS_ENUM           = 0b00000100_0000_00,
  FLAG_TS_CONST_ENUM     = 0b00001000_0000_00,
  FLAG_TS_EXPORT_ONLY    = 0b00010000_0000_00,
  FLAG_FLOW_DECLARE_FN   = 0b00100000_0000_00,
  FLAG_TS_IMPORT         = 0b01000000_0000_00,
  // Whether "let" should be allowed in bound names in sloppy mode
  FLAG_NO_LET_IN_LEXICAL = 0b10000000_0000_00,

  // These flags are meant to be _only_ used by Scope consumers
/* prettier-ignore */
  /*                   = is value?  | is type?  |      scope     |    misc flags    */
  TYPE_CLASS           = KIND_VALUE | KIND_TYPE | SCOPE_LEXICAL  | FLAG_CLASS|FLAG_NO_LET_IN_LEXICAL,
  TYPE_LEXICAL         = KIND_VALUE | 0         | SCOPE_LEXICAL  | FLAG_NO_LET_IN_LEXICAL,
  TYPE_CATCH_PARAM     = KIND_VALUE | 0         | SCOPE_LEXICAL  | 0,
  TYPE_VAR             = KIND_VALUE | 0         | SCOPE_VAR      | 0,
  TYPE_FUNCTION        = KIND_VALUE | 0         | SCOPE_FUNCTION | 0,
  TYPE_TS_INTERFACE    = 0          | KIND_TYPE | 0              | FLAG_CLASS,
  TYPE_TS_TYPE         = 0          | KIND_TYPE | 0              | 0,
  TYPE_TS_ENUM         = KIND_VALUE | KIND_TYPE | SCOPE_LEXICAL  | FLAG_TS_ENUM|FLAG_NO_LET_IN_LEXICAL,
  TYPE_TS_AMBIENT      = 0          | 0         | 0              | FLAG_TS_EXPORT_ONLY,
  // These bindings don't introduce anything in the scope. They are used for assignments and
  // function expressions IDs.
  TYPE_NONE            = 0          | 0         | 0              | FLAG_NONE,
  TYPE_OUTSIDE         = KIND_VALUE | 0         | 0              | FLAG_NONE,
  TYPE_TS_CONST_ENUM   = TYPE_TS_ENUM | FLAG_TS_CONST_ENUM,
  TYPE_TS_NAMESPACE    = 0          | 0         | 0              | FLAG_TS_EXPORT_ONLY,
  TYPE_TS_TYPE_IMPORT  = 0          | KIND_TYPE | 0              | FLAG_TS_IMPORT,
  TYPE_TS_VALUE_IMPORT = 0          | 0         | 0              | FLAG_TS_IMPORT,
  TYPE_FLOW_DECLARE_FN = 0          | 0         | 0              | FLAG_FLOW_DECLARE_FN,
}

/* prettier-ignore */
export const enum ClassElementType {
  OTHER           = 0,
  FLAG_STATIC     = 0b1_00,
  KIND_GETTER     = 0b0_10,
  KIND_SETTER     = 0b0_01,
  KIND_ACCESSOR   = KIND_GETTER | KIND_SETTER,

  STATIC_GETTER   = FLAG_STATIC | KIND_GETTER,
  STATIC_SETTER   = FLAG_STATIC | KIND_SETTER,
  INSTANCE_GETTER = KIND_GETTER,
  INSTANCE_SETTER = KIND_SETTER,
}
