type FBID = number;
type Foo<T> = Bar<T>
export type Foo1 = number;

type union =
 | {type: "A"}
 | {type: "B"}
;

type overloads =
  & ((x: string) => number)
  & ((x: number) => string)
;
