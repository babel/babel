// These parentheses should be kept
type t0 = (string & string)[];
type t1 = (string & string)['valueOf'];
type t2 = [(string & string)?];
type t3 = keyof (t0 & t1);

// These parentheses should be stripped
type s0 = number | string & string;
type s1 = Object['valueOf' & 'valueOf'];
type s2 = [...s0[] & s1[]];