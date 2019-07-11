{
  var _foo, _foo, _foo2, _foo2, _foo3, _foo3, _foo4, _foo4, _foo5, _foo5;

  // `React.lazy`
  foo = (_foo = React.lazy(() => import("./file1.js")), _foo.displayName = "foo", _foo);
  var foo = qux((_foo2 = React.lazy(() => import("./file2.js")), _foo2.displayName = "foo", _foo2));
  ({
    foo: (_foo3 = React.lazy(() => import("./file3.js")), _foo3.displayName = "foo", _foo3)
  });
  var foo = (_foo4 = React.lazy(() => import("./file4.js")), _foo4.displayName = "foo", _foo4);
  fn((_foo5 = React.lazy(() => import("./foo.js")), _foo5.displayName = "foo", _foo5));
}
import { lazy } from "react"; // Importing `lazy` from the 'react' package

{
  var _foo6, _foo6, _foo7, _foo7, _foo8, _foo8, _foo9, _foo9, _foo10, _foo10;

  foo = (_foo6 = lazy(() => import("./file1.js")), _foo6.displayName = "foo", _foo6);
  var foo = qux((_foo7 = lazy(() => import("./file2.js")), _foo7.displayName = "foo", _foo7));
  ({
    foo: (_foo8 = lazy(() => import("./file3.js")), _foo8.displayName = "foo", _foo8)
  });
  var foo = (_foo9 = lazy(() => import("./file4.js")), _foo9.displayName = "foo", _foo9);
  fn((_foo10 = lazy(() => import("./foo.js")), _foo10.displayName = "foo", _foo10));
}
import { lazy as lazyAlias } from "react"; // Importing `lazy` from the 'react' package with a local alias

{
  var _foo11, _foo11, _foo12, _foo12, _foo13, _foo13, _foo14, _foo14, _foo15, _foo15;

  foo = (_foo11 = lazyAlias(() => import("./file1.js")), _foo11.displayName = "foo", _foo11);
  var foo = qux((_foo12 = lazyAlias(() => import("./file2.js")), _foo12.displayName = "foo", _foo12));
  ({
    foo: (_foo13 = lazyAlias(() => import("./file3.js")), _foo13.displayName = "foo", _foo13)
  });
  var foo = (_foo14 = lazyAlias(() => import("./file4.js")), _foo14.displayName = "foo", _foo14);
  fn((_foo15 = lazyAlias(() => import("./foo.js")), _foo15.displayName = "foo", _foo15));
}
{
  // Don't add another displayName if we somehow transform twice
  foo = (_fooAlreadyTransformed = React.lazy(() => import("./file1.js")), _fooAlreadyTransformed.displayName = "dontChangeMe", _fooAlreadyTransformed);
}
{
  var _foo16, _foo16;

  // Add our displayName before the user's
  foo = (_foo16 = React.lazy(import("./file1.js")), _foo16.displayName = "foo", _foo16);
  foo.displayName = "dontChangeMe";
}
