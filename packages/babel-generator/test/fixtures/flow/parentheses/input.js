type A = (<T>(T) => $Foo<T>) & (<T>(T) => $Foo<T>);
type B = (<T>(T) => $Foo<T>) | (<T>(T) => $Foo<T>);
type C = (<T>(T) => $Foo<T>)[];