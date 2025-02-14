// These parentheses should be kept
type t0<T> = (keyof T)[];
type t1<T> = (keyof T)['valueOf'];
type t2<T> = [(keyof T)?];

// These parentheses should be stripped
type s0<T> = [...keyof T];
type s1<T> = keyof T & string;
type s2<T> = keyof T | string;