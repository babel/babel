---
layout: docs
title: Experimental
description: How to use experimental ES7 features.
permalink: /docs/usage/experimental/
redirect_from: /experimental.html
---

> 6to5 also has experimental support for ES7 proposals.

<blockquote class="to5-callout to5-callout-danger">
  <h4>Subject to change</h4>
  <p>
    These proposals are subject to change so <strong><em>use with extreme
    caution</em></strong>. 6to5 may update without warning in order to track spec
    changes. Please do not use them in production applications.
  </p>
</blockquote>

#### Usage

```js
$ 6to5 --experimental
```

```js
to5.transform('code', { experimental: true });
```
