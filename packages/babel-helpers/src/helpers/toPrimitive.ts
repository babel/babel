/* @minVersion 7.1.5 */

// https://tc39.es/ecma262/#sec-toprimitive
export default function toPrimitive(
  input: unknown,
  hint?: "default" | "string" | "number",
) {
  if (typeof input !== "object" || !input) return input;
  // @ts-expect-error Symbol.toPrimitive might not index {}
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
