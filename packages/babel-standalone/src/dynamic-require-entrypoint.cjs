/*
We bundle @babel/standalone using the dynamicRequireTargets option.
This option needs to inject require() calls to all the modules that
could be dynamically required later.

By default it injects them in the entrypoint, but when rollup loads the
entrypoint it finds syntax that it doesn't support (because
@rollup/plugin-commonjs must run before @rollup/plugin-babel).

We use "yarn patch" to modify the @rollup/plugin-commonjs package, so
that it injects those "preload" require() calls in this file rather
than in the entrypoint.
*/
