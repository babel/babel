// These parentheses should be kept
type t0 = (string | boolean)[];
type t1 = (string | boolean)['valueOf'];
type t2 = [(string | boolean)?];
type t3 = string & (boolean | boolean);
type t4 = keyof (t0 | t1);

// These parentheses should be stripped
type s0 = number | string | boolean;
type s1 = Object['valueOf' | 'toString'];
type s2 = [...s0[] | s1[]];