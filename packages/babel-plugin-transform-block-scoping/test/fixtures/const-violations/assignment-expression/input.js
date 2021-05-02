const a = 5;
let b = 0;
a += b++;

const c = 32;
let d = 1;
c >>>= ++d;

const e = 0;
let f = 1;
e ||= ++f;

const g = 0;
let h = 1;
g &&= ++h;

const i = 0;
let j = 1;
i ??= ++j;
