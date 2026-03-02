foo?.(...[], 1);

foo?.bar(...[], 1)

foo.bar?.(foo.bar, ...[], 1)

foo?.bar?.(foo.bar, ...[], 1)

foo?.(...[], 1).bar

foo?.(...[], 1)?.bar

foo.bar?.(...[], 1).baz

foo.bar?.(...[], 1)?.baz

foo?.bar?.(...[], 1).baz

foo?.bar?.(...[], 1)?.baz
