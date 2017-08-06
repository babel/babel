opaque type ID = string;
opaque type Foo<T> = Bar<T>;
opaque type Maybe<T> = _Maybe<T, *>;
export opaque type Foo = number;

opaque type union =
 | {type: "A"}
 | {type: "B"}
;

opaque type overloads =
  & ((x: string) => number)
  & ((x: number) => string)
;
