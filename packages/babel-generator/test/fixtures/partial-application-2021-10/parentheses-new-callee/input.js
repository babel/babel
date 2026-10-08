// The following parentheses should be kept
new (f())~();
new (f?.())~();
new (f.g?.h)~();
new (f().g)~();
new (f()`g`)~();
new (import("foo"))~();

new (f~())();
new (f?.~())();
new (f.g?.~())();
new (f~().g)();
new (f~()`g`)();
new (f~())~();
new (f?.~())~();

// The following outer parentheses can be removed
new (f[g()])~();
new (f[g~()])();
new (new f~())();
new (new f~())~();
