import {
  anyTypeAnnotation,
  stringTypeAnnotation,
  numberTypeAnnotation,
  voidTypeAnnotation,
  booleanTypeAnnotation,
  genericTypeAnnotation,
  identifier,
} from "../generated";
import type * as t from "../..";

export default createTypeAnnotationBasedOnTypeof as {
  (type: "string"): t.StringTypeAnnotation;
  (type: "number"): t.NumberTypeAnnotation;
  (type: "undefined"): t.VoidTypeAnnotation;
  (type: "boolean"): t.BooleanTypeAnnotation;
  (type: "function"): t.GenericTypeAnnotation;
  (type: "object"): t.GenericTypeAnnotation;
  (type: "symbol"): t.GenericTypeAnnotation;
  (type: "bigint"): t.AnyTypeAnnotation;
};

/**
 * Create a type annotation based on typeof expression.
 */
function createTypeAnnotationBasedOnTypeof(type: string): t.FlowType {
  switch (type) {
    case "string":
      return stringTypeAnnotation();
    case "number":
      return numberTypeAnnotation();
    case "undefined":
      return voidTypeAnnotation();
    case "boolean":
      return booleanTypeAnnotation();
    case "function":
      return genericTypeAnnotation(identifier("Function"));
    case "object":
      return genericTypeAnnotation(identifier("Object"));
    case "symbol":
      return genericTypeAnnotation(identifier("Symbol"));
    case "bigint":
      // todo: use BigInt annotation when Flow supports BigInt
      // https://github.com/facebook/flow/issues/6639
      return anyTypeAnnotation();
  }
  throw new Error("Invalid typeof value: " + type);
}
