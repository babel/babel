opaque type ID = string;
opaque type Foo<T> = Bar<T>
export opaque type Foo1 = number;

opaque type union =
 | {type: "A"}
 | {type: "B"}
;

opaque type overloads =
  & ((x: string) => number)
  & ((x: number) => string)
;

declare opaque type Foo2: Bar;
declare export opaque type Fo3: Bar;
