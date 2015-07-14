// Checks if an object has a property.

export function has(obj, propName) {
  return Object.prototype.hasOwnProperty.call(obj, propName);
}
