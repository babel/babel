var foo;

/* indirect eval calls */
eval?.(foo);

(eval)?.(foo);

eval?.()();

eval?.().foo;

/* direct eval calls */

eval()?.();

eval()?.foo;

/* plain function calls */

foo.eval?.(foo);

eval.foo?.(foo);
