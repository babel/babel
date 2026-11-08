// These parentheses should be reserved
(a?.b!).c = 1;
(a?.b!).c;
(a?.b!)[c];
(a?.b!)();
(a?.b!)();
(a?.()!).b;
(a.b?.()!)();
(a?.b<c>)();

// These parentheses can be stripped
a.b!.c;
a.b!();