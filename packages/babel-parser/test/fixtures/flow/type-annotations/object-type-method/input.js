type T = { a: () => void };
type T = { a: <T>() => void };
type T = { a(): void };
type T = { a<T>(): void };

type T = { (): number };
type T = { <T>(x: T): number; }

declare class T { foo(): number; }
declare class T { static foo(): number; }
declare class T { (): number }
declare class T { static (): number }
