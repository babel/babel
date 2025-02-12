// These parentheses should be kept
type t0<T> = (T extends string[] ? T : never)[]
type t1<T> = (T extends string[] ? T : never)[0]
type t2<T> = [(T extends string[] ? T : never)?]

type t3<T> = (T extends string[] ? T : never) | boolean;
type t4<T> = (T extends string[] ? T : never) & boolean;

type t5<T> = keyof (T extends string[] ? T : never);
type t6<T> = T extends Array<infer K extends (T extends string ? string : never)> ? K : never

type t7<T> = (T extends string[] ? T : never) extends string[] ? T : never;
type t8<T> = T extends (T extends string[] ? T : never) ? string[] : never;

// These parentheses should be stripped
type s0<T> = [...(T extends string[] ? T : never)];
type s1<T> = ""[(T extends string[] ? "toString" : "valueOf")];
type s2<T> = T extends string[] ? (T extends string[] ? T : never) : never;
type s3<T> = T extends string[] ? never : (T extends string[] ? T : never);
