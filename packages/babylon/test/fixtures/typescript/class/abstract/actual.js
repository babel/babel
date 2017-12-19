abstract class C {}
declare abstract class C {}
export abstract class C {}
// `export abstract class {}` is not valid TypeScript.
export default abstract class { }
export default abstract class C { }
// `abstract class` is not valid as an expression.
