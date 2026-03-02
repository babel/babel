// Verify typescript doesn't change anything inside type parameter declaration
const foo = <T,>(a: T): T => a;