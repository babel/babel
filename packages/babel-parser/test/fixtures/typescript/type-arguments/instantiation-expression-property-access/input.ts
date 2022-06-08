// invalid
a<b>.c;
a<b>?.c;
a<b>?.[c];

// valid
a<b>?.(c);
(a<b>).c;
(a<b>)?.c;
(a<b>)?.[c];
