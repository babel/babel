abstract class C1 {}
declare abstract class C2 {}
export abstract class C3 {}
// `export abstract class { }` is not valid.
export default abstract class { }
export default abstract class C4 { }
// `abstract class` is not valid as an expression.
