import * as t from "../../types";

export default class Binding {
  constructor({ identifier, scope, path, kind }) {
    this.constantViolations = [];
    this.constant           = true;

    this.identifier = identifier;
    this.references = 0;
    this.referenced = false;

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

  reassign(path) {
    this.constant = false;
    this.constantViolations.push(path);

    if (this.typeAnnotationInferred) {
      // destroy the inferred typeAnnotation
      this.typeAnnotation = null;
    }
  }

  /**
   * Description
   */

  reference() {
    this.referenced = true;
    this.references++;
  }

  /**
   * Description
   */

  dereference() {
    this.references--;
    this.referenced = !!this.references;
  }

  /**
   * Description
   */

  isCompatibleWithType(): boolean {
    return false;
  }
}
