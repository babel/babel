// One bare type parameter needs a trailing comma in TSX
<T>(a: T): T => a;

<T,>(a: T): T => a;

const f = <T = string>(x: T) => x;
