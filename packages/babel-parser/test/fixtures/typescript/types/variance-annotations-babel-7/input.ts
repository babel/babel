type Covariant<out T> = {
    x: T;
}

type Contravariant<in T> = {
    f: (x: T) => void;
}

type Invariant<in out T> = {
    f: (x: T) => T;
}