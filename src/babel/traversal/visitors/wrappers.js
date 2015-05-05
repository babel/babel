export var ReferencedIdentifier = {
  type: "Identifier",
  wrap(fn) {
    return function () {
      if (this.isReferencedIdentifier()) {
        return fn.apply(this, arguments);
      }
    };
  }
}
