{
  // `React.lazy`
  foo = React.lazy(() => import("./file1.js"));
  var foo = qux(React.lazy(() => import("./file2.js")));
  ({
    foo: React.lazy(() => import("./file3.js"))
  });
  var foo = React.lazy(() => import("./file4.js"));
  fn(React.lazy(() => import("./foo.js")));
}

import { lazy } from "react";
// Importing `lazy` from the 'react' package
{
  foo = lazy(() => import("./file1.js"));
  var foo = qux(lazy(() => import("./file2.js")));
  ({
    foo: lazy(() => import("./file3.js"))
  });
  var foo = lazy(() => import("./file4.js"));
  fn(lazy(() => import("./foo.js")));
}

import { lazy as lazyAlias } from "react";
// Importing `lazy` from the 'react' package with a local alias
{
  foo = lazyAlias(() => import("./file1.js"));
  var foo = qux(lazyAlias(() => import("./file2.js")));
  ({
    foo: lazyAlias(() => import("./file3.js"))
  });
  var foo = lazyAlias(() => import("./file4.js"));
  fn(lazyAlias(() => import("./foo.js")));
}

{
  // Don't add another displayName if we somehow transform twice
  foo =
    ((_fooAlreadyTransformed = React.lazy(() => import("./file1.js"))),
    (_fooAlreadyTransformed.displayName = "dontChangeMe"),
    _fooAlreadyTransformed);
}

{
  // Add our displayName before the user's
  foo = React.lazy(import("./file1.js"));
  foo.displayName = "dontChangeMe";
}
