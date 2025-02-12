// These parentheses should be kept
type t0<T> = T extends Array<(infer K)[]> ? K : never;
type t1<T> = T extends Array<(infer K)['valueOf']> ? K : never;
type t2<T> = T extends Array<[(infer K)?]> ? K : never;
type t3<T> = T extends Array<(infer K extends string) | boolean> ? K : never;
type t4<T> = T extends Array<(infer K extends string) & boolean> ? K : never;

// These parentheses should be stripped
type s0<T> = T extends Array<infer K | boolean> ? K : never;
type s1<T> = T extends Array<infer K & boolean> ? K : never;
type s2<T> = T extends Array<boolean | infer K extends string> ? K : never;
type s3<T> = T extends Array<boolean & infer K extends string> ? K : never;
type s4<T> = T extends Array<infer K extends infer L extends string> ? K : never;
type s5<T> = T extends infer Q ? Q : never;
type s6<T> = T extends Array<T extends string[] ? infer Q : never> ? Q : never;
type s7<T> = T extends Array<T extends string[] ? never : infer Q> ? Q : never;
type s8<T> = T extends Array<infer K extends string extends string ? string : never> ? K : never;
type s9<T> = T extends Array<string extends infer K extends string ? K : never> ? string : never;
type s10<T> = T extends Array<string extends string ? infer K extends string : string> ? K : never;
type s11<T> = T extends Array<string extends string ? string : infer K extends string> ? K : never;
type s12<T> = T extends Array<keyof infer K> ? K : never;