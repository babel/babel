---
layout: docs
title: JSX
description: How to use JSX.
permalink: /docs/usage/jsx/
---

<p class="lead">
  6to5 has built-in support for React v0.12. Tags are automatically transformed
  to their equivalent <code>React.createElement(...)</code> and
  <code>displayName</code> is automatically inferred and added to all
  <code>React.createClass</code> calls.
</p>

## Blacklist

To disable this behaviour add react to your blacklist:

````js
to5.transform("code", { blacklist: ["react"] });
$ 6to5 --blacklist react
```
