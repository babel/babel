/*
This file includes the code of TS Diagnostics error that should also be thrown from babel-parser.
The TypeScript parser is highly tolerant on errors so these error would not produce parseDiagnostics which can be checked
in the parser test runner. We check these error codes against the stderr log in the build/typescript/tests/baselines/reference

Note that babel-parser should not throw for the TypeChecking Diagnostics

The commented out diagnostic codes will introduce false positive cases that should be addressed in separate PRs.
*/

export default [
  // "TS1005", // '{0}' expected.
  "TS1009", // Trailing comma not allowed.
  "TS1014", // A rest parameter must be last in a parameter list.
  "TS1019", // An index signature parameter cannot have a question mark.
  "TS1028", // Accessibility modifier already seen.
  "TS1029", // '{0}' modifier must precede '{1}' modifier.
  "TS1030", // '{0}' modifier already seen.
  "TS1031", // '{0}' modifier cannot appear on a class element.
  "TS1039", // Initializers are not allowed in ambient contexts.
  "TS1042", // '{0}' modifier cannot be used here.
  "TS1048", // A rest parameter cannot have an initializer.
  "TS1053", // A 'set' accessor cannot have rest parameter.
  "TS1054", // A 'get' accessor cannot have parameters.
  // "TS1071", // '{0}' modifier cannot appear on an index signature.
  "TS1089", // '{0}' modifier cannot appear on a constructor declaration.
  "TS1090", // '{0}' modifier cannot appear on a parameter.
  "TS1100", // Invalid use of 'arguments' in strict mode.
  "TS1101", // 'with' statements are not allowed in strict mode.
  "TS1104", // A 'continue' statement can only be used within an enclosing iteration statement.
  "TS1105", // A 'break' statement can only be used within an enclosing iteration or switch statement.
  "TS1107", // Jump target cannot cross function boundary.
  "TS1108", // A 'return' statement can only be used within a function body.
  "TS1113", // A 'default' clause cannot appear more than once in a 'switch' statement.
  "TS1115", // A 'continue' statement can only jump to a label of an enclosing iteration statement.
  "TS1116", // A 'break' statement can only jump to a label of an enclosing statement.
  "TS1123", // Variable declaration list cannot be empty.
  "TS1141", // String literal expected.
  "TS1142", // Line break not permitted here.
  "TS1155", // 'const' declarations must be initialized.
  "TS1162", // An object member cannot be declared optional.
  "TS1163", // A 'yield' expression is only allowed in a generator body.
  "TS1184", // Modifiers cannot appear here.
  "TS1191", // An import declaration cannot have modifiers.
  "TS1196", // Catch clause variable type annotation must be 'any' or 'unknown' if specified.
  "TS1197", // Catch clause variable cannot have an initializer.
  "TS1200", // Line terminator not permitted before arrow.
  "TS1312", // '=' can only be used in an object literal property inside a destructuring assignment.
  // "TS1212", // Identifier expected. '{0}' is a reserved word in strict mode."
  // "TS1213", // Identifier expected. '{0}' is a reserved word in strict mode. Class definitions are automatically in strict mode.
  // "TS1214", // Identifier expected. '{0}' is a reserved word in strict mode. Modules are automatically in strict mode.
  "TS1246", // An interface property cannot have an initializer.
  "TS1247", // A type literal property cannot have an initializer.
  "TS1248", // A class member cannot have the 'const' keyword.
  "TS1308", // 'await' expression is only allowed within an async function.
  // "TS2300", // Duplicate identifier '{0}'.
  "TS2337", // Super calls are not permitted outside constructors or in nested functions inside constructors.
  "TS2390", // Constructor implementation is missing.
  "TS2391", // Function implementation is missing or not immediately following the declaration.
  "TS2364", // The left-hand side of an assignment expression must be a variable or a property access.
  // "TS2371", // A parameter initializer is only allowed in a function or constructor implementation.
  // "TS2393", // Duplicate function implementation.
  "TS2396", // Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.
  // "TS2440", // Import declaration conflicts with local declaration of '{0}'.
  // "TS2451", // Cannot redeclare block-scoped variable '{0}'.
  "TS2452", // An enum member cannot have a numeric name.
  "TS2566", // A rest element cannot have a property name.
  "TS2481", // Cannot initialize outer scoped variable '{0}' in the same scope as block scoped declaration '{0}'.
  // "TS2567", // Enum declarations can only merge with namespace or other enum declarations.
  "TS2659", // 'super' is only allowed in members of object literal expressions when option 'target' is 'ES2015' or higher.
  "TS2660", // 'super' can only be referenced in members of derived classes or object literal expressions.
  "TS2699", // Static property '{0}' conflicts with built-in property 'Function.{0}' of constructor function '{1}'.
  "TS8018", // Octal literals are not allowed in enums members initializer.
  // "TS17012", // '{0}' is not a valid meta-property for keyword '{1}'. Did you mean '{2}'?
];
