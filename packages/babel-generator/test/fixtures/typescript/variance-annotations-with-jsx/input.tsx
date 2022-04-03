// valid JSX
<in T>() => {}</in>;

type Covariant<out T> = {
    x: T;
}

declare let super_covariant: Covariant<unknown>;
declare let sub_covariant: Covariant<string>;

super_covariant = sub_covariant;
sub_covariant = super_covariant;  // Error

type Contravariant<in T> = {
    f: (x: T) => void;
}

declare let super_contravariant: Contravariant<unknown>;
declare let sub_contravariant: Contravariant<string>;

super_contravariant = sub_contravariant;  // Error
sub_contravariant = super_contravariant;

type Invariant<in out T> = {
    f: (x: T) => T;
}

declare let super_invariant: Invariant<unknown>;
declare let sub_invariant: Invariant<string>;

super_invariant = sub_invariant;  // Error
sub_invariant = super_invariant;  // Error

// Variance of various type constructors

type T10<out T> = T;
type T11<in T> = keyof T;
type T12<out T, out K extends keyof T> = T[K];
type T13<in out T> = T[keyof T];

// Variance annotation errors

type Covariant1<in T> = {  // Error
    x: T;
}

type Contravariant1<out T> = keyof T;  // Error

type Contravariant2<out T> = {  // Error
    f: (x: T) => void;
}

type Invariant1<in T> = {  // Error
    f: (x: T) => T;
}

type Invariant2<out T> = {  // Error
    f: (x: T) => T;
}

// Variance in circular types

type Foo1<in T> = {  // Error
    x: T;
    f: FooFn1<T>;
}

type FooFn1<T> = (foo: Bar1<T[]>) => void;

type Bar1<T> = {
    value: Foo1<T[]>;
}

type Foo2<out T> = {  // Error
    x: T;
    f: FooFn2<T>;
}

type FooFn2<T> = (foo: Bar2<T[]>) => void;

type Bar2<T> = {
    value: Foo2<T[]>;
}

type Foo3<in out T> = {
    x: T;
    f: FooFn3<T>;
}

type FooFn3<T> = (foo: Bar3<T[]>) => void;

type Bar3<T> = {
    value: Foo3<T[]>;
}
