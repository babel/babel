import checkPrivateRedeclaration from "./checkPrivateRedeclaration.js";
export default function _classPrivateFieldInitSpec(e, t, a) {
  checkPrivateRedeclaration(e, t), t.set(e, a);
}