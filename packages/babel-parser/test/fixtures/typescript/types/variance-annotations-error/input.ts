type T20<public T> = T;  // Error
type T21<in out in T> = T;  // Error
type T22<in out out T> = T;  // Error
type T23<out in T> = T;  // Error