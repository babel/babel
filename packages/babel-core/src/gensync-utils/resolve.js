// @flow

import resolve from "resolve";
import gensync from "gensync";

export default gensync<[string, {| basedir: string |}], string>({
  sync: resolve.sync,
  errback: resolve,
});
