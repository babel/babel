function a() {}
opaque type A = number;
opaque type B = {
  name: string;
};

opaque type union =
 | {type: "A"}
 | {type: "B"}
;

opaque type overloads =
  & ((x: string) => number)
  & ((x: number) => string)
;
