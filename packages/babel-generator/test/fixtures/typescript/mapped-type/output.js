type Bar = { [key in Foo] };
type Foo2 = { [key in Bar]? };
type Foo3 = { [key in keyof Bar]-? };
type Foo4 = { [key in keyof Bar]+? };