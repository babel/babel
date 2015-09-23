/* @flow */

import * as util from "../../util";

export default function (Parent: Function): Function {
  function Constructor() {
    this.noInteropRequireImport = true;
    this.noInteropRequireExport = true;
    Parent.apply(this, arguments);
  }

  util.inherits(Constructor, Parent);

  return Constructor;
}
