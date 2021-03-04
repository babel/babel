// @flow
import {
  stringTypeAnnotation,
  numberTypeAnnotation,
  voidTypeAnnotation,
  booleanTypeAnnotation,
  genericTypeAnnotation,
  identifier,
} from "../generated";

/**
 * Create a type annotation based on typeof expression.
 */
export default function createTypeAnnotationBasedOnTypeof(
  type: string,
): Object {
  if (type === "string") {
    return stringTypeAnnotation();
  } else if (type === "number") {
    return numberTypeAnnotation();
  } else if (type === "undefined") {
    return voidTypeAnnotation();
  } else if (type === "boolean") {
    return booleanTypeAnnotation();
  } else if (type === "function") {
    return genericTypeAnnotation(identifier("Function"));
  } else if (type === "object") {
    return genericTypeAnnotation(identifier("Object"));
  } else if (type === "symbol") {
    return genericTypeAnnotation(identifier("Symbol"));
  } else if(type === "bigint"){
//     what about bigint?
//     I got a problem while building electron app using node-unzipper saying 'Invalid typeof value'
  } else {
    throw new Error("Invalid typeof value");
  }
}
