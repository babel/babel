// The following parentheses should be kept
new (f()!)();
new (g?.()!)();

new (f!.g?.h)();
new (f?.g!.h)();

new (f().g!)();
new (f?.().g!)();

new (f!()?.g)();
new (f?.()?.g!)();

new (f!()`g`)();

new (import("foo")!)();
new (import("foo")!.bar)();
new (import("foo")!`bar`)();

new (super()!)();
new (super()!.foo)();
new (super()!`foo`)();

// The following outer parentheses can be removed
new (f![g()])();
new ((f?.g!).h)();
