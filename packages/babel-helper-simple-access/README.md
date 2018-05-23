# @babel/helper-simple-assignment

There are many cases where it is hard to perform transformations because a
piece of code is using complex structures. Say you want to rewrite all accesses
to a given variable, and there are cases like

```
i += 1
--i;
```

It is difficult to work with.

This helper can handle converting these to simple access patterns of standard
assignment. This plugin does _not_ handle

```
{ a } = foo;
```

so assignment to patterns still needs to be handled when you are processing
updates to values.

## Usage

TODO
