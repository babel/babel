import * as t from "../types";

export default class Binding {
  constructor({ identifier, scope, path, kind }) {
    this.identifier = identifier;
    this.reassigned = false;
    this.scope      = scope;
    this.path       = path;
    this.kind       = kind;
  }

  /**
   * Description
   */

   setTypeAnnotation() {
    var typeInfo = this.path.getTypeAnnotation();
    this.typeAnnotationInferred = typeInfo.inferred;
    this.typeAnnotation         = typeInfo.annotation;
   }

  /**
   * Description
   */

  isTypeGeneric(): boolean {
    return this.path.isTypeGeneric(...arguments);
  }

  /**
   * Description
   */

  assignTypeGeneric(type: Object, params?) {
    var typeParams = null;
    if (params) params = t.typeParameterInstantiation(params);
    this.assignType(t.genericTypeAnnotation(t.identifier(type), typeParams));
  }

  /**
   * Description
   */

  assignType(type: Object) {
    this.typeAnnotation = type;
  }

  /**
   * Description
   */

  reassign() {
    this.reassigned = true;

    if (this.typeAnnotationInferred) {
      // destroy the inferred typeAnnotation
      this.typeAnnotation = null;
    }
  }

  /**
   * Description
   */

  getValueIfImmutable() {
    // can't guarantee this value is the same
    if (this.reassigned) return;

    var node = this.path.node;
    if (t.isVariableDeclarator(node)) {
      if (t.isIdentifier(node.id)) {
        node = node.init;
      } else {
        // otherwise it's probably a destructuring like:
        // var { foo } = "foo";
        return;
      }
    }

    if (t.isImmutable(node)) {
      return node;
    }
  }

  /**
   * Description
   */

  isCompatibleWithType(newType): boolean {
    return false;
  }
}
