import * as util from "../../util";

export default function (Parent) {
  var Constructor = function () {
    this.noInteropRequireImport = true;
    this.noInteropRequireExport = true;
    Parent.apply(this, arguments);
  };

  util.inherits(Constructor, Parent);

  return Constructor;
};
