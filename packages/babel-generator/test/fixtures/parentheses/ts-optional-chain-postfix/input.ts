// These parentheses should be preserved
(a?.b!).c;
(a?.b!)[c];
(a?.b!)();
(a?.()!).c;
(a?.b!!).c;
(a?.b!).c = 1;
(a?.b<c>)();
((a?.b!)<c>)();

// These parentheses can be stripped
(a?.b!)?.c;
(a?.b!)?.();
(a?.b<c>)?.();
(a.b!).c;
(a.b!)();
