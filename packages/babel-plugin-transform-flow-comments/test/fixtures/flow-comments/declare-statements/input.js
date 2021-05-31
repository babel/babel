declare var foo
declare var foo;
declare function foo(): void
declare function foo(): void;
declare function foo<T>(): void;
declare function foo(x: number, y: string): void;
declare class A1 {}
declare class A1<T> extends B<T> { x: number }
declare class A1 { static foo(): number, static x : string }
declare class A1 { static [ indexer: number]: string }
declare class A1 { static () : number }
declare class A1 mixins B<T>, C {}
declare type A2 = string
declare type T<U> = { [k:string]: U }
declare interface I1 { foo: string }
declare interface I2<T> { foo: T }
