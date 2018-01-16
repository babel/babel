opaque type ID = string;
opaque type Foo<T> = Bar<T>
export opaque type Foo = number;

opaque type union =
 | {type: "A"}
 | {type: "B"}
;

opaque type overloads =
  & ((x: string) => number)
  & ((x: number) => string)
;

declare opaque type Foo: Bar;
declare export opaque type Foo: Bar;
